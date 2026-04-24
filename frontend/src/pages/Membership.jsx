import { useState } from "react";
import { motion } from "framer-motion";

const Membership = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    university: "",
    preferences: [],
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const preferencesOptions = ["Music Production", "Event Organization", "Photography/Video", "DJing", "Marketing/PR", "Design"];

  const handleCheckbox = (opt) => {
    if (formData.preferences.includes(opt)) {
      setFormData({ ...formData, preferences: formData.preferences.filter(p => p !== opt) });
    } else {
      setFormData({ ...formData, preferences: [...formData.preferences, opt] });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setSubmitted(true);
    }, 1000);
  };

  if (submitted) {
    return (
      <div className="pt-32 pb-20 px-4 min-h-screen flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass p-12 rounded-3xl text-center max-w-lg"
        >
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
          </div>
          <h2 className="text-3xl font-bold mb-4">Application Received!</h2>
          <p className="text-gray-500 dark:text-gray-400">Thank you for applying to join Club Beast. Our team will review your application and get back to you shortly.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 px-4 max-w-4xl mx-auto min-h-screen">
      <div className="text-center mb-12">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold mb-4 uppercase tracking-tight"
        >
          Become a <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Member</span>
        </motion.h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">Join the organizing team and help create unforgettable experiences.</p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-8 md:p-12 rounded-3xl shadow-2xl"
      >
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">First Name</label>
              <input type="text" required value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-black/50 border border-gray-200 dark:border-gray-700 outline-none focus:ring-2 focus:ring-purple-500" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Last Name</label>
              <input type="text" required value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-black/50 border border-gray-200 dark:border-gray-700 outline-none focus:ring-2 focus:ring-purple-500" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-black/50 border border-gray-200 dark:border-gray-700 outline-none focus:ring-2 focus:ring-purple-500" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Phone</label>
              <input type="text" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-black/50 border border-gray-200 dark:border-gray-700 outline-none focus:ring-2 focus:ring-purple-500" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">University / Institute</label>
              <input type="text" required value={formData.university} onChange={e => setFormData({...formData, university: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-black/50 border border-gray-200 dark:border-gray-700 outline-none focus:ring-2 focus:ring-purple-500" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-4">Areas of Interest (Select multiple)</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {preferencesOptions.map(opt => (
                <label key={opt} className="flex items-center space-x-3 p-3 rounded-xl border border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                  <input type="checkbox" checked={formData.preferences.includes(opt)} onChange={() => handleCheckbox(opt)} className="w-5 h-5 rounded text-purple-600 focus:ring-purple-500" />
                  <span className="text-sm">{opt}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Why do you want to join us?</label>
            <textarea rows="4" required value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-black/50 border border-gray-200 dark:border-gray-700 outline-none focus:ring-2 focus:ring-purple-500 resize-none"></textarea>
          </div>

          <div className="pt-4 text-center">
            <button type="submit" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 px-12 rounded-full hover:shadow-[0_0_20px_rgba(139,92,246,0.6)] transition-all transform hover:-translate-y-1 text-lg">
              SUBMIT APPLICATION
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Membership;
