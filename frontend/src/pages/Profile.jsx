import { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { User, Mail, Lock, Calendar, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: ""
  });
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const { data } = await axios.get("https://clubbeast.onrender.com/api/registrations/myregistrations", {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setRegistrations(data);
      } catch (error) {
        console.error("Error", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRegistrations();
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put("https://clubbeast.onrender.com/api/users/profile", formData, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setMsg("Profile updated successfully!");
    } catch (error) {
      setMsg("Error updating profile.");
    }
  };

  return (
    <div className="pt-24 pb-20 px-4 max-w-7xl mx-auto min-h-screen">
      <div className="text-center mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold mb-4 uppercase tracking-tight"
        >
          My <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Profile</span>
        </motion.h1>
        <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1"
        >
          <div className="glass p-8 rounded-3xl sticky top-28">
            <h3 className="text-2xl font-bold mb-6">Edit Profile</h3>
            {msg && <div className="bg-purple-100 text-purple-800 p-3 rounded-lg text-sm mb-6">{msg}</div>}
            
            <form onSubmit={handleUpdate} className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 outline-none focus:ring-2 focus:ring-purple-500 transition" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 outline-none focus:ring-2 focus:ring-purple-500 transition" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">New Password (optional)</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input type="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} placeholder="Leave blank to keep same" className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 outline-none focus:ring-2 focus:ring-purple-500 transition" />
                </div>
              </div>
              <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 rounded-xl hover:opacity-90 transition shadow-lg mt-4">
                UPDATE PROFILE
              </button>
            </form>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 space-y-6"
        >
          <h3 className="text-2xl font-bold mb-6">My Registered Events</h3>
          
          {loading ? (
            <div className="flex justify-center py-10"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div></div>
          ) : registrations.length === 0 ? (
            <div className="glass p-10 rounded-3xl text-center">
              <p className="text-gray-500 mb-4">You haven't registered for any events yet.</p>
              <Link to="/events" className="inline-block bg-purple-600 text-white px-6 py-2 rounded-full font-medium hover:bg-purple-700 transition">Browse Events</Link>
            </div>
          ) : (
            registrations.map((reg) => (
              <div key={reg._id} className="glass rounded-2xl overflow-hidden flex flex-col sm:flex-row hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-800">
                <div className="w-full sm:w-1/3 h-48 sm:h-auto relative">
                  <img src={reg.event?.imageUrl || "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80"} onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80"; e.target.onerror = null; }} alt="Event" className="w-full h-full object-cover" />
                </div>
                <div className="p-6 flex flex-col justify-between w-full sm:w-2/3">
                  <div>
                    <h4 className="text-xl font-bold mb-2">{reg.event?.title || "Unknown Event"}</h4>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-1">
                      <Calendar size={14} className="mr-2" />
                      {reg.event ? new Date(reg.event.date).toLocaleDateString() : "N/A"}
                    </div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                      <MapPin size={14} className="mr-2" />
                      {reg.event?.location || "N/A"}
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-800">
                    <div>
                      <span className="text-xs text-gray-500 block">Tickets</span>
                      <span className="font-bold text-purple-600">{reg.places} Reserved</span>
                    </div>
                    <Link to={`/events/${reg.event?._id}`} className="text-sm font-semibold hover:text-purple-600 transition">View Event</Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
