import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { getToken, removeToken } from "../auth";
import shoeImage from '../assets/shoe.png'

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get("http://localhost:5000/api/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    api.get("/me", { headers: { Authorization: `Bearer ${getToken()}` } })
      .then((res) => setUser(res.data))
      .catch(() => {
        removeToken();
        navigate("/login");
      });
  }, []);

 return (
    <div className="min-h-screen bg-[#0c1824] text-white p-6 font-sans">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button onClick={() => { removeToken(); navigate("/login"); }} className="text-red-600 font-medium cursor-pointer">Logout</button>
      </header>

      <div className="flex flex-col lg:flex-row items-center lg:items-start lg:justify-between gap-10">
         
         
      
        {/* Shoe Image */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <img src={shoeImage} alt="Shoe" className="max-w-sm w-full" />
        </div>
        

        {/* Stats Section */}
        <div className="w-full lg:w-1/2 space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <StatCard label="Total Turnover" value="0" />
            <StatCard label="Commission" value="0" />
            <StatCard label="Credit" value="0" />
          </div>

          <div className="bg-[#142535] p-4 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-2">Daily Queue</h2>
            <p className="text-sm">Total Orders: 0 Units</p>
            <p className="text-sm text-red-500 font-semibold mt-1">OVERDUES: 0</p>
          </div>

          <div className="bg-[#142535] p-4 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-2">Sales</h2>
            <p className="text-sm">No items found.</p>
          </div>

          {user && (
        <div className="w-full  space-y-6 right:0">
        <div className="bg-[#142535] p-4 rounded-xl shadow mb-8">
          <h2 className="text-xl font-semibold mb-2">User Info</h2>
          <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Mobile:</strong> {user.mobile}</p>
        </div>
        </div>
      )}
        </div>

        
      </div>

     
      

       


     
    </div>
  );
};

const StatCard = ({ label, value }) => (
  <div className="bg-[#142535] rounded-xl p-4 text-center shadow">
    <h3 className="text-lg font-semibold">{label}</h3>
    <p className="text-xl font-bold mt-1">{value}</p>
    <span className="text-xs text-gray-400">Units</span>
  </div>
);


export default Dashboard;
