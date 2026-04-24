import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Send, Mail, User, MessageSquare, CheckCircle } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState({ loading: false, success: false, error: null });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: null });
    try {
      await axios.post("https://clubbeast.onrender.com/api/messages", formData);
      setStatus({ loading: false, success: true, error: null });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Error sending message", error);
      setStatus({ loading: false, success: false, error: "Failed to send message. Please try again." });
    }
  };

  return (
    <div className="pt-24 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Us</span>
          </h1>
          <p className="text-xl text-gray-500 dark:text-gray-400">Have questions? We'd love to hear from you.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="glass p-8 rounded-3xl space-y-6 shadow-lg">
              <h2 className="text-2xl font-bold">Get in Touch</h2>
              <div className="flex items-start space-x-4">
                <div className="bg-purple-500/10 p-3 rounded-xl">
                  <Mail className="text-purple-500" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-gray-500 dark:text-gray-400">contact@elmedina.tn</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-purple-500/10 p-3 rounded-xl">
                  <MessageSquare className="text-purple-500" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold">Social Media</h3>
                  <p className="text-gray-500 dark:text-gray-400">@ClubCulturelElMedina</p>
                </div>
              </div>
            </div>

            <div className="glass p-8 rounded-3xl overflow-hidden relative min-h-[200px] shadow-lg">
                <div className="absolute inset-0 z-0">
                    <img 
                        src="https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                        alt="Office" 
                        className="w-full h-full object-cover opacity-20"
                    />
                </div>
                <div className="relative z-10">
                    <h3 className="text-xl font-bold mb-2">Visit Us</h3>
                    <p className="text-gray-600 dark:text-gray-300">Medina of Tunis, Tunisia</p>
                    <p className="text-gray-600 dark:text-gray-300">Open Daily: 9:00 AM - 6:00 PM</p>
                </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="glass p-8 rounded-3xl shadow-xl"
          >
            {status.success ? (
              <div className="text-center py-12 space-y-6">
                <div className="flex justify-center">
                  <CheckCircle className="text-green-500" size={80} />
                </div>
                <h2 className="text-3xl font-bold">Message Sent!</h2>
                <p className="text-gray-500">Thank you for reaching out. We will get back to you as soon as possible.</p>
                <button 
                  onClick={() => setStatus({ ...status, success: false })}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full font-bold transition"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2 ml-1">Your Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 text-gray-400" size={20} />
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 ml-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 ml-1">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="General Inquiry"
                    className="w-full px-4 py-3 bg-white/5 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 ml-1">Message</label>
                  <textarea
                    name="message"
                    required
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    className="w-full px-4 py-3 bg-white/5 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                  ></textarea>
                </div>
                {status.error && (
                  <p className="text-red-500 text-sm">{status.error}</p>
                )}
                <button
                  type="submit"
                  disabled={status.loading}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  {status.loading ? "Sending..." : (
                    <>
                      <span>Send Message</span>
                      <Send size={20} />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
