import React, { useState } from 'react';
import { useDetails } from '../../Utilities/DetailsContext';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { sileo } from 'sileo'; // ✨ Added Sileo import!

const GOAL_OPTIONS = [
    { label: "Dream Home 🏠", value: "Home" },
    { label: "Luxury Car 🏎️", value: "Car" },
    { label: "Retirement 🌴", value: "Retirement" },
    { label: "Education 🎓", value: "Education" },
    { label: "Custom Goal 🎯", value: "Other" }
];

function Form() {
    const { sipData, setSipData, setStory } = useDetails();
    const navigate = useNavigate();
    const [step, setStep] = useState(0);
    const [direction, setDirection] = useState(0);

    const nextStep = () => {
        // ✨ Added Sileo validations and feedback!
        if (step === 0) {
            sileo.info({ title: "Awesome choice! 🎯", description: "Let's set your target amount." });
        } else if (step === 1) {
            if (!sipData.targetAmount) {
                sileo.error({ title: "Missing Amount! 💰", description: "Please enter your target number." });
                return;
            }
            sileo.info({ title: "Big moves! 💸", description: "Let's plan the strategy." });
        } else if (step === 2) {
            if (!sipData.monthlyAmount || !sipData.timeHorizon || !sipData.expectedReturn) {
                sileo.error({ title: "Missing Details! 📊", description: "Please fill in all the fields." });
                return; 
            }
            sileo.success({ title: "Almost there! 🏁", description: "Ready for takeoff." });
        }

        setDirection(1);
        setStep((p) => p + 1);
    };
    
    const prevStep = () => {
        setDirection(-1);
        setStep((p) => p - 1);
    };

    const updateData = (name, value) => {
        setSipData(prev => ({ ...prev, [name]: value }));
    };

    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? 200 : -200,
            opacity: 0,
            scale: 0.8,
            rotate: direction > 0 ? 5 : -5
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1,
            rotate: 0
        },
        exit: (direction) => ({
            x: direction < 0 ? 200 : -200,
            opacity: 0,
            scale: 0.8,
            rotate: direction < 0 ? -5 : 5
        })
    };

    const handleFinalSubmit = (e) => {
        e.preventDefault();
        
        // ✨ Wrap the final action in a Sileo promise toast!
        const generationPromise = new Promise((resolve) => {
            setTimeout(() => {
                setStory(`The user is planning for a ${sipData.goal} with a target of ₹${sipData.targetAmount} over ${sipData.timeHorizon} years.`);
                resolve();
            }, 1500); // Faking a small delay for dramatic effect
        });

        sileo.promise(generationPromise, {
            loading: { title: "Generating Blueprint...", description: "Hold on tight! 🚀" },
            success: { title: "Vision Generated! ✨", description: "Taking you to your dashboard..." },
            error: { title: "Oops! 😥", description: "Something went wrong." }
        });

        // Navigate shortly after the success toast appears
        generationPromise.then(() => {
            setTimeout(() => navigate("/home"), 1000);
        });
    };

    return (
        <div className="flex flex-col md:flex-row justify-center items-center h-screen w-screen bg-[#f0f4f8] p-4 overflow-hidden">
            <div className="relative bg-white top-10 medium-box-shadow p-8 md:p-12 rounded-[40px] max-w-lg w-full ">
                
                {/* Custom Progress Bar */}
                <div className="flex gap-3 mb-10 justify-center items-center">
                    {[0, 1, 2, 3].map((s) => (
                        <motion.div 
                            key={s} 
                            animate={{ 
                                width: step === s ? 40 : 12,
                                backgroundColor: step >= s ? "#2563eb" : "#dbeafe"
                            }}
                            className="h-3 rounded-full transition-colors duration-300" 
                        />
                    ))}
                </div>

                <form onSubmit={handleFinalSubmit}>
                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                            key={step}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        >
                            {/* STEP 0: GOALS */}
                            {step === 0 && (
                                <div className="flex flex-col gap-6">
                                    <div className="space-y-2">
                                        <h2 className="text-3xl font-black text-gray-800 tracking-tight">Pick a Vibe. 🎯</h2>
                                        <p className="text-gray-400 font-medium">What are we building wealth for?</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        {GOAL_OPTIONS.map((opt) => (
                                            <motion.button
                                                key={opt.value}
                                                whileHover={{ scale: 1.05, translateY: -5 }}
                                                whileTap={{ scale: 0.95 }}
                                                type="button"
                                                onClick={() => { 
                                                    updateData("goal", opt.value); 
                                                    nextStep(); 
                                                }}
                                                className={`p-5 rounded-[25px] border-2 text-left transition-all ${
                                                    sipData.goal === opt.value 
                                                    ? "small-box-shadow bg-blue-600 text-white shadow-lg shadow-blue-200 border-none" 
                                                    : "small-box-shadow bg-gray-50 text-gray-600 hover:bg-white border-none"
                                                }`}
                                            >
                                                <span className="text-2xl block mb-1">{opt.label.split(' ')[1]}</span>
                                                <span className="font-bold text-sm leading-tight">{opt.label.split(' ')[0]}</span>
                                            </motion.button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* STEP 1: AMOUNT */}
                            {step === 1 && (
                                <div className="flex flex-col gap-6">
                                    <h2 className="text-3xl font-black text-gray-800">The Number. 💰</h2>
                                    <div className="group relative">
                                        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-3xl font-bold text-blue-600 group-focus-within:scale-125 transition-transform">₹</span>
                                        <input 
                                            type="number" 
                                            autoFocus
                                            placeholder="50,00,000"
                                            className="w-full pl-14 pr-6 py-6 bg-blue-50 border-none rounded-[25px] text-3xl font-black text-blue-900 outline-none placeholder:text-blue-200 focus:ring-4 ring-blue-100 transition-all"
                                            value={sipData.targetAmount || ''}
                                            onChange={(e) => updateData("targetAmount", e.target.value)}
                                        />
                                    </div>
                                    <motion.button 
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        type="button" 
                                        onClick={nextStep} 
                                        className="mt-4 small-box-shadow bg-gray-900 text-white py-5 rounded-[25px] font-black text-xl "
                                    >
                                        Lock it in 🔒
                                    </motion.button>
                                </div>
                            )}

                            {/* STEP 2: STRATEGY */}
                            {step === 2 && (
                                <div className="flex flex-col gap-6">
                                    <h2 className="text-3xl font-black text-gray-800">The Plan. ⚡</h2>
                                    <div className="space-y-4">
                                        <div className="bg-gray-50 p-5 rounded-[25px] border-2 border-transparent focus-within:border-blue-500 transition-all">
                                            <label className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Monthly Fuel</label>
                                            <input type="number" className="w-full bg-transparent text-2xl font-black outline-none text-gray-800" value={sipData.monthlyAmount || ''} onChange={(e) => updateData("monthlyAmount", e.target.value)} placeholder="5,000" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="bg-gray-50 p-5 rounded-[25px]">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Years</label>
                                                <input type="number" className="w-full bg-transparent text-2xl font-black outline-none" value={sipData.timeHorizon || ''} onChange={(e) => updateData("timeHorizon", e.target.value)} placeholder="10" />
                                            </div>
                                            <div className="bg-gray-50 p-5 rounded-[25px]">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Returns %</label>
                                                <input type="number" className="w-full bg-transparent text-2xl font-black outline-none" value={sipData.expectedReturn || ''} onChange={(e) => updateData("expectedReturn", e.target.value)} placeholder="12" />
                                            </div>
                                        </div>
                                    </div>
                                    <motion.button 
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        type="button" 
                                        onClick={nextStep} 
                                        className="mt-4 bg-blue-600 text-white py-5 rounded-[25px] font-black text-xl shadow-lg"
                                    >
                                        Final Step 🏁
                                    </motion.button>
                                </div>
                            )}

                            {/* STEP 3: FINISH */}
                            {step === 3 && (
                                <div className="flex flex-col gap-6 text-center py-4">
                                    <motion.div 
                                        initial={{ scale: 0 }} 
                                        animate={{ scale: 1 }} 
                                        transition={{ type: "spring", bounce: 0.6 }}
                                        className="text-7xl"
                                    >
                                        🚀
                                    </motion.div>
                                    <div>
                                        <h2 className="text-3xl font-black text-gray-800">Ready for Takeoff?</h2>
                                        <p className="text-gray-500 mt-2 font-medium">Your {sipData.goal} blueprint is ready.</p>
                                    </div>
                                    <motion.button 
                                        whileHover={{ scale: 1.05, rotate: 1 }}
                                        whileTap={{ scale: 0.95 }}
                                        type="submit" 
                                        className="mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-6 rounded-[30px] font-black text-2xl shadow-[0_15px_30px_rgba(37,99,235,0.3)]"
                                    >
                                        GENERATE VISION ✨
                                    </motion.button>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </form>

                {step > 0 && (
                    <button 
                        type="button"
                        onClick={prevStep}
                        className="absolute top-10 left-8 text-sm font-bold text-gray-300 hover:text-blue-600 transition-colors uppercase tracking-widest z-10"
                    >
                        ← Back
                    </button>
                )}
            </div>
        </div>
    );
}

export default Form;