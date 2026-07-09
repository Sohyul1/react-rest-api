import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../Context/AuthContext";

const Home = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4 max-w-3xl mx-auto">
      
      <h1 className="text-5xl md:text-6xl font-serif font-bold text-[#f2f0e2] mb-6 tracking-tight">
        CRUD App Demo
      </h1>
      
      <Link 
        to={isAuthenticated ? "/bookings" : "/login"} 
        className="px-8 py-3 bg-[#f2f0e2] text-[#1f1f1f] hover:bg-white rounded-md transition-all font-semibold shadow-lg hover:shadow-xl"
      >
        {isAuthenticated ? "Go to Bookings" : "Test the App"}
      </Link>
      
    </div>
  );
};

export default Home;