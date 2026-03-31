import React, { useState } from 'react';
import { useDetails } from '../../Utilities/DetailsContext';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import FomoCard from '../Fomo/FomoCard';

const GOAL_OPTIONS = [
    { label: "Dream Home 🏠", value: "Home" },
    { label: "Luxury Car 🏎️", value: "Car" },
    { label: "Retirement 🌴", value: "Retirement" },
    { label: "Education 🎓", value: "Education" },
    { label: "Custom Goal 🎯", value: "Other" }
];

function Form() {
    const { sipData, setSipData } = useDetails();
    const navigate = useNavigate();
    const [step, setStep] = useState(0);

    const nextStep = () => setStep((p) => p + 1);
    const prevStep = () => setStep((p) => p - 1);

    const updateData = (name, value) => {
        setSipData({ ...sipData, [name]: value });
    };

    const variants = {
        enter: (direction) => ({ x: direction > 0 ? 100 : -100, opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (direction) => ({ x: direction < 0 ? 100 : -100, opacity: 0 })
    };

    return (
        <div className="flex flex-col md:flex-row justify-center items-center h-screen w-screen bg-[#f8fafc] p-4 gap-10">
            <div className="relative bg-white p-10 rounded-[30px] shadow-2xl max-w-lg w-full overflow-hidden  medium-box-shadow">
                
                {/* Funky Progress Dots */}
                <div className="flex gap-2 mb-8 justify-center">
                    {[0, 1, 2, 3].map((s) => (
                        <div key={s} className={`h-3 rounded-full transition-all duration-500 ${step === s ? "w-10 bg-blue-600" : "w-3 bg-blue-200"}`} />
                    ))}
                </div>

                <form onSubmit={(e) => { e.preventDefault(); navigate("/home"); }}>
                    <AnimatePresence mode="wait" custom={step}>
                        <motion.div
                            key={step}
                            custom={step}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        >
                            {/* STEP 1: GOAL SELECTION (Visual Cards) */}
                            {step === 0 && (
                                <div className="flex flex-col gap-4">
                                    <h2 className="text-2xl font-black text-gray-800">What's the big dream? 🌟</h2>
                                    <div className="grid grid-cols-2 gap-3">
                                        {GOAL_OPTIONS.map((opt) => (
                                            <button
                                                key={opt.value}
                                                type="button"
                                                onClick={() => { updateData("goal", opt.value); nextStep(); }}
                                                className={`p-4 rounded-2xl border-2 small-box-shadow transition-all text-left font-bold ${sipData.goal === opt.value ? "border-blue-600 bg-blue-50 text-blue-700 scale-95" : "border-gray-100 hover:border-blue-200"}`}
                                            >
                                                {opt.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* STEP 2: TARGET AMOUNT */}
                            {step === 1 && (
                                <div className="flex flex-col gap-4">
                                    <h2 className="text-2xl font-black text-gray-800">The Money Goal 💰</h2>
                                    <p className="text-gray-500">How much do we need for that {sipData.goal}?</p>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-blue-600">₹</span>
                                        <input 
                                            type="number" 
                                            placeholder="50,00,000"
                                            className="w-full pl-12 pr-4 py-5 bg-gray-50 rounded-2xl text-2xl font-bold outline-none focus:ring-4 ring-blue-100"
                                            value={sipData.targetAmount}
                                            onChange={(e) => updateData("targetAmount", e.target.value)}
                                        />
                                    </div>
                                    <button type="button" onClick={nextStep} className="mt-4 bg-blue-600 text-white py-4 rounded-2xl font-black text-lg shadow-lg hover:bg-blue-700 small-box-shadow">Next Step 🚀</button>
                                </div>
                            )}

                            {/* STEP 3: SIP & TIME */}
                            {step === 2 && (
                                <div className="flex flex-col gap-4">
                                    <h2 className="text-2xl font-black text-gray-800">The Strategy ⚡</h2>
                                    <div className="space-y-4">
                                        <div className="bg-gray-50 p-4 rounded-2xl">
                                            <label className="text-xs font-bold text-gray-400 uppercase">Monthly SIP</label>
                                            <input type="number" className="w-full bg-transparent text-xl font-bold outline-none" value={sipData.monthlyAmount} onChange={(e) => updateData("monthlyAmount", e.target.value)} placeholder="₹5,000" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="bg-gray-50 p-4 rounded-2xl">
                                                <label className="text-xs font-bold text-gray-400 uppercase">Years</label>
                                                <input type="number" className="w-full bg-transparent text-xl font-bold outline-none" value={sipData.timeHorizon} onChange={(e) => updateData("timeHorizon", e.target.value)} placeholder="10" />
                                            </div>
                                            <div className="bg-gray-50 p-4 rounded-2xl">
                                                <label className="text-xs font-bold text-gray-400 uppercase">Return %</label>
                                                <input type="number" className="w-full bg-transparent text-xl font-bold outline-none" value={sipData.expectedReturn} onChange={(e) => updateData("expectedReturn", e.target.value)} placeholder="12%" />
                                            </div>
                                        </div>
                                    </div>
                                    <button type="button" onClick={nextStep} className="mt-4 bg-blue-600 text-white py-4 rounded-2xl font-black text-lg small-box-shadow">Almost there! 🕒</button>
                                </div>
                            )}

                            {/* STEP 4: FINAL CHECK */}
                            {step === 3 && (
                                <div className="flex flex-col gap-4 text-center">
                                    <div className="text-6xl mb-2">💎</div>
                                    <h2 className="text-2xl font-black text-gray-800">Ready to see your future?</h2>
                                    <p className="text-gray-500">We've calculated the path for your <b>{sipData.goal}</b>.</p>
                                    <button type="submit" className="mt-4 bg-green-500 text-white py-5 rounded-2xl font-black text-xl shadow-xl hover:bg-green-600 hover:scale-105 transition-all small-box-shadow">Show My Vision 🌈</button>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </form>

                {/* Back Button (Floating) */}
                {step > 0 && (
                    <button 
                        onClick={prevStep}
                        className="absolute top-10 left-6 text-gray-400 hover:text-blue-600 transition-colors"
                    >
                        ← Back
                    </button>
                )}
            </div>
        </div>
    );
}

export default Form;