const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-black py-8 text-center border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4">CLUB BEAST</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">© {new Date().getFullYear()} Club Beast. All rights reserved.</p>
        <div className="flex justify-center space-x-4">
          <a href="#" className="text-gray-400 hover:text-purple-500 transition">Instagram</a>
          <a href="#" className="text-gray-400 hover:text-purple-500 transition">Facebook</a>
          <a href="#" className="text-gray-400 hover:text-purple-500 transition">Twitter</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
