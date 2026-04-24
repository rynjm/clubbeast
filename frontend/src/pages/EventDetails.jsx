import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { Calendar, MapPin, ArrowLeft, Users } from "lucide-react";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    places: 1
  });
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const { data } = await axios.get(`https://clubbeast.onrender.com/api/events/${id}`);
        setEvent(data);
      } catch (error) {
        console.error("Error fetching event", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate("/login");
      return;
    }
    if (formData.phone.length !== 8) {
      setMsg("Phone number must be exactly 8 digits.");
      return;
    }
    if (formData.name.length < 3) {
      setMsg("Name must be at least 3 characters.");
      return;
    }
    try {
      await axios.post("https://clubbeast.onrender.com/api/registrations", {
        eventId: id,
        ...formData
      }, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setMsg("Successfully registered!");
    } catch (error) {
      setMsg(error.response?.data?.message || "Registration failed.");
    }
  };

  if (loading) return <div className="pt-24 min-h-screen flex justify-center items-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div></div>;
  if (!event) return <div className="pt-24 text-center">Event not found</div>;

  return (
    <div className="pt-24 pb-20 px-4 max-w-6xl mx-auto min-h-screen">
      <button onClick={() => navigate(-1)} className="flex items-center text-gray-500 hover:text-purple-500 transition mb-8">
        <ArrowLeft size={20} className="mr-2" /> Back to Events
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="rounded-3xl overflow-hidden shadow-2xl h-[400px] lg:h-[600px]"
        >
          <img src={event?.imageUrl || "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80"} onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80"; e.target.onerror = null; }} alt={event?.title || "Event"} className="w-full h-full object-cover" />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col justify-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">{event.title}</h1>
          
          <div className="flex flex-col space-y-4 mb-8 text-lg text-gray-600 dark:text-gray-300">
            <div className="flex items-center">
              <Calendar className="mr-4 text-purple-500" />
              <span>{new Date(event.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="mr-4 text-purple-500" />
              <span>{event.location}</span>
            </div>
          </div>

          <div className="prose dark:prose-invert max-w-none mb-10">
            <p className="text-lg leading-relaxed">{event.description}</p>
          </div>

          <div className="glass p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <Users className="mr-3 text-purple-500" /> Book Your Spot
            </h3>
            
            {msg && (
              <div className={`p-4 rounded-lg mb-6 ${msg.includes('Success') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {msg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none transition" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none transition" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Phone (8 digits)</label>
                  <input type="text" name="phone" value={formData.phone} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none transition" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Places (1-10)</label>
                  <input type="number" name="places" min="1" max="10" value={formData.places} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none transition" />
                </div>
              </div>
              <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 rounded-lg hover:from-purple-700 hover:to-pink-700 transition transform hover:scale-[1.02] shadow-lg mt-4">
                CONFIRM REGISTRATION
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EventDetails;
