import React from 'react';
import { 
  LineChart, 
  Target, 
  ShieldCheck, 
  Layers, 
  MousePointerClick, 
  BarChart3 
} from 'lucide-react'; 
import { useNavigate } from 'react-router';
import "./Services.css";

const Services = () => {
  const navigate = useNavigate();

  const services = [
    {
      title: "Goal-Based Visualization",
      desc: "Stop guessing. Input your dream—a house, a car, or retirement—and SIP Vision creates a clear visual path to show exactly how much you need to invest.",
      icon: <Target className="w-8 h-8 text-rose-500" />,
    },
    {
      title: "Interactive SIP Calculator",
      desc: "Play with numbers in real-time. Adjust your monthly amount and duration to see how the Power of Compounding changes your future wealth instantly.",
      icon: <LineChart className="w-8 h-8 text-blue-500" />,
    },
    {
      title: "Risk-Profile Matching",
      desc: "Not all investors are the same. We analyze your comfort zone and recommend 'Baskets'—Conservative, Balanced, or Aggressive—that fit your personality.",
      icon: <ShieldCheck className="w-8 h-8 text-emerald-500" />,
    },
    {
      title: "Portfolio Diversification",
      desc: "The 'Mega Basket' approach. SIP Vision ensures your money isn't all in one place, spreading it across Top 50 companies and government bonds automatically.",
      icon: <Layers className="w-8 h-8 text-indigo-500" />,
    },
    {
      title: "One-Click Automation",
      desc: "No paperwork, no headache. Set up your monthly investment in under 60 seconds. It’s as simple as subscribing to your favorite OTT platform.",
      icon: <MousePointerClick className="w-8 h-8 text-amber-500" />,
    },
    {
      title: "Performance Analytics",
      desc: "Get deep insights into your growth. Our dashboard uses clean charts to show you your total investment vs. your current profit at a glance.",
      icon: <BarChart3 className="w-8 h-8 text-cyan-500" />,
    }
  ];

  return (
    <div
    className="min-h-screen w-full bg-slate-50 py-40 px-6 font-sans">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
          Experience <span className="text-blue-600">SIP Vision</span>
        </h1>
        <p className="text-lg text-slate-600">
          We turn complex financial data into a simple, visual roadmap. See your wealth grow 
          before you even invest a single rupee.
        </p>
      </div>

      {/* Services Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div 
            key={index} 
            className="bg-white small-box-shadow hover:scale-102 p-8 rounded-2xl transition-all duration-300 group"
          >
            <div className="mb-4 bg-slate-50 w-16 h-16 rounded-xl flex items-center justify-center group-hover:bg-blue-50 transition-colors">
              {service.icon}
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-3">{service.title}</h3>
            <p className="text-slate-600 leading-relaxed">
              {service.desc}
            </p>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto  medium-box-shadow mt-20 bg-blue-600 rounded-3xl p-10 text-center text-white ">
        <h2 className="text-3xl font-bold mb-4">Start Your Vision Today</h2>
        <p className="text-blue-100 mb-8 text-lg">
          Join thousands of smart investors using SIP Vision to secure their tomorrow.
        </p>
        <button
          onClick={() => navigate('/')}
          className="bg-white hover:scale-102 text-blue-600 small-box-shadow px-8 py-3 rounded-full font-bold text-lg hover:bg-blue-50 transition-colors"
        >
          Explore SIP Vision
        </button>
      </div>
    </div>
  );
}

export default Services;