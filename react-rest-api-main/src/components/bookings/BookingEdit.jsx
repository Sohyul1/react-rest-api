import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BookingContext from "../../Context/BookingContext";

const BookingEdit = () => {
  const { booking, getBooking, updateBooking, errors } = useContext(BookingContext);
  const { id } = useParams();

  // Local state for the form
  const [formValues, setFormValues] = useState({
    customer_name: "",
    booking_code: "",
  });

  // Fetch the data when the page loads
  useEffect(() => {
    getBooking(id);
  }, [id]);

  // Update the form inputs once the data arrives from Laravel
  useEffect(() => {
    if (booking) {
      setFormValues({
        // The || "" prevents the "uncontrolled input" React warning
        customer_name: booking.customer_name || "",
        booking_code: booking.booking_code || "",
      });
    }
  }, [booking]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const updateBookingHandler = async (e) => {
    e.preventDefault(); // Stop the page refresh here in the component
    updateBooking(id, formValues); // Pass the data to the context
  };

  return (
    <div className="max-w-2xl mx-auto mt-12">
      <div className="flex justify-between items-center mb-6 px-2">
        <h2 className="text-2xl font-semibold">Edit Booking</h2>
        <Link
          to="/bookings"
          className="px-4 py-2 text-sm font-medium opacity-80 hover:opacity-100 transition-opacity flex items-center gap-2"
        >
          <span>&larr;</span> Back to List
        </Link>
      </div>

      <div className="bg-black/20 p-8 rounded-lg border border-[#f2f0e2]/20 backdrop-blur-sm shadow-xl">
        <form onSubmit={updateBookingHandler} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium opacity-80">Customer Name</label>
            <input
              name="customer_name"
              value={formValues.customer_name}
              onChange={onChange}
              className="w-full p-3 bg-black/40 border border-[#f2f0e2]/20 rounded-md focus:ring-1 focus:ring-[#f2f0e2]/50 outline-none transition-colors"
            />
            {errors?.customer_name && <span className="text-red-400 text-sm mt-1 block">{errors.customer_name[0]}</span>}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium opacity-80">Booking Code</label>
            <input
              name="booking_code"
              value={formValues.booking_code}
              onChange={onChange}
              className="w-full p-3 bg-black/40 border border-[#f2f0e2]/20 rounded-md focus:ring-1 focus:ring-[#f2f0e2]/50 outline-none transition-colors"
            />
            {errors?.booking_code && <span className="text-red-400 text-sm mt-1 block">{errors.booking_code[0]}</span>}
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-3 bg-[#f2f0e2] text-[#1f1f1f] font-bold rounded-md hover:bg-white transition-all shadow-sm"
            >
              Update Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingEdit;