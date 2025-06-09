
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Film, MapPin, Gift, Megaphone, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Movies", path: "/movies", icon: Film },
    { name: "Theaters", path: "/theaters", icon: MapPin },
    { name: "Promotions", path: "/promotions", icon: Gift },
    { name: "Info 21", path: "/info21", icon: Megaphone },
  ];

  const isActive = (path: string) => location.pathname === path || (path === "/" && location.pathname === "/");

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden md:block bg-white/95 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left: Brand */}
            <Link to="/" className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              CINEPLEX21
            </Link>

            {/* Center: Navigation */}
            <div className="flex items-center space-x-8">
              <Link
                to="/"
                className={`px-3 py-2 text-sm font-medium transition-all duration-200 rounded-lg ${
                  isActive("/") 
                    ? "text-emerald-600 bg-gradient-to-r from-emerald-50 to-teal-50" 
                    : "text-gray-700 hover:text-emerald-600 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50"
                }`}
              >
                Home
              </Link>
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`px-3 py-2 text-sm font-medium transition-all duration-200 rounded-lg ${
                    isActive(item.path) 
                      ? "text-emerald-600 bg-gradient-to-r from-emerald-50 to-teal-50" 
                      : "text-gray-700 hover:text-emerald-600 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Right: Empty space for balance */}
            <div className="w-32"></div>
          </div>
        </div>
      </nav>

      {/* Mobile Navbar - Top */}
      <nav className="md:hidden bg-white/95 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
        <div className="px-4">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              CINEPLEX21
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 hover:bg-emerald-50"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isOpen && (
          <div className="border-t border-gray-200/50 bg-white/95 backdrop-blur-md">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 text-base font-medium rounded-lg ${
                  isActive("/") ? "text-emerald-600 bg-gradient-to-r from-emerald-50 to-teal-50" : "text-gray-700 hover:text-emerald-600 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50"
                }`}
              >
                Home
              </Link>
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 text-base font-medium rounded-lg ${
                    isActive(item.path) ? "text-emerald-600 bg-gradient-to-r from-emerald-50 to-teal-50" : "text-gray-700 hover:text-emerald-600 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200/50 z-40 shadow-lg">
        <div className="grid grid-cols-5 h-16">
          <Link
            to="/"
            className={`flex flex-col items-center justify-center space-y-1 transition-colors ${
              isActive("/") ? "text-emerald-600" : "text-gray-600"
            }`}
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <div className={`w-2 h-2 rounded-full transition-all ${
                isActive("/") ? "bg-gradient-to-r from-emerald-600 to-teal-600 w-6" : "bg-gray-400"
              }`} />
            </div>
            <span className="text-xs">Home</span>
          </Link>
          {navItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex flex-col items-center justify-center space-y-1 transition-colors ${
                  isActive(item.path) ? "text-emerald-600" : "text-gray-600"
                }`}
              >
                <IconComponent size={20} />
                <span className="text-xs">{item.name.split(" ")[0]}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Navbar;
