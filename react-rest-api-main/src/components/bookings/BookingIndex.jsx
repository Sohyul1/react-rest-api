import { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import BookingContext from '../../Context/BookingContext';

const BookingIndex = () => {
  const { bookings, getBookings, deleteBooking } = useContext(BookingContext);

  useEffect(() => {
    getBookings();
  }, []);

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-6 px-2">
        <h2 className="text-2xl font-semibold">Customer Bookings</h2>
        <Link 
          to="/bookings/create" 
          className="px-4 py-2 bg-[#f2f0e2] text-[#1f1f1f] hover:bg-white text-sm font-semibold rounded-md shadow-sm transition-colors"
        >
          New Booking
        </Link>
      </div>

      <div className="bg-black/20 rounded-lg border border-[#f2f0e2]/20 overflow-hidden backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-black/40 border-b border-[#f2f0e2]/20 opacity-80">
              <tr>
                <th scope="col" className="py-4 px-6 font-medium">Customer Name</th>
                <th scope="col" className="py-4 px-6 font-medium">Booking Code</th>
                <th scope="col" className="py-4 px-6 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings?.map((booking) => (
                <tr 
                  key={booking.id} 
                  className="border-b border-[#f2f0e2]/10 hover:bg-white/5 transition-colors last:border-b-0"
                >
                  <td className="py-4 px-6 font-medium">
                    {booking.customer_name}
                  </td>
                  <td className="py-4 px-6 opacity-70">
                    {booking.booking_code}
                  </td>
                  <td className="py-4 px-6 text-right space-x-4">
                    <Link 
                      to={`/bookings/${booking.id}/edit`}
                      className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                      Edit
                    </Link>
                    <button 
                      onClick={() => deleteBooking(booking.id)} 
                      className="font-medium text-red-400 hover:text-red-300 transition-colors"
                    > 
                      Delete 
                    </button>
                  </td>
                </tr>
              ))}
              
              {(!bookings || bookings.length === 0) && (
                <tr>
                  <td colSpan="3" className="py-8 text-center opacity-50">
                    No bookings found. Click "New Booking" to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default BookingIndex;