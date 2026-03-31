import React, { useState } from 'react';

// Placeholder Components for demonstration
const MFDetails = () => <div className="p-8 mt-24 text-center">Mutual Fund Details Content</div>;
const Benefits = () => <div className="p-8 mt-24 text-center">Benefits Content</div>;
const UserDetails = () => <div className="p-8 mt-24 text-center">User Profile Settings</div>;
const InvestmentApps = () => <div className="p-8 mt-24 text-center">Top Investment Apps</div>;

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');

  const menuItems = ['Home', 'MF Details', 'Benefits', 'User Details', 'Investment Apps'];

  // Claymorphism Style Snippets
  const clayInactive = "text-slate-600 hover:bg-slate-100/50 hover:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.05)]";

  // Component Router Logic
  const renderComponent = () => {
    switch (activeTab) {
      case 'MF Details': return <MFDetails />;
      case 'Benefits': return <Benefits />;
      case 'User Details': return <UserDetails />;
      case 'Investment Apps': return <InvestmentApps />;
      default: return <div className="p-8 mt-24 text-center">Welcome Home</div>;
    }
  };

  return (
    <>
      <div className="fixed w-full z-20 top-4 px-4">
        <nav className="max-w-screen-xl mx-auto p-4 small-box-shadow rounded-2xl">
          <div className="flex flex-wrap items-center justify-between mx-auto px-4">
            
            {/* Logo */}
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('Home')}>
              <div className="w-8 h-8 bg-blue-600 small-box-shadow rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-md">S</span>
              </div>
              <span className="self-center text-xl font-bold tracking-tight text-slate-800">
                SIP<span className="text-blue-600">Vision</span>
              </span>
            </div>

            {/* Mobile Toggle */}
            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-slate-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>

            {/* Nav Items */}
            <div className={`${isOpen ? 'block' : 'hidden'} text-sm w-full md:block md:w-auto mt-4 md:mt-0`}>
              <ul className="flex flex-col md:flex-row md:space-x-2 space-y-2 md:space-y-0 font-semibold">
                {menuItems.map((item) => (
                  <li key={item}>
                    <button
                      onClick={() => {
                        setActiveTab(item);
                        setIsOpen(false); // Close mobile menu on click
                      }}
                      className={`w-full block py-2 px-5 rounded-2xl transition-all duration-200 ${
                        activeTab === item ? "small-box-shadow rounded-2xl bg-blue-600 text-white" : clayInactive
                      }`}
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
      </div>

      {/* Main Content Area */}
      <main className="pt-20">
        {renderComponent()}
      </main>
    </>
  );
}

export default Navbar;