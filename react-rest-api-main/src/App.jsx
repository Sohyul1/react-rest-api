import { Routes, Route, Link } from "react-router-dom";
import { useContext } from "react";
import Home from "./components/Home";
import BookingIndex from "./components/bookings/BookingIndex";
import BookingCreate from "./components/bookings/BookingCreate";
import BookingEdit from "./components/bookings/BookingEdit";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthContext, { AuthProvider } from "./Context/AuthContext";
import { BookingProvider } from "./Context/BookingContext";

function Layout() {
  const { isAuthenticated, user, logout } = useContext(AuthContext);

  return (
    <div className="bg-[#1f1f1f] text-[#f2f0e2] min-h-screen font-sans">
      
      <nav className="border-b border-[#f2f0e2]/20 mb-8 px-4 py-4">
        <ul className="max-w-7xl mx-auto flex items-center justify-between">
          
          <div className="flex space-x-6 items-center">
            <li>
              <Link to="/" className="opacity-80 hover:opacity-100 font-medium transition-opacity">Home</Link>
            </li>
            {isAuthenticated && (
              <li>
                <Link to="/bookings" className="opacity-80 hover:opacity-100 font-medium transition-opacity">Bookings</Link>
              </li>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <span className="text-sm opacity-70">
                  Signed in as <span className="font-semibold opacity-100">{user?.name}</span>
                </span>
                <button
                  onClick={logout}
                  className="px-4 py-2 text-sm text-red-400 border border-red-900/50 hover:bg-red-900/20 rounded-md transition-all"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="opacity-80 hover:opacity-100 font-medium transition-opacity">
                  Login
                </Link>
                <Link to="/register" className="px-4 py-2 text-sm text-[#1f1f1f] bg-[#f2f0e2] hover:bg-white rounded-md transition-all shadow-sm font-semibold">
                  Register
                </Link>
              </>
            )}
          </div>

        </ul>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/bookings"
            element={
              <ProtectedRoute>
                <BookingIndex />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bookings/create"
            element={
              <ProtectedRoute>
                <BookingCreate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bookings/:id/edit"
            element={
              <ProtectedRoute>
                <BookingEdit />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <BookingProvider>
        <Layout />
      </BookingProvider>
    </AuthProvider>
  );
}

export default App;