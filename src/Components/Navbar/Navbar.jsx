import React, { useState } from 'react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);


  return (
    <div className="fixed w-full z-20 top-4 px-4">
      <nav className={`max-w-screen-xl mx-auto p-4 small-box-shadow rounded-2xl`}>
        <div className="flex flex-wrap items-center justify-between mx-auto px-4">
          
          {/* Logo Section */}
          <a href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-blue-500 rounded-2xl flex items-center justify-center shadow-[inset_4px_4px_8px_rgba(255,255,255,0.4),4px_4px_8px_rgba(59,130,246,0.3)]">
               <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="self-center text-2xl font-bold tracking-tight text-slate-800">
              SIP<span className="text-blue-600">Vision</span>
            </span>
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 rounded-xl border border-white/40 shadow-[inset_2px_2px_4px_rgba(255,255,255,1),2px_2px_4px_rgba(0,0,0,0.1)] active:shadow-inner transition-all`}
          >
            <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>

          {/* Navigation Links */}
          <div className={`${isOpen ? 'block' : 'hidden'} w-full md:block md:w-auto mt-4 md:mt-0`}>
            <ul className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0 font-semibold text-slate-600">
              <li>
                <a href="#" className="block py-2 px-6 rounded-2xl bg-blue-500 text-white shadow-[inset_4px_4px_8px_rgba(255,255,255,0.3),4px_4px_12px_rgba(59,130,246,0.4)] hover:scale-105 transition-transform">
                  Home
                </a>
              </li>
              {['MF Details', 'Benefits', 'User Details', 'Investment Apps'].map((item) => (
                <li key={item}>
                  <a href="#" className="block py-2 px-6 rounded-2xl hover:bg-slate-100/50 hover:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.05)] transition-all">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;