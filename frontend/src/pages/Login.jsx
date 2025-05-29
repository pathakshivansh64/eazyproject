import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { setToken } from "../auth";
import shoe from '../assets/shoe.png'

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await api.post("/login", { email, password });
      setToken(res.data.token);
      navigate("/dashboard");
    } catch (err) {
      console.log(err)
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#0c1824] text-white flex flex-col justify-center items-center px-4">
      <img src={shoe} className="w-64 mb-6" />
      <h1 className="text-2xl font-bold mb-6">Easybiznus</h1>
      <input
        placeholder="Email"
        className="w-full max-w-sm p-2 mb-3 bg-white text-black rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full max-w-sm p-2 mb-6 bg-white text-black rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin} className="bg-white text-black px-4 py-2 rounded cursor-pointer">
        LOGIN
      </button>
      <p className="mt-4">Don't have an account? <span className="text-blue-400 cursor-pointer" onClick={() => navigate("/signup")}>Sign up</span></p>
    </div>
  );
}

export default Login;
