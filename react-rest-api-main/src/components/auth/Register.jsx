import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../Context/AuthContext';

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const { register, errors } = useContext(AuthContext);

  const handleRegister = async (e) => {
    e.preventDefault();
    register({ name, email, password, password_confirmation });
  };

  return (
    <div className="max-w-md mx-auto mt-12">
      <div className="bg-black/20 p-8 rounded-lg border border-[#f2f0e2]/20 backdrop-blur-sm shadow-xl">
        <h2 className="text-3xl font-bold mb-6 tracking-tight">Register</h2>
        
        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block mb-2 text-sm font-medium opacity-80">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 bg-black/40 border border-[#f2f0e2]/20 rounded-md focus:ring-1 focus:ring-[#f2f0e2]/50 outline-none transition-colors"
              placeholder="Juan Dela Cruz"
            />
            {errors?.name && <span className="text-red-400 text-sm mt-1 block">{errors.name[0]}</span>}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium opacity-80">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-black/40 border border-[#f2f0e2]/20 rounded-md focus:ring-1 focus:ring-[#f2f0e2]/50 outline-none transition-colors"
              placeholder="name@example.com"
            />
            {errors?.email && <span className="text-red-400 text-sm mt-1 block">{errors.email[0]}</span>}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium opacity-80">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-black/40 border border-[#f2f0e2]/20 rounded-md focus:ring-1 focus:ring-[#f2f0e2]/50 outline-none transition-colors"
              placeholder="••••••••"
            />
            {errors?.password && <span className="text-red-400 text-sm mt-1 block">{errors.password[0]}</span>}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium opacity-80">Confirm Password</label>
            <input
              type="password"
              value={password_confirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              className="w-full p-3 bg-black/40 border border-[#f2f0e2]/20 rounded-md focus:ring-1 focus:ring-[#f2f0e2]/50 outline-none transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-2 bg-[#f2f0e2] text-[#1f1f1f] font-bold rounded-md hover:bg-white transition-all shadow-sm"
          >
            Create Account
          </button>
        </form>

        <p className="mt-6 text-sm opacity-70 text-center">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold hover:opacity-100 transition-opacity underline decoration-[#f2f0e2]/50 underline-offset-4">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;