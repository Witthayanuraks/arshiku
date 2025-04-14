import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  FiHome, FiCompass, FiBookmark, 
  FiSettings, FiLogOut, FiChevronLeft, 
  FiChevronRight, FiMenu, FiX 
} from 'react-icons/fi';
import { 
  RiHistoryFill, RiLightbulbFlashLine, 
  RiSearchEyeLine, RiArrowDownSLine, RiArrowRightSLine 
} from 'react-icons/ri';
import logoDesk from '../assets/Desktop.png';
// import logoAndro from '../assets/Android.png';
import logoMin from '../assets/Fav.png';


const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setMobileOpen(false);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    {
      path: '/',
      icon: <RiHistoryFill className="flex-shrink-0" />,
      label: 'Blog Sejarah',
      submenu: [
        { path: '/ancient', label: 'Zaman Kuno' },
        { path: '/colonial', label: 'Masa Kolonial' },
        { path: '/independence', label: 'Era Kemerdekaan' }
      ]
    },
    {
      path: '/fakta-unik',
      icon: <RiSearchEyeLine className="flex-shrink-0" />,
      label: 'Fakta Unik'
    },
    {
      path: '/tips-teknologi',
      icon: <RiLightbulbFlashLine className="flex-shrink-0" />,
      label: 'Tips Teknologi',
      submenu: [
        { path: '/tips/security', label: 'Keamanan Digital' },
        { path: '/tips/productivity', label: 'Produktivitas' },
        { path: '/tips/gadgets', label: 'Gadget Terkini' }
      ]
    },
    {
      path: '/explore',
      icon: <FiCompass className="flex-shrink-0" />,
      label: 'Jelajahi'
    },
    {
      path: '/bookmarks',
      icon: <FiBookmark className="flex-shrink-0" />,
      label: 'Disimpan'
    }
  ];

  const isActive = (path) => location.pathname.startsWith(path);

  const toggleSubmenu = (path) => {
    setActiveSubmenu(activeSubmenu === path ? null : path);
  };

  const toggleSidebar = () => {
    isMobile ? setMobileOpen(!mobileOpen) : setCollapsed(!collapsed);
  };

  const closeMobileSidebar = () => setMobileOpen(false);

  const handleLogout = () => navigate('/login');

  return (
    <>
      {/* Mobile Toggle Button */}
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-lg text-gray-700"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      )}

      {/* Overlay */}
      {isMobile && mobileOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={closeMobileSidebar}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed md:relative z-40 h-screen flex flex-col justify-between 
          bg-white border-r border-gray-100 shadow-sm transition-all duration-300
          ${isMobile 
            ? `${mobileOpen ? 'translate-x-0' : '-translate-x-full'} w-64`
            : `${collapsed ? 'w-20' : 'w-64'}`
          }
        `}
      >
 <div className="px-4 py-6 overflow-y-auto">
  {/* Logo */}
  <div className={`flex items-center justify-between mb-8 ${collapsed && !isMobile ? 'flex-col' : ''}`}>
    <Link 
      to="/" 
      onClick={closeMobileSidebar}
      className={`${collapsed && !isMobile ? 'mx-auto' : ''}`}
    >
      {collapsed && !isMobile ? (
        <div className="bg-black rounded-lg p-1"> {/* Added padding to ensure logo visibility */}
          <img 
            src={logoMin}
            alt="Logo" 
            className="w-8 h-8" 
          />
        </div>
      ) : (
        <div className="bg-black rounded-lg p-2"> {/* Added background and padding for consistency */}
          <img 
            src={logoDesk}
            alt="BlogKu" 
            className="h-8" 
          />
        </div>
      )}
    </Link>
    {!isMobile && (
      <button 
        onClick={toggleSidebar}
        className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500 hover:text-gray-700"
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed ? <FiChevronRight /> : <FiChevronLeft />}
      </button>
    )}
  </div>

          {/* Navigation */}
          <nav>
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.path}>
                  <div className="relative">
                    <Link
                      to={item.submenu ? '#' : item.path}
                      onClick={(e) => {
                        if (item.submenu) {
                          e.preventDefault();
                          toggleSubmenu(item.path);
                        } else {
                          closeMobileSidebar();
                        }
                      }}
                      className={`
                        flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium
                        transition-colors duration-200
                        ${isActive(item.path)
                          ? 'bg-coral/10 text-coral'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}
                        ${collapsed && !isMobile ? 'justify-center' : ''}
                      `}
                    >
                      <span className={`text-lg ${isActive(item.path) ? 'text-coral' : 'text-gray-500'}`}>
                        {item.icon}
                      </span>
                      {(!collapsed || isMobile) && (
                        <>
                          <span className="flex-1">{item.label}</span>
                          {item.submenu && (
                            <span className="ml-auto">
                              {activeSubmenu === item.path ? 
                                <RiArrowDownSLine /> : 
                                <RiArrowRightSLine />}
                            </span>
                          )}
                        </>
                      )}
                    </Link>
                    
                    {/* Submenu */}
                    {item.submenu && (activeSubmenu === item.path || isMobile) && (!collapsed || isMobile) && (
                      <ul className={`ml-4 mt-1 space-y-1 pl-4 border-l-2 border-gray-200 ${collapsed && !isMobile ? 'hidden' : ''}`}>
                        {item.submenu.map((subItem) => (
                          <li key={subItem.path}>
                            <Link
                              to={subItem.path}
                              onClick={closeMobileSidebar}
                              className={`
                                block px-3 py-2 rounded text-sm transition-colors duration-200
                                ${isActive(subItem.path)
                                  ? 'text-coral font-medium'
                                  : 'text-gray-500 hover:text-gray-700'}
                              `}
                            >
                              {subItem.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* User Profile */}
        <div className="px-4 py-4 border-t border-gray-100 bg-gray-50">
          <div className={`flex items-center gap-3 ${collapsed && !isMobile ? 'justify-center' : ''}`}>
            <img
              alt="User"
              src="https://media1.tenor.com/m/CFowpSoO7VsAAAAC/adad.gif"
              className="w-10 h-10 rounded-full object-cover border-2 border-transparent hover:border-coral transition-colors"
            />
            
            {(!collapsed || isMobile) && (
              <div className="overflow-hidden">
                <p className="text-sm font-medium text-gray-900 truncate">Takanashi Rikka</p>
                <p className="text-xs text-gray-500 truncate">zhelprev</p>
              </div>
            )}
          </div>

          {(!collapsed || isMobile) && (
            <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
              <Link
                to="/settings"
                onClick={closeMobileSidebar}
                className={`
                  flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium
                  transition-colors duration-200
                  ${isActive('/settings')
                    ? 'bg-gray-200 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}
                `}
              >
                <FiSettings />
                <span>Pengaturan</span>
              </Link>
              
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
              >
                <FiLogOut />
                <span>Keluar</span>
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

// import React, { useState, useEffect } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import logo from '../assets/Desktop.png';
// import { 
//   FiHome, FiCompass, FiBookmark, FiSettings, 
//   FiLogOut, FiChevronLeft, FiChevronRight,
//   FiMenu, FiX
// } from 'react-icons/fi';
// import { 
//   RiHistoryFill, RiLightbulbFlashLine, 
//   RiSearchEyeLine, RiArrowDownSLine, RiArrowRightSLine 
// } from 'react-icons/ri';

// const Sidebar = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [collapsed, setCollapsed] = useState(false);
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [activeSubmenu, setActiveSubmenu] = useState(null);
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

//   const isActive = (path) => location.pathname.startsWith(path);

//   const navItems = [
//     {
//       path: '/',
//       icon: <RiHistoryFill className="flex-shrink-0" size={20} />,
//       label: 'Blog Sejarah',
//       submenu: [
//         { path: '/ancient', label: 'Zaman Kuno' },
//         { path: '/colonial', label: 'Masa Kolonial' },
//         { path: '/independence', label: 'Era Kemerdekaan' }
//       ]
//     },
//     {
//       path: '/fakta-unik',
//       icon: <RiSearchEyeLine className="flex-shrink-0" size={20} />,
//       label: 'Fakta Unik'
//     },
//     {
//       path: '/tips-teknologi',
//       icon: <RiLightbulbFlashLine className="flex-shrink-0" size={20} />,
//       label: 'Tips Teknologi',
//       submenu: [
//         { path: '/tips/security', label: 'Keamanan Digital' },
//         { path: '/tips/productivity', label: 'Produktivitas' },
//         { path: '/tips/gadgets', label: 'Gadget Terkini' }
//       ]
//     },
//     {
//       path: '/explore',
//       icon: <FiCompass className="flex-shrink-0" size={20} />,
//       label: 'Jelajahi'
//     },
//     {
//       path: '/bookmarks',
//       icon: <FiBookmark className="flex-shrink-0" size={20} />,
//       label: 'Disimpan'
//     }
//   ];

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 768);
//       if (window.innerWidth >= 768) {
//         setMobileOpen(false);
//       }
//     };

//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const toggleSubmenu = (path) => {
//     setActiveSubmenu(activeSubmenu === path ? null : path);
//   };

//   const handleLogout = () => {
//     navigate('/login');
//   };

//   const toggleSidebar = () => {
//     if (isMobile) {
//       setMobileOpen(!mobileOpen);
//     } else {
//       setCollapsed(!collapsed);
//     }
//   };

//   const closeMobileSidebar = () => {
//     if (isMobile) {
//       setMobileOpen(false);
//     }
//   };

//   return (
//     <>
//       {isMobile && (
//         <button
//           onClick={toggleSidebar}
//           className="fixed top-4 left-4 z-40 p-2 rounded-md bg-white shadow-md text-gray-700"
//           aria-label="Toggle menu"
//         >
//           {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
//         </button>
//       )}

//       {isMobile && mobileOpen && (
//         <div 
//           className="fixed inset-0 z-30 bg-black bg-opacity-50"
//           onClick={closeMobileSidebar}
//         />
//       )}

//       {/* Sidebar */}
//       <aside 
//         className={`
//           fixed md:relative z-40 h-screen flex flex-col justify-between bg-white border-r border-gray-100 
//           transition-all duration-300 ease-in-out
//           ${isMobile 
//             ? `${mobileOpen ? 'translate-x-0' : '-translate-x-full'} w-64`
//             : `${collapsed ? 'w-20' : 'w-64'}`
//           }
//         `}
//       >
//         <div className="px-4 py-6 overflow-y-auto">
//           <div className={`flex items-center justify-between mb-8 ${collapsed && !isMobile ? 'flex-col gap-4' : ''}`}>
//             <Link to="/" onClick={closeMobileSidebar}>
//               <img 
//                 src={logo} 
//                 alt="Logo" 
//                 className={`rounded-lg transition-all ${collapsed && !isMobile ? 'h-10 w-10' : 'h-12 w-auto'}`} 
//               />
//             </Link>
//             {!isMobile && (
//               <button 
//                 onClick={toggleSidebar}
//                 className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors pointer-events-none"
//                 aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
//               >
//                 {collapsed ? <FiChevronRight size={20} /> : <FiChevronLeft size={20} />}
//               </button>
//             )}
//           </div>

//           {/* Navigation */}
//           <nav aria-label="Main navigation">
//             <ul className="space-y-1">
//               {navItems.map((item) => (
//                 <li key={item.path}>
//                   <div className="relative">
//                     <Link
//                       to={item.submenu ? '#' : item.path}
//                       className={`
//                         flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium 
//                         transition-all duration-200
//                         ${isActive(item.path)
//                           ? 'bg-coral text-white shadow-md'
//                           : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
//                         ${collapsed && !isMobile ? 'justify-center' : ''}
//                       `}
//                       onClick={(e) => {
//                         if (item.submenu) {
//                           e.preventDefault();
//                           toggleSubmenu(item.path);
//                         } else {
//                           closeMobileSidebar();
//                         }
//                       }}
//                     >
//                       {item.icon}
//                       {(!collapsed || isMobile) && (
//                         <>
//                           <span className="flex-1">{item.label}</span>
//                           {item.submenu && (
//                             <span className="ml-2">
//                               {activeSubmenu === item.path ? 
//                                 <RiArrowDownSLine size={16} /> : 
//                                 <RiArrowRightSLine size={16} />}
//                             </span>
//                           )}
//                         </>
//                       )}
//                     </Link>
                    
//                     {/* Submenu */}
//                     {item.submenu && (activeSubmenu === item.path || isMobile) && (!collapsed || isMobile) && (
//                       <ul className={`ml-6 mt-1 space-y-1 pl-2 border-l-2 border-gray-200 ${collapsed && !isMobile ? 'hidden' : ''}`}>
//                         {item.submenu.map((subItem) => (
//                           <li key={subItem.path}>
//                             <Link
//                               to={subItem.path}
//                               onClick={closeMobileSidebar}
//                               className={`
//                                 block px-3 py-2 rounded text-sm transition-all duration-200
//                                 ${isActive(subItem.path)
//                                   ? 'text-coral font-medium'
//                                   : 'text-gray-500 hover:text-gray-700'}
//                               `}
//                             >
//                               {subItem.label}
//                             </Link>
//                           </li>
//                         ))}
//                       </ul>
//                     )}
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </nav>
//         </div>

//         {/* User Profile and Settings */}
//         <div className="px-4 py-4 border-t border-gray-100 bg-gray-50">
//           <div className={`flex items-center gap-3 ${collapsed && !isMobile ? 'justify-center' : ''}`}>
//             <img
//               alt="User profile"
//               src="https://media1.tenor.com/m/CFowpSoO7VsAAAAC/adad.gif"
//               className="h-10 w-10 rounded-full object-cover border-2 border-transparent hover:border-coral transition-all"
//             />
            
//             {(!collapsed || isMobile) && (
//               <div className="overflow-hidden">
//                 <p className="text-sm font-medium text-gray-900 truncate">Biji Suaminya Takanashi Rikka</p>
//                 <p className="text-xs text-gray-500 truncate">emailnyarikka@yahoo.id</p>
//               </div>
//             )}
//           </div>

//           {(!collapsed || isMobile) && (
//             <div className="mt-4 pt-4 border-t border-gray-200">
//               <Link
//                 to="/settings"
//                 onClick={closeMobileSidebar}
//                 className={`
//                   flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium 
//                   transition-all duration-200
//                   ${isActive('/settings')
//                     ? 'bg-gray-100 text-gray-900'
//                     : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}
//                 `}
//               >
//                 <FiSettings size={18} />
//                 <span>Pengaturan</span>
//               </Link>
              
//               <button
//                 onClick={handleLogout}
//                 className="flex items-center gap-3 w-full px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200"
//               >
//                 <FiLogOut size={18} />
//                 <span>Keluar</span>
//               </button>
//             </div>
//           )}
//         </div>
//       </aside>
//     </>
//   );
// };

// export default Sidebar;