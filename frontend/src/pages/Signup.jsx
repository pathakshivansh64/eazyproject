import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { setToken } from "../auth";
import shoe from '../assets/shoe.png'

function Signup() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", mobile: "", password: "", confirmPassword: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSignup = async () => {
   

    try {
      const res = await api.post("/signup", {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        mobile: form.mobile,
        password: form.password,
      });
      setToken(res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#0c1824] text-white flex flex-col items-center px-4 pt-10">
      <img src={shoe} className="w-64 mb-6" />
      <h1 className="text-2xl font-bold mb-6">Easybiznus</h1>
      <div className="grid grid-cols-2 gap-2 w-full max-w-sm mb-3">
        <input name="firstName" placeholder="First Name" onChange={handleChange} className="p-2 text-black bg-white rounded" />
        <input name="lastName" placeholder="Last Name" onChange={handleChange} className="p-2 text-black bg-white rounded" />
      </div>
      <input name="email" placeholder="Email" onChange={handleChange} className="w-full max-w-sm p-2 mb-3 text-black bg-white rounded" />
      <input name="mobile" placeholder="Mobile No" onChange={handleChange} className="w-full max-w-sm p-2 mb-3 text-black bg-white rounded" />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} className="w-full max-w-sm p-2 mb-3 text-black bg-white rounded" />
     
      <button onClick={handleSignup} className="bg-white text-black bg-white px-4 py-2 rounded mt-3 cursor-pointer">
        SIGNUP
      </button>

       <p className="mt-4">Already have an account? <span className="text-blue-400 cursor-pointer" onClick={() => navigate("/login")}>Login</span></p>
    </div>
  );
}

export default Signup;
