import { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { Users, Calendar as CalIcon, Ticket, Trash2, Edit } from "lucide-react";

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("events");
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  
  const [newEvent, setNewEvent] = useState({ title: "", description: "", date: "", location: "", imageUrl: "" });

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      if (activeTab === "events") {
        const { data } = await axios.get("http://localhost:5000/api/events");
        setEvents(data);
      } else if (activeTab === "users") {
        const { data } = await axios.get("http://localhost:5000/api/users", config);
        setUsers(data);
      } else if (activeTab === "registrations") {
        const { data } = await axios.get("http://localhost:5000/api/registrations", config);
        setRegistrations(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/events", newEvent, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setNewEvent({ title: "", description: "", date: "", location: "", imageUrl: "" });
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteEvent = async (id) => {
    if(window.confirm("Are you sure?")) {
      try {
        await axios.delete(`http://localhost:5000/api/events/${id}`, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        fetchData();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="pt-24 pb-20 px-4 max-w-7xl mx-auto min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-tight">Admin <span className="text-purple-500">Dashboard</span></h1>
        <div className="flex space-x-2 mt-4 md:mt-0 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
          <button onClick={() => setActiveTab('events')} className={`px-4 py-2 rounded-lg font-medium transition flex items-center ${activeTab === 'events' ? 'bg-white dark:bg-black shadow text-purple-600' : 'text-gray-500'}`}><CalIcon size={16} className="mr-2" /> Events</button>
          <button onClick={() => setActiveTab('users')} className={`px-4 py-2 rounded-lg font-medium transition flex items-center ${activeTab === 'users' ? 'bg-white dark:bg-black shadow text-purple-600' : 'text-gray-500'}`}><Users size={16} className="mr-2" /> Users</button>
          <button onClick={() => setActiveTab('registrations')} className={`px-4 py-2 rounded-lg font-medium transition flex items-center ${activeTab === 'registrations' ? 'bg-white dark:bg-black shadow text-purple-600' : 'text-gray-500'}`}><Ticket size={16} className="mr-2" /> Registrations</button>
        </div>
      </div>

      <motion.div 
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === "events" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 glass p-6 rounded-2xl h-fit">
              <h2 className="text-xl font-bold mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Create New Event</h2>
              <form onSubmit={handleCreateEvent} className="space-y-4">
                <input type="text" placeholder="Title" required value={newEvent.title} onChange={e => setNewEvent({...newEvent, title: e.target.value})} className="w-full px-3 py-2 rounded-lg bg-white/50 dark:bg-black/50 border border-gray-200 dark:border-gray-700 outline-none" />
                <textarea placeholder="Description" required value={newEvent.description} onChange={e => setNewEvent({...newEvent, description: e.target.value})} className="w-full px-3 py-2 rounded-lg bg-white/50 dark:bg-black/50 border border-gray-200 dark:border-gray-700 outline-none resize-none h-24"></textarea>
                <input type="datetime-local" required value={newEvent.date} onChange={e => setNewEvent({...newEvent, date: e.target.value})} className="w-full px-3 py-2 rounded-lg bg-white/50 dark:bg-black/50 border border-gray-200 dark:border-gray-700 outline-none" />
                <input type="text" placeholder="Location" required value={newEvent.location} onChange={e => setNewEvent({...newEvent, location: e.target.value})} className="w-full px-3 py-2 rounded-lg bg-white/50 dark:bg-black/50 border border-gray-200 dark:border-gray-700 outline-none" />
                <input type="url" placeholder="Image URL" required value={newEvent.imageUrl} onChange={e => setNewEvent({...newEvent, imageUrl: e.target.value})} className="w-full px-3 py-2 rounded-lg bg-white/50 dark:bg-black/50 border border-gray-200 dark:border-gray-700 outline-none" />
                <button type="submit" className="w-full bg-purple-600 text-white font-bold py-2 rounded-lg hover:bg-purple-700 transition">Create</button>
              </form>
            </div>
            <div className="lg:col-span-2 space-y-4">
              {events.map(event => (
                <div key={event._id} className="glass p-4 rounded-xl flex items-center justify-between border border-gray-100 dark:border-gray-800">
                  <div className="flex items-center space-x-4">
                    <img src={event?.imageUrl || "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80"} onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80"; e.target.onerror = null; }} alt="" className="w-16 h-16 rounded-lg object-cover" />
                    <div>
                      <h4 className="font-bold">{event.title}</h4>
                      <p className="text-sm text-gray-500">{new Date(event.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <button onClick={() => handleDeleteEvent(event._id)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"><Trash2 size={20} /></button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "users" && (
          <div className="glass rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 dark:bg-gray-800/50">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Name</th>
                    <th className="px-6 py-4 font-semibold">Email</th>
                    <th className="px-6 py-4 font-semibold">Role</th>
                    <th className="px-6 py-4 font-semibold">Joined</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {users.map(u => (
                    <tr key={u._id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition">
                      <td className="px-6 py-4">{u.name}</td>
                      <td className="px-6 py-4">{u.email}</td>
                      <td className="px-6 py-4"><span className={`px-2 py-1 rounded text-xs font-semibold ${u.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'}`}>{u.role}</span></td>
                      <td className="px-6 py-4 text-sm text-gray-500">{new Date(u.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "registrations" && (
          <div className="glass rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 dark:bg-gray-800/50">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Event</th>
                    <th className="px-6 py-4 font-semibold">User Info</th>
                    <th className="px-6 py-4 font-semibold">Places</th>
                    <th className="px-6 py-4 font-semibold">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {registrations.map(reg => (
                    <tr key={reg._id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition">
                      <td className="px-6 py-4 font-medium">{reg.event?.title || "Deleted Event"}</td>
                      <td className="px-6 py-4">
                        <div className="text-sm">{reg.name}</div>
                        <div className="text-xs text-gray-500">{reg.email}</div>
                        <div className="text-xs text-gray-500">{reg.phone}</div>
                      </td>
                      <td className="px-6 py-4 font-bold text-purple-600">{reg.places}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{new Date(reg.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
