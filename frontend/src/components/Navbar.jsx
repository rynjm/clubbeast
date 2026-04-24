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
    navigate("/login");
  };

  return (
    <nav className="fixed w-full z-50 glass transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              CLUB BEAST
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              <Link to="/events" className="hover:text-purple-500 transition px-3 py-2 rounded-md text-sm font-medium">Events</Link>
              <Link to="/gallery" className="hover:text-purple-500 transition px-3 py-2 rounded-md text-sm font-medium">Gallery</Link>
              <Link to="/calendar" className="hover:text-purple-500 transition px-3 py-2 rounded-md text-sm font-medium">Calendar</Link>
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
              <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button onClick={toggleDarkMode} className="p-2 mr-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition">
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden glass absolute w-full">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/events" className="block hover:bg-purple-500 hover:text-white px-3 py-2 rounded-md text-base font-medium">Events</Link>
            <Link to="/gallery" className="block hover:bg-purple-500 hover:text-white px-3 py-2 rounded-md text-base font-medium">Gallery</Link>
            <Link to="/calendar" className="block hover:bg-purple-500 hover:text-white px-3 py-2 rounded-md text-base font-medium">Calendar</Link>
            {user ? (
              <>
                <Link to="/membership" className="block hover:bg-purple-500 hover:text-white px-3 py-2 rounded-md text-base font-medium">Membership</Link>
                <Link to="/profile" className="block hover:bg-purple-500 hover:text-white px-3 py-2 rounded-md text-base font-medium">Profile</Link>
                {user.role === 'admin' && (
                  <Link to="/admin" className="block hover:bg-purple-500 hover:text-white px-3 py-2 rounded-md text-base font-medium">Admin</Link>
                )}
                <button onClick={handleLogout} className="w-full text-left block hover:bg-purple-500 hover:text-white px-3 py-2 rounded-md text-base font-medium">Logout</button>
              </>
            ) : (
              <Link to="/login" className="block hover:bg-purple-500 hover:text-white px-3 py-2 rounded-md text-base font-medium">Login</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
