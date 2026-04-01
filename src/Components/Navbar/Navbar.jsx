import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');
  const navigate = useNavigate();
  const location = useLocation()

  useEffect( () => {
    setActiveTab(location.pathname)
    console.log(location.pathname)
  } , [location.pathname] )

  // Style snippets
  const clayInactive = "text-slate-600 hover:bg-slate-100/50 hover:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.05)]";
  const clayActive = "small-box-shadow bg-blue-600 text-white rounded-2xl transition-all duration-300";

  return (
    <div className="fixed w-full  z-20 top-4 px-4">
      <nav className="max-w-7xl mx-auto p-3.5 bg-white/90 backdrop-blur-md small-box-shadow rounded-2xl">
        <div className="flex flex-wrap items-center justify-between mx-auto px-4">
          
          {/* Logo Section */}
          <div 
            className="flex items-center space-x-3 cursor-pointer" 
            onClick={() => {
              setActiveTab('Home');
              navigate('/');
            }}
          >
            <div className="w-8 h-8 bg-blue-600 small-box-shadow rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-md">S</span>
            </div>
            <span className="self-center text-xl font-bold tracking-tight text-slate-800">
              SIP<span className="text-blue-600">Vision</span>
            </span>
          </div>

          {/* Mobile Toggle Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="md:hidden p-2 text-slate-600 focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>

          {/* Navigation Items - Individual Divs, No Map, No Array */}
          <div className={`${isOpen ? 'block' : 'hidden'} text-sm w-full md:block md:w-auto mt-4 md:mt-0`}>
            <div className="flex flex-col md:flex-row md:space-x-2 space-y-2 md:space-y-0 font-semibold">
              
              <div className="md:w-auto w-full">
                <button
                  onClick={() => {
                    setActiveTab('/');
                    setIsOpen(false);
                    navigate('/');
                  }}
                  className={`w-full block py-2 px-5 rounded-2xl transition-all ${activeTab === '/' ? clayActive : clayInactive}`}
                >
                  Form
                </button>
              </div>

              {/* Home Item */}
              <div className="md:w-auto w-full">
                <button
                  onClick={() => {
                    setActiveTab('/home');
                    setIsOpen(false);
                    navigate('/home');
                  }}
                  className={`w-full block py-2 px-5 rounded-2xl transition-all ${activeTab === '/home' ? clayActive : clayInactive}`}
                >
                  Home
                </button>
              </div>
              

              {/* MF Details Item */}
              <div className="md:w-auto w-full">
                <button
                  onClick={() => {
                    setActiveTab('/mfdetails');
                    setIsOpen(false);
                    navigate('/mfdetails');
                  }}
                  className={`w-full block py-2 px-5 rounded-2xl transition-all ${activeTab === '/mfdetails' ? clayActive : clayInactive}`}
                >
                  MF Details
                </button>
              </div>

              {/* Benefits Item */}
              <div className="md:w-auto w-full">
                <button
                  onClick={() => {
                    setActiveTab('/services');
                    setIsOpen(false);
                    navigate('/services');
                  }}
                  className={`w-full block py-2 px-5 rounded-2xl transition-all ${activeTab === '/services' ? clayActive : clayInactive}`}
                >
                  Services
                </button>
              </div>

              {/* User Details Item */}
              <div className="md:w-auto w-full">
                <button
                  onClick={() => {
                    setActiveTab('/user-details');
                    setIsOpen(false);
                    navigate('/user-details');
                  }}
                  className={`w-full block py-2 px-5 rounded-2xl transition-all ${activeTab === '/user-details' ? clayActive : clayInactive}`}
                >
                  User Details
                </button>
              </div>

              {/* Investment Apps Item */}
              <div className="md:w-auto w-full">
                <button
                  onClick={() => {
                    setActiveTab('/investment-apps');
                    setIsOpen(false);
                    navigate('/investment-apps');
                  }}
                  className={`w-full block py-2 px-5 rounded-2xl transition-all ${activeTab === '/investment-apps' ? clayActive : clayInactive}`}
                >
                  Investment Apps
                </button>
              </div>

            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;