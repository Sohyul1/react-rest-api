import { useContext, useEffect } from 'react'
import BookingContext from '../../Context/BookingContext';
import { useParams } from 'react-router-dom';

const BookingEdit = () => {
    const{ formValues, onChange, errors, setErrors, booking, getBooking, updateBooking } = useContext(BookingContext);
    let {id} = useParams();
    useEffect(()=> {
        getBooking(id)
        setErrors({})
    }, [])

  return (
     <div className='mt-12'>
     <form onSubmit={updateBooking} className='max-w-md mx-auto p-4 bg-white shadow-md rounded-sm' action="">
        <div className='space-y-6'>
            <div className='mb-4'>
                <label htmlFor="customer_name" className='block mb-2 text-sm font-medium'>
                    Customer Name
                </label>
                <input name='customer_name' value={formValues['customer_name']} onChange={onChange} className='border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2' />
                {errors.customer_name && <span className='text-sm text-red-400'> {errors.customer_name[0]} </span>}
            </div>
            <div className='mb-4'>
                <label htmlFor="booking_code" className='block mb-2 text-sm font-medium'>Booking Code</label>
                <input name='booking_code' value={formValues['booking_code']} onChange={onChange} className='border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2' />
                {errors.booking_code && <span className='text-sm text-red-400'> {errors.booking_code[0]} </span>}
            </div>
        </div>
        <div className='mt-6'>
            <button className='px-4 py-2 bg-indigo-500 hover:bg-indigo-700 text-white rounded-md'>
                Update
            </button>
        </div>  
     </form>
    </div>
  )
}

export default BookingEdit
