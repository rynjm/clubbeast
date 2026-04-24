import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 uppercase">
            About <span className="text-purple-600">Our Club</span>
          </h1>
          <div className="w-24 h-1 bg-purple-500 mx-auto rounded-full mb-8"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass p-8 md:p-12 rounded-3xl text-lg text-gray-700 dark:text-gray-300 leading-relaxed shadow-xl"
        >
          <p>
            The Cultural Club El Medina is an association dedicated to promoting Tunisian art, culture, and heritage. Located in the heart of the Medina of Tunis, we organize performances, exhibitions, and workshops throughout the year for all ages. Join our community to celebrate the richness of our history while supporting contemporary artistic expression.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
