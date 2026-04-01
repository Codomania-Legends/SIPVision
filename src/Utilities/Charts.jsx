import React, { useEffect, useMemo, useState } from 'react';
import {
    ResponsiveContainer,
    ComposedChart,
    Area,
    Bar,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from 'recharts';
import { useDetails } from './DetailsContext'; 
import { Link, useNavigate } from 'react-router'; 
import SummaryDownloader from '../Utilities/Summary';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';

const SipChart = () => {
    const { sipData } = useDetails();
    const navigate = useNavigate();

    const [boostSip, setBoostSip] = useState(0);
    const [boostTime, setBoostTime] = useState(0);
    const [boostReturn, setBoostReturn] = useState(0);
    
    const [yearlyOverrides, setYearlyOverrides] = useState({});
    const [showYearlyOverrides, setShowYearlyOverrides] = useState(false);
    
    // Filters open by default
    const [showFilters, setShowFilters] = useState(true);

    // State for Confetti Celebration! 🎉
    const [isCelebrating, setIsCelebrating] = useState(false);

    // Track window dimensions dynamically for Recharts margins and Confetti 📏
    const [windowDimensions, setWindowDimensions] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 1200,
        height: typeof window !== 'undefined' ? window.innerHeight : 800,
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const chartDataObj = useMemo(() => {
        const baseSip = Number(sipData.monthlyAmount) || 0; 
        const baseYears = Number(sipData.timeHorizon) || 0;   
        const baseReturn = Number(sipData.expectedReturn) || 0; 
        const initialSavings = Number(sipData.currentSavings) || 0;

        const optYears = baseYears + boostTime;
        const optReturn = baseReturn + boostReturn;

        const baseMonthlyRate = baseReturn / 100 / 12;
        const optMonthlyRate = optReturn / 100 / 12;
        
        const data = [];
        let baseInvested = initialSavings;
        let baseValue = initialSavings;
        let optValue = initialSavings;
        let isDifferent = false; 

        const maxYears = Math.max(baseYears, optYears);

        for (let year = 1; year <= maxYears; year++) {
            const activeBaseSip = yearlyOverrides[year] !== undefined ? yearlyOverrides[year] : baseSip;
            const activeOptSip = activeBaseSip + boostSip;

            if (year <= baseYears) {
                for (let month = 1; month <= 12; month++) {
                    baseInvested += activeBaseSip;
                    baseValue = (baseValue + activeBaseSip) * (1 + baseMonthlyRate);
                }
            }

            if (year <= optYears) {
                for (let month = 1; month <= 12; month++) {
                    optValue = (optValue + activeOptSip) * (1 + optMonthlyRate);
                }
            }

            if (Math.round(baseValue) !== Math.round(optValue)) {
                isDifferent = true;
            }

            data.push({
                name: `Year ${year}`,
                Invested: Math.round(baseInvested),
                TotalWealth: year <= baseYears ? Math.round(baseValue) : null, 
                OptimizedWealth: Math.round(optValue), 
            });
        }

        return { data, isDifferent };
    }, [sipData, boostSip, boostTime, boostReturn, yearlyOverrides]);

    // ✨ Confetti Logic
    useEffect(() => {
        const targetAmount = Number(sipData.targetAmount) || Infinity;
        const finalWealth = chartDataObj.data[chartDataObj.data.length - 1]?.OptimizedWealth || 0;

        if (finalWealth >= targetAmount && chartDataObj.isDifferent) {
            setIsCelebrating(true);
            const timer = setTimeout(() => setIsCelebrating(false), 5000);
            return () => clearTimeout(timer);
        } else {
            setIsCelebrating(false);
        }
    }, [chartDataObj, sipData.targetAmount]);

    const resetBoosts = () => {
        setBoostSip(0);
        setBoostTime(0);
        setBoostReturn(0);
        setYearlyOverrides({}); 
        setIsCelebrating(true);
    };

    const handleYearlyChange = (year, value) => {
        setYearlyOverrides(prev => ({
            ...prev,
            [year]: Number(value)
        }));
    };

    const maxYears = Math.max(Number(sipData.timeHorizon) || 0, (Number(sipData.timeHorizon) || 0) + boostTime);
    const isMobile = windowDimensions.width < 768;

    return (
        <div className="w-full h-[85vh] min-h-[550px] md:min-h-[600px] flex flex-col bg-white rounded-2xl md:rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden">
            
            {/* ✨ Confetti Component! */}
            {isCelebrating && (
                <div className="absolute inset-0 pointer-events-none z-50">
                    <Confetti 
                        width={windowDimensions.width} 
                        height={windowDimensions.height} 
                        recycle={false} 
                        numberOfPieces={600} 
                        gravity={0.15}
                    />
                </div>
            )}

            {/* ⚙️ Floating Action Button - Adjusted padding, text size, and positioning for mobile! 👆 */}
            <div className="absolute top-4 right-4 md:top-6 md:right-6 z-30">
                <button 
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center gap-1 md:gap-2 bg-blue-600 text-white px-3 py-2 md:px-5 md:py-3 rounded-xl md:rounded-2xl text-xs md:text-base font-bold shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all"
                >
                    {showFilters ? "Close ✖️" : (isMobile ? "Strategy 🎛️" : "Adjust Strategy 🎛️")}
                </button>
            </div>

            {/* 🎛️ ABSOLUTE Floating Filter Panel - Added calc() width for safe mobile margins! 📐 */}
            <AnimatePresence>
                {showFilters && (
                    <motion.div 
                        initial={{ opacity: 0, x: 50, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 50, scale: 0.95 }}
                        className="absolute top-16 right-4 md:top-24 md:right-6 z-20 w-[calc(100vw-2rem)] sm:w-[360px] max-h-[70vh] md:max-h-[65vh] overflow-y-auto scrollbar-hide bg-white/95 md:bg-white/90 backdrop-blur-xl p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-white"
                    >
                        <div className="flex justify-between items-center mb-4 md:mb-6">
                            <h4 className="text-base md:text-lg font-black text-slate-800">
                                Scenario Builder 🚀
                            </h4>
                            {(boostSip > 0 || boostTime > 0 || boostReturn > 0 || Object.keys(yearlyOverrides).length > 0) && (
                                <button onClick={resetBoosts} className="text-[10px] font-bold uppercase tracking-wider bg-red-50 text-red-500 py-1 md:py-1.5 px-2 md:px-3 rounded-lg hover:bg-red-100 transition-colors">
                                    Reset ✖️
                                </button>
                            )}
                        </div>
                        
                        <div className="flex flex-col gap-4 md:gap-6 mb-4 md:mb-6">
                            {/* 💰 SIP Boost */}
                            <div className="flex flex-col gap-1 md:gap-2">
                                <label className="text-xs md:text-sm font-bold text-slate-600 flex justify-between">
                                    <span>Extra SIP 💰</span>
                                    <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded text-[10px] md:text-xs">+ ₹{boostSip.toLocaleString('en-IN')}</span>
                                </label>
                                <input 
                                    type="range" min="0" max="20000" step="500" 
                                    value={boostSip} 
                                    onChange={(e) => setBoostSip(Number(e.target.value))}
                                    className="w-full h-1.5 md:h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                />
                            </div>

                            {/* ⏳ Time Boost */}
                            <div className="flex flex-col gap-1 md:gap-2">
                                <label className="text-xs md:text-sm font-bold text-slate-600 flex justify-between">
                                    <span>Extra Time ⏳</span>
                                    <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded text-[10px] md:text-xs">+ {boostTime} Yrs</span>
                                </label>
                                <input 
                                    type="range" min="0" max="15" step="1" 
                                    value={boostTime} 
                                    onChange={(e) => setBoostTime(Number(e.target.value))}
                                    className="w-full h-1.5 md:h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                />
                            </div>

                            {/* 📈 Return Boost */}
                            <div className="flex flex-col gap-1 md:gap-2">
                                <label className="text-xs md:text-sm font-bold text-slate-600 flex justify-between">
                                    <span>Extra Return 📈</span>
                                    <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded text-[10px] md:text-xs">+ {boostReturn}%</span>
                                </label>
                                <input 
                                    type="range" min="0" max="10" step="0.5" 
                                    value={boostReturn} 
                                    onChange={(e) => setBoostReturn(Number(e.target.value))}
                                    className="w-full h-1.5 md:h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                />
                            </div>
                        </div>

                        {/* 📅 Yearly Roadmap */}
                        <div className="border-t border-slate-200 pt-4 md:pt-5 mt-2">
                            <button 
                                onClick={() => setShowYearlyOverrides(!showYearlyOverrides)}
                                className="text-xs md:text-sm font-bold text-slate-700 flex items-center justify-between w-full hover:text-blue-600 transition-colors"
                            >
                                <span>Custom Yearly Plan 📅</span>
                                <span>{showYearlyOverrides ? '➖' : '➕'}</span>
                            </button>
                            
                            <AnimatePresence>
                                {showYearlyOverrides && (
                                    <motion.div 
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="flex flex-col gap-2 md:gap-3 overflow-hidden pt-3 md:pt-4"
                                    >
                                        {Array.from({ length: maxYears }).map((_, i) => {
                                            const yearNumber = i + 1;
                                            const defaultSip = Number(sipData.monthlyAmount) || 0;
                                            const currentSip = yearlyOverrides[yearNumber] !== undefined ? yearlyOverrides[yearNumber] : defaultSip;
                                            const isModified = yearlyOverrides[yearNumber] !== undefined;

                                            return (
                                                <div key={yearNumber} className={`flex justify-between items-center p-2 md:p-3 rounded-xl border ${isModified ? 'bg-blue-50 border-blue-200' : 'bg-slate-50 border-slate-100'} transition-all`}>
                                                    <label className={`text-[10px] md:text-xs font-bold ${isModified ? 'text-blue-700' : 'text-slate-500'}`}>
                                                        Year {yearNumber}
                                                    </label>
                                                    <div className="relative w-24 md:w-32">
                                                        <span className="absolute left-2 md:left-3 top-1/2 -translate-y-1/2 text-xs md:text-sm text-slate-400">₹</span>
                                                        <input 
                                                            type="number"
                                                            value={currentSip || ''}
                                                            onChange={(e) => handleYearlyChange(yearNumber, e.target.value)}
                                                            className={`w-full pl-5 md:pl-7 pr-2 md:pr-3 py-1 md:py-1.5 rounded-lg text-xs md:text-sm font-bold outline-none border border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all ${isModified ? 'text-blue-700' : 'text-slate-700'}`}
                                                        />
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 📈 The Big Crystal Clear Chart! - Adjusted padding to reclaim space on mobile 🖼️ */}
            <div className="flex-1 w-full p-2 pt-20 md:p-8 md:pt-24 pb-2 md:pb-4 z-10">
                <ResponsiveContainer width="100%" height="100%">
                    {/* Dynamic margins to prevent X/Y axis cutoff on smaller phones! 📲 */}
                    <ComposedChart data={chartDataObj.data} margin={{ top: 20, right: isMobile ? 10 : 30, bottom: 20, left: isMobile ? -10 : 20 }}>
                        <CartesianGrid stroke="#f1f5f9" strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: isMobile ? 10 : 13, fontWeight: 600 }} axisLine={false} tickLine={false} dy={10} />
                        <YAxis 
                            tickFormatter={(value) => `₹${(value / 100000).toFixed(1)}L`} 
                            tick={{ fill: '#94a3b8', fontSize: isMobile ? 10 : 13, fontWeight: 600 }}
                            axisLine={false} tickLine={false} dx={-10}
                        />
                        <Tooltip 
                            formatter={(value) => `₹ ${value.toLocaleString('en-IN')}`}
                            contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', fontWeight: 'bold', fontSize: isMobile ? '12px' : '14px' }}
                            itemStyle={{ padding: '4px 0' }}
                        />
                        <Legend wrapperStyle={{ paddingTop: '20px', fontWeight: 'bold', fontSize: isMobile ? '11px' : '14px' }} iconType="circle" />
                        
                        <Bar dataKey="Invested" barSize={isMobile ? 20 : 40} fill="#93c5fd" radius={[6, 6, 0, 0]} name="Base Invested" />
                        <Area type="monotone" dataKey="TotalWealth" fill="url(#colorWealth)" stroke="#3b82f6" strokeWidth={isMobile ? 2 : 4} name="Base Wealth" />
                        
                        {/* 💸 THE FOMO LINE */}
                        {chartDataObj.isDifferent && (
                            <Line 
                                type="monotone" 
                                dataKey="OptimizedWealth" 
                                stroke="#10b981" 
                                strokeWidth={isMobile ? 2 : 4} 
                                strokeDasharray="8 8" 
                                name="If you boost it! 🚀" 
                                dot={{ r: isMobile ? 3 : 5, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }}
                                activeDot={{ r: isMobile ? 6 : 9, strokeWidth: 0 }}
                            />
                        )}

                        <defs>
                            <linearGradient id="colorWealth" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                    </ComposedChart>
                </ResponsiveContainer>
            </div>

            {/* 👇 Download Summary */}
            <div className="flex justify-center pb-2 z-10 relative transform scale-50 md:scale-90 md:left-0 origin-bottom">
                <SummaryDownloader />
            </div>

        </div>
    );
};

export default SipChart;