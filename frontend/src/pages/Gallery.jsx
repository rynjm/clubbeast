import { motion } from "framer-motion";

const images = [
  { url: "https://images.unsplash.com/photo-1540039155732-68473684d008?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", caption: "Opening Ceremony" },
  { url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", caption: "Electronic Night" },
  { url: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", caption: "Live Concert" },
  { url: "https://images.unsplash.com/photo-1533174000255-a63b453965de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", caption: "DJ Set" },
  { url: "https://images.unsplash.com/photo-1506157786151-b8491531f063?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", caption: "Festival Vibes" },
  { url: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", caption: "Main Stage" }
];

const Gallery = () => {
  return (
    <div className="pt-24 pb-20 px-4 max-w-7xl mx-auto min-h-screen">
      <div className="text-center mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold mb-4 uppercase tracking-tight"
        >
          Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Gallery</span>
        </motion.h1>
        <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((img, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="relative group overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer"
          >
            <img src={img.url} onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80"; e.target.onerror = null; }} alt={img.caption} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
              <h3 className="text-white text-xl font-semibold tracking-wider">{img.caption}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
