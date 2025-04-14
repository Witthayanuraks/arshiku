import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/Desktop.png';
import '../index.css';

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex h-screen flex-col justify-between border-e border-lightGray bg-white w-64">
      <div className="px-4 py-6">
        {/* Logo with coral accent */}
        <div className="flex items-center justify-center mb-8 group">
          <img 
            src={logo} 
            alt="Logo" 
            className="h-12 w-auto rounded-lg shadow-md group-hover:shadow-coral/20 transition-all duration-300" 
          />
        </div>

        {/* Navigation with improved color usage */}
        <ul className="space-y-2">
          <li>
            <Link
              to="/"
              className={`flex items-center rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200
                ${isActive('/') 
                  ? 'bg-coral text-white shadow-md' 
                  : 'text-darkGray hover:bg-calmBlueLight hover:text-calmBlue'}
              `}
            >
              <span className="mr-2">📜</span>
              Blog Sejarah
            </Link>
          </li>

          <li>
            <Link
              to="/fakta-unik"
              className={`flex items-center rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200
                ${isActive('/fakta-unik') 
                  ? 'bg-coral text-white shadow-md' 
                  : 'text-darkGray hover:bg-calmBlueLight hover:text-calmBlue'}
              `}
            >
              <span className="mr-2">🔍</span>
              Fakta Unik
            </Link>
          </li>

          <li>
            <Link
              to="/tips-teknologi"
              className={`flex items-center rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200
                ${isActive('/tips-teknologi') 
                  ? 'bg-coral text-white shadow-md' 
                  : 'text-darkGray hover:bg-calmBlueLight hover:text-calmBlue'}
              `}
            >
              <span className="mr-2">💡</span>
              Tips & Trick Teknologi
            </Link>
          </li>
        </ul>
      </div>

      {/* User profile with coral accent */}
      <div className="sticky inset-x-0 bottom-0 border-t border-lightGray bg-white">
        <a 
          href="#" 
          className="flex items-center gap-3 p-4 hover:bg-calmBlueLight transition-colors duration-200 group"
        >
          <img
            alt="User"
            src="https://media1.tenor.com/m/CFowpSoO7VsAAAAC/adad.gif"
            className="h-10 w-10 rounded-full object-cover border-2 border-transparent group-hover:border-coral transition-all"
          />
          <div className="overflow-hidden">
            <p className="text-sm font-medium text-darkGray truncate">Eric Frusciante</p>
            <p className="text-xs text-calmBlue truncate">eric@frusciante.com</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Sidebar;