import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const CalendarPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await axios.get("https://clubbeast.onrender.com/api/events");
        setEvents(data);
      } catch (error) {
        console.error("Error", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading) return <div className="pt-24 min-h-screen flex justify-center items-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div></div>;

  return (
    <div className="pt-24 pb-20 px-4 max-w-5xl mx-auto min-h-screen">
      <div className="text-center mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold mb-4 uppercase tracking-tight"
        >
          Event <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Calendar</span>
        </motion.h1>
        <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
      </div>

      <div className="space-y-6">
        {events.map((event, index) => (
          <motion.div 
            key={event._id}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="flex flex-col md:flex-row bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 hover:border-purple-500 transition-colors"
          >
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 text-white p-6 flex flex-col justify-center items-center min-w-[150px]">
              <span className="text-sm font-semibold uppercase">{new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}</span>
              <span className="text-4xl font-bold">{new Date(event.date).getDate()}</span>
              <span className="text-sm mt-1">{new Date(event.date).getFullYear()}</span>
            </div>
            <div className="p-6 flex-grow flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">{event.location}</p>
              <p className="text-gray-600 dark:text-gray-300 line-clamp-2">{event.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CalendarPage;
