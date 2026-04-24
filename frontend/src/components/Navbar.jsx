import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Menu, X, Moon, Sun } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(localStorage.getItem('darkMode') === 'true');

  const toggleDarkMode = () => {
    const newMode = !isDark;
    setIsDark(newMode);
    localStorage.setItem('darkMode', newMode);
    if (newMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate("/login");
  };

  const navLinks = [
    { name: "Events", path: "/events" },
    { name: "Gallery", path: "/gallery" },
    { name: "Calendar", path: "/calendar" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="fixed w-full z-50 glass border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              CLUB CULTUREL EL MEDINA
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="hover:text-purple-500 transition px-3 py-2 rounded-md text-sm font-medium"
              >
                {link.name}
              </Link>
            ))}
            
            {user ? (
              <>
                <Link to="/membership" className="hover:text-purple-500 transition px-3 py-2 rounded-md text-sm font-medium">Membership</Link>
                <Link to="/profile" className="hover:text-purple-500 transition px-3 py-2 rounded-md text-sm font-medium">Profile</Link>
                {user.role === 'admin' && (
                  <Link to="/admin" className="hover:text-purple-500 transition px-3 py-2 rounded-md text-sm font-medium">Admin</Link>
                )}
                <button onClick={handleLogout} className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium transition">Logout</button>
              </>
            ) : (
              <Link to="/login" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium transition">Login</Link>
            )}
            
            <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition ml-2">
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Mobile Button Wrapper */}
          <div className="flex md:hidden items-center space-x-2">
            <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition">
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-purple-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden glass absolute top-16 left-0 w-full shadow-2xl border-b border-gray-200 dark:border-gray-800 z-50 animate-in slide-in-from-top duration-200">
          <div className="px-4 pt-2 pb-6 space-y-2 bg-white/90 dark:bg-black/90 backdrop-blur-xl">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block hover:bg-purple-500 hover:text-white px-4 py-3 rounded-xl text-base font-medium transition-all"
              >
                {link.name}
              </Link>
            ))}
            
            {user ? (
              <>
                <Link to="/membership" onClick={() => setIsOpen(false)} className="block hover:bg-purple-500 hover:text-white px-4 py-3 rounded-xl text-base font-medium transition-all">Membership</Link>
                <Link to="/profile" onClick={() => setIsOpen(false)} className="block hover:bg-purple-500 hover:text-white px-4 py-3 rounded-xl text-base font-medium transition-all">Profile</Link>
                {user.role === 'admin' && (
                  <Link to="/admin" onClick={() => setIsOpen(false)} className="block hover:bg-purple-500 hover:text-white px-4 py-3 rounded-xl text-base font-medium transition-all">Admin</Link>
                )}
                <button onClick={handleLogout} className="w-full text-left block hover:bg-purple-500 hover:text-white px-4 py-3 rounded-xl text-base font-medium transition-all">Logout</button>
              </>
            ) : (
              <Link to="/login" onClick={() => setIsOpen(false)} className="block hover:bg-purple-500 hover:text-white px-4 py-3 rounded-xl text-base font-medium transition-all">Login</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
