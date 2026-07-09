import { createContext, useState } from "react";
import axiosClient from "../api/axiosClient";
import { useNavigate } from 'react-router-dom';

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
    const [bookings, setBookings] = useState([]);
    const [booking, setBooking] = useState([]);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    // 1. Fetches all bookings
    const getBookings = async () => {
        const apiBookings = await axiosClient.get("bookings");
        setBookings(apiBookings.data.data);
    };

    // 2. Fetches a single booking by ID
    const getBooking = async (id) => {
        const response = await axiosClient.get("bookings/" + id);
        setBooking(response.data.data);
    };

    // 3. Creates a new booking
    const storeBooking = async (data) => {
        try {
            await axiosClient.post("bookings", data);
            navigate("/bookings");
        } catch (e) {
            if (e.response.status === 422) {
                setErrors(e.response.data.errors);
            }
        }
    };

    // 4. Updates an existing booking
    const updateBooking = async (id, data) => {
        try {
            await axiosClient.put('bookings/' + id, data);
            navigate("/bookings");
        } catch (e) {
            if (e.response.status === 422) {
                setErrors(e.response.data.errors);
            }
        }
    };

    // 5. Deletes a booking
    const deleteBooking = async (id) => {
        if (!window.confirm("Are you sure you want to delete this booking?")) {
            return;
        }
        await axiosClient.delete("bookings/" + id);
        getBookings(); // Refresh the list
    };

    return (
        <BookingContext.Provider value={{ 
            booking, 
            bookings, 
            getBooking, 
            getBookings, 
            storeBooking, 
            updateBooking, 
            deleteBooking, 
            errors, 
            setErrors 
        }}>
            {children}
        </BookingContext.Provider>
    );
};

export default BookingContext;