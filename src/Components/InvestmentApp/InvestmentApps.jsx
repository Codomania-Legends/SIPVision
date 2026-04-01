import React from 'react';
import { ExternalLink, Zap, BarChart3, TrendingUp, BarChart, ShieldCheck } from 'lucide-react';
import InvestmentInsights from '../../Utilities/AI_Suggestions';

// Images imported from your public folder or assets
import GrowwLogo from '/groww_logo.png';
import ZerodhaLogo from '/zerodha_logo.png';
import INDmoneyLogo from '/indmoney_logo.png';
import ETMoneyLogo from '/etmoney_logo.png';
import KuveraLogo from '/kuvera.png';
import PaytmLogo from '/Paytm_Logo.jpg';

const InvestmentPlatforms = () => {
  const apps = [
    {
      name: "Groww",
      description: "Fast, simple, and intuitive platform for zero-commission direct mutual fund SIPs. Perfect for beginners.",
      tagline: "Start with ₹100",
      link: "https://groww.in/",
      logo: GrowwLogo,
      accent: "text-emerald-600",
      bgAccent: "bg-emerald-50",
      icon: <Zap className="w-4 h-4 text-emerald-500" />
    },
    {
      name: "Zerodha Coin",
      description: "India's pioneer direct mutual fund platform, allowing investments in Demat form with zero brokerage.",
      tagline: "Demat Integration",
      link: "https://coin.zerodha.com/",
      logo: ZerodhaLogo,
      accent: "text-blue-600",
      bgAccent: "bg-blue-50",
      icon: <BarChart3 className="w-4 h-4 text-blue-500" />
    },
    {
      name: "INDmoney",
      description: "Track your entire net worth, manage your EPF, and invest in Indian SIPs and US stocks seamlessly.",
      tagline: "Track 10+ Assets",
      link: "https://www.indmoney.com/",
      logo: INDmoneyLogo,
      accent: "text-indigo-600",
      bgAccent: "bg-indigo-50",
      icon: <TrendingUp className="w-4 h-4 text-indigo-500" />
    },
    {
      name: "ET Money",
      description: "Data-led, intelligent investing solutions to help you identify the best-performing SIP funds.",
      tagline: "AI-Led Insights",
      link: "https://www.etmoney.com/",
      logo: ETMoneyLogo,
      accent: "text-orange-600",
      bgAccent: "bg-orange-50",
      icon: <BarChart className="w-4 h-4 text-orange-500" />
    },
    {
      name: "Kuvera",
      description: "A highly advanced, ad-free platform focusing on goal-based investing and smart tax-saving features.",
      tagline: "Tax Harvesting",
      link: "https://kuvera.in/",
      logo: KuveraLogo, // Ensure you import this image
      accent: "text-blue-500",
      bgAccent: "bg-blue-50",
      icon: <ShieldCheck className="w-4 h-4 text-blue-400" />
    },
    {
      name: "Paytm Money",
      description: "Seamlessly start your investment journey with daily SIPs and a simplified interface built for everyone.",
      tagline: "Daily SIP Options",
      link: "https://www.paytmmoney.com/",
      logo: PaytmLogo, // Ensure you import this image
      accent: "text-sky-600",
      bgAccent: "bg-sky-50",
      icon: <Zap className="w-4 h-4 text-sky-500" />
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-32 px-6 lg:px-12 font-sans">
      {/* Premium Header */}
      <div className="max-w-6xl mx-auto text-center mb-24">
        <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-4 tracking-wide shadow-inner">
          Verified Partners
        </span>
        <h2 className="text-5xl md:text-6xl font-extrabold text-slate-950 mb-6 tracking-tighter">
          Where should you start your <span className="text-blue-600">SIP?</span>
        </h2>
        <p className="text-xl text-slate-700 max-w-3xl mx-auto leading-relaxed">
          At <b>SIP Vision</b>, we visualize. At these trusted platforms, you execute.
        </p>
      </div>

      {/* Grid: Restored to 2 columns for horizontal cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        {apps.map((app, index) => (
          <div 
            key={index} 
            className="group relative medium-box-shadow rounded-[2.5rem] p-10 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-100 hover:-translate-y-2 flex flex-col md:flex-row gap-10 items-center md:items-start"
          >
            {/* LEFT: RESTORED LARGE LOGO BOX */}
            <div className="flex-shrink-0">
              <div className="h-28 w-28 p-5 bg-slate-100 rounded-3xl flex items-center justify-center shadow-inner group-hover:bg-white transition-colors duration-300">
                <img 
                  src={app.logo} 
                  alt={`${app.name} logo`} 
                  className="max-w-full max-h-full object-contain filter group-hover:drop-shadow-sm transition-all" 
                />
              </div>
            </div>

            {/* RIGHT: CONTENT & RESTORED BIG BUTTON */}
            <div className="flex-grow flex flex-col items-center md:items-start text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center justify-between w-full mb-4 gap-4">
                <h3 className="text-3xl font-bold text-slate-900 tracking-tight">
                  {app.name}
                </h3>
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${app.bgAccent} ${app.accent}`}>
                    {app.icon}
                    {app.tagline}
                </div>
              </div>

              <p className="text-slate-600 mb-8 leading-relaxed text-lg">
                {app.description}
              </p>

              {/* RESTORED PREMIUM CTA BUTTON */}
              <a 
                href={app.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group/btn flex items-center justify-center gap-2.5 w-full md:w-max py-4 px-10 small-box-shadow bg-slate-950 text-white rounded-2xl font-semibold hover:bg-blue-600 transition-all duration-300"
              >
                Get Started
                <ExternalLink size={18} className="transition-transform group-hover/btn:translate-x-1" />
              </a>
            </div>
          </div>
        ))}
      </div>

      <InvestmentInsights />

      {/* Advisory Note */}
      <div className="mt-28 max-w-3xl mx-auto text-center border-t border-slate-200 pt-12">
        <p className="text-slate-500 text-sm leading-relaxed italic">
          Advisory: SIP Vision provides data visualization tools. All platforms listed are SEBI registered intermediaries.
        </p>
      </div>
    </div>
  );
};

export default InvestmentPlatforms;