import { createContext, useState } from "react";
import axiosClient from "../api/axiosClient";
import { useNavigate } from 'react-router-dom';

const BookingContext = createContext();
const initialForm = {
        customer_name: "",
        booking_code: ""
    }

export const BookingProvider = ({ children }) => {
    const [formValues, setFormValues] = useState(initialForm);
    const [bookings, setBookings] = useState([]);
    const [booking, setBooking] = useState([]);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const onChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    // 1. Fetches all bookings
    const getBookings = async () => {
        const apiBookings = await axiosClient.get("bookings");
        setBookings(apiBookings.data.data);
    };

    // 2. Fetches a single booking by ID
    const getBooking = async (id) => {
        const response = await axiosClient.get("bookings/" + id);
        const apiBooking =  response.data.data
        setBooking(apiBooking);
        setFormValues({
            customer_name: apiBooking.customer_name,
            booking_code: apiBooking.booking_code
        })
    };

    // 3. Creates a new booking
    const storeBooking = async (e) => {
        e.preventDefault();
        try {
            await axiosClient.post("bookings", formValues);
            setFormValues(initialForm)
            navigate("/bookings");
        } catch (e) {
            if (e.response.status === 422) {
                setErrors(e.response.data.errors);
            }
        }
    };
    const updateBooking = async(e) => {
        e.preventDefault();
        try{
            await axiosClient.put('bookings/' + booking.id, formValues)
            setFormValues(initialForm)
            navigate("/bookings");
        }catch (e){
            if (e.response.status === 422) {
                setErrors(e.response.data.errors);
            }
        }
    }
    const deleteBooking = async (id) =>{
        if (!window.confirm("Are your Sure?")){
            return
        }
        await axiosClient.delete("bookings/" + id)
         getBookings();
    }

    return (
        <BookingContext.Provider value={{ booking, bookings, getBooking, getBookings, onChange, formValues, storeBooking, errors, updateBooking, deleteBooking, setErrors }}>
            {children}
        </BookingContext.Provider>
    );
};

export default BookingContext;
