import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";
import { Calendar, MapPin } from "lucide-react";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await axios.get("https://clubbeast.onrender.com/api/events");
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading) return <div className="pt-24 min-h-screen flex justify-center items-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div></div>;

  return (
    <div className="pt-24 pb-20 px-4 max-w-7xl mx-auto min-h-screen">
      <div className="text-center mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold mb-4 uppercase tracking-tight"
        >
          All <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Events</span>
        </motion.h1>
        <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {events.map((event, index) => (
          <motion.div 
            key={event._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glass rounded-2xl overflow-hidden group hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 flex flex-col h-full"
          >
            <div className="relative h-60 overflow-hidden">
              <img src={event?.imageUrl || "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80"} onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80"; e.target.onerror = null; }} alt={event?.title || "Event"} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-2xl font-bold mb-3 group-hover:text-purple-500 transition-colors">{event.title}</h3>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                <Calendar size={16} className="mr-2" />
                {new Date(event.date).toLocaleDateString()}
              </div>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                <MapPin size={16} className="mr-2" />
                {event.location}
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3 flex-grow">{event.description}</p>
              <Link to={`/events/${event._id}`} className="block w-full text-center bg-gray-100 hover:bg-purple-600 dark:bg-gray-800 dark:hover:bg-purple-600 text-black dark:text-white hover:text-white font-semibold py-3 rounded-lg transition-colors">
                VIEW DETAILS
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Events;
