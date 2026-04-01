import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, TrendingUp, ShieldCheck, Sparkles, PieChart, CheckCircle, Bot } from 'lucide-react';
import { sileo } from 'sileo';
import AI from '../../Utilities/AI';

const LEARNING_CARDS = [
  {
    id: "mutual-fund",
    title: "The 'Mega Basket'",
    subtitle: "What is a Mutual Fund?",
    icon: <PieChart className="w-10 h-10 md:w-12 md:h-12 text-blue-500" />,
    gradient: "from-blue-50 to-indigo-50",
    border: "border-blue-200",
    content: [
      "Imagine wanting to buy shares in 50 top companies (like Apple, Google, or HDFC), but you don't have lakhs of rupees.",
      "A Mutual Fund is a massive pool of money collected from thousands of investors just like you.",
      "A professional 'Fund Manager' uses this pool to buy that large basket of stocks. By investing, you own a tiny slice of the entire basket!"
    ],
    highlight: "💡 You get professional management without needing to be an expert."
  },
  {
    id: "what-is-sip",
    title: "Autopilot Investing",
    subtitle: "What is a SIP?",
    icon: <TrendingUp className="w-10 h-10 md:w-12 md:h-12 text-emerald-500" />,
    gradient: "from-emerald-50 to-teal-50",
    border: "border-emerald-200",
    content: [
      "SIP stands for Systematic Investment Plan. It is simply the smartest way to put money into that Mutual Fund basket.",
      "Instead of investing a huge lump sum all at once, you invest a pocket-friendly amount (like ₹500 or ₹1,000) every single month.",
      "It happens automatically from your bank account, just like paying a Netflix subscription."
    ],
    highlight: "🎯 It builds extreme financial discipline with zero daily effort."
  },
  {
    id: "rupee-cost",
    title: "Your Market Shield",
    subtitle: "Rupee Cost Averaging",
    icon: <ShieldCheck className="w-10 h-10 md:w-12 md:h-12 text-purple-500" />,
    gradient: "from-purple-50 to-fuchsia-50",
    border: "border-purple-200",
    content: [
      "Many beginners are terrified of the stock market crashing. SIP turns market crashes into your biggest advantage.",
      "When the market goes DOWN, your fixed ₹1,000 buys MORE units (like a mega sale at a mall).",
      "When the market goes UP, it buys FEWER units. Over time, this automatically lowers your average buying price."
    ],
    highlight: "🛡️ You never have to guess or 'time' the market ever again."
  },
  {
    id: "compounding",
    title: "The Snowball Effect",
    subtitle: "The Power of Compounding",
    icon: <Sparkles className="w-10 h-10 md:w-12 md:h-12 text-amber-500" />,
    gradient: "from-amber-50 to-orange-50",
    border: "border-amber-200",
    content: [
      "Albert Einstein called compounding the '8th Wonder of the World'. Here is why:",
      "Your money earns interest. Then, that interest earns its own interest. Over years, this creates a massive snowball effect.",
      "If you invest just ₹5,000 a month for 30 years, you put in ₹18 Lakhs. But thanks to compounding at 12%, it can grow to ~₹1.7 Crores!"
    ],
    highlight: "⛄ In investing, TIME is much more powerful than TIMING."
  }
];

const SIPVisionDeck = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);

  const nextCard = () => {
    if (currentIndex < LEARNING_CARDS.length - 1) {
      setDirection(1);
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsCompleted(true);
      sileo.success({ title: "Deck Completed! 🎉", description: "You are now an SIP Master." });
    }
  };

  const prevCard = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(prev => prev - 1);
    }
  };

  const restart = () => {
    setDirection(-1);
    setCurrentIndex(0);
    setIsCompleted(false);
  };

  const triggerAIInsight = (questionName) => {
    sileo.promise(AI(questionName), {
      loading: { title: "AI is Thinking... 🤖", description: `Generating insights for: ${questionName}` },
      success: (data) => ({ title: "AI Insight Ready! ✨", description: data }),
      error: { title: "AI Overloaded ⚠️", description: "Could not generate insight right now." }
    });
  };

  const slideVariants = {
    enter: (direction) => ({ x: direction > 0 ? 100 : -100, opacity: 0, scale: 0.95 }),
    center: { zIndex: 1, x: 0, opacity: 1, scale: 1, transition: { duration: 0.4, type: "spring", stiffness: 300, damping: 25 } },
    exit: (direction) => ({ zIndex: 0, x: direction < 0 ? 100 : -100, opacity: 0, scale: 0.95, transition: { duration: 0.3 } })
  };

  return (
    // Added px-4 so it doesn't touch the screen edges on mobile! 📱
    <div className="max-w-4xl mx-auto mt-5 flex flex-col min-h-screen justify-center px-4 sm:px-6 font-sans bg-slate-50">

      {!isCompleted && (
        // Changed mt-25 to standard Tailwind mt-20 md:mt-24 📐
        <div className="mt-20 md:mt-24">
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 text-center mb-6">SIP Knowledge Deck 📚</h1>
          <div className="flex justify-center mb-4 gap-2">
            {LEARNING_CARDS.map((_, idx) => (
              <div
                key={idx}
                className={`h-2 rounded-full transition-all duration-500 ${idx === currentIndex ? 'w-8 bg-blue-600' : idx < currentIndex ? 'w-4 bg-blue-300' : 'w-4 bg-slate-200'
                  }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Dynamic Parent Height: 550px on mobile, 500px on desktop to fit stacked text 📏 */}
      <div className="relative w-full h-[550px] md:h-[500px] flex flex-col perspective-1000">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          {!isCompleted ? (
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              // Made child h-full so it exactly fills the relative parent container 📦
              className={`absolute medium-box-shadow inset-0 w-full h-full bg-gradient-to-br ${LEARNING_CARDS[currentIndex].gradient} rounded-3xl shadow-xl p-5 md:p-10 flex flex-col`}
            >
              <div className="absolute top-4 right-4 md:top-6 md:right-6">
                <button
                  onClick={() => triggerAIInsight(LEARNING_CARDS[currentIndex].subtitle)}
                  className="p-2 md:p-3 bg-white/80 hover:bg-white backdrop-blur-md rounded-full shadow-sm hover:shadow-md transition-all text-blue-600 group"
                >
                  <Bot className="w-5 h-5 group-hover:animate-pulse" />
                </button>
              </div>

              <div className="flex flex-col md:flex-row justify-center items-center text-center md:text-left mb-4 md:mb-6 mt-6 md:mt-4 gap-2 md:gap-0">
                <div className="p-3 md:p-4 md:mr-4 bg-white rounded-2xl shadow-sm">
                  {LEARNING_CARDS[currentIndex].icon}
                </div>
                <div>
                  <h3 className="text-xs md:text-sm font-bold tracking-widest text-slate-500 uppercase mb-1">
                    {LEARNING_CARDS[currentIndex].subtitle}
                  </h3>
                  <h2 className="text-2xl md:text-3xl font-black text-slate-800 leading-tight">
                    {LEARNING_CARDS[currentIndex].title}
                  </h2>
                </div>
              </div>

              <div className="overflow-y-auto custom-scrollbar space-y-3 md:space-y-4 mb-4">
                {LEARNING_CARDS[currentIndex].content.map((paragraph, idx) => (
                  <p key={idx} className="text-slate-700 text-base md:text-lg leading-relaxed font-medium">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-auto bg-white/60 backdrop-blur-sm p-4 md:p-5 rounded-xl border border-white/50 shadow-sm">
                <p className="text-slate-900 font-bold text-xs md:text-base text-center md:text-left">
                  {LEARNING_CARDS[currentIndex].highlight}
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="absolute w-full h-full bg-slate-900 rounded-3xl shadow-2xl p-6 md:p-8 flex flex-col items-center justify-center text-center big-box-shadow"
            >
              <CheckCircle className="w-16 h-16 md:w-20 md:h-20 text-green-400 mb-4 md:mb-6" />
              <h2 className="text-3xl md:text-4xl font-black text-white mb-3 md:mb-4">You're Ready! 🚀</h2>
              <p className="text-slate-300 text-base md:text-lg mb-8 md:mb-10 max-w-sm">
                You now understand the core secrets of wealth building. It is time to start your SIP journey.
              </p>
              <button
                onClick={() => alert("Navigate to Investment Setup!")}
                className="w-full max-w-xs bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 md:py-4 px-6 md:px-8 rounded-xl text-base md:text-lg transition-colors small-box-shadow mb-4"
              >
                Start Investing Now
              </button>
              <button onClick={restart} className="text-slate-400 font-semibold hover:text-white transition-colors text-sm md:text-base">
                Read Deck Again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {!isCompleted && (
        <div className="flex items-center justify-between mt-6 md:mt-8 gap-3 md:gap-4 mb-10 md:mb-20">
          <button
            onClick={prevCard}
            disabled={currentIndex === 0}
            className={`p-3 md:p-4 rounded-full small-box-shadow transition-all ${currentIndex === 0 ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-white text-slate-800 shadow-md hover:shadow-lg'
              }`}
          >
            <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          <button
            onClick={nextCard}
            className="flex-1 small-box-shadow bg-slate-900 text-white font-bold py-3 md:py-4 px-6 md:px-8 rounded-full flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:bg-slate-800 transition-all text-sm md:text-base"
          >
            {currentIndex === LEARNING_CARDS.length - 1 ? 'Finish' : 'Next Concept'}
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>
      )}

      <style dangerouslySetInnerHTML={{
        __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(148, 163, 184, 0.4); border-radius: 10px; }
      `}} />
    </div>
  );
};

export default SIPVisionDeck;