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
import { Link, useNavigate } from 'react-router'; // ⚠️ Note: In React Router v6, this is usually 'react-router-dom'

const SipChart = () => {
    const { sipData } = useDetails();
    const navigate = useNavigate();

    const [boostSip, setBoostSip] = useState(0);
    const [boostTime, setBoostTime] = useState(0);
    const [boostReturn, setBoostReturn] = useState(0);
    const [showLine, setShowLine] = useState(false);

    useEffect(() => {
        if (boostSip > 0 || boostTime > 0 || boostReturn > 0) {
            setShowLine(true);
        } else {
            setShowLine(false);
        }
    }, [boostSip, boostTime, boostReturn]);

    const chartData = useMemo(() => {
        const baseSip = Number(sipData.monthlyAmount) || 0; 
        const baseYears = Number(sipData.timeHorizon) || 0;   
        const baseReturn = Number(sipData.expectedReturn) || 0; 
        const initialSavings = Number(sipData.currentSavings) || 0;

        const optSip = baseSip + boostSip;
        const optYears = baseYears + boostTime;
        const optReturn = baseReturn + boostReturn;

        const baseMonthlyRate = baseReturn / 100 / 12;
        const optMonthlyRate = optReturn / 100 / 12;
        
        const data = [];
        let baseInvested = initialSavings;
        let baseValue = initialSavings;
        let optValue = initialSavings;

        const maxYears = Math.max(baseYears, optYears);

        for (let year = 1; year <= maxYears; year++) {
            if (year <= baseYears) {
                for (let month = 1; month <= 12; month++) {
                baseInvested += baseSip;
                baseValue = (baseValue + baseSip) * (1 + baseMonthlyRate);
                }
            }

            if (year <= optYears) {
                for (let month = 1; month <= 12; month++) {
                optValue = (optValue + optSip) * (1 + optMonthlyRate);
                }
            }

            data.push({
                name: `Year ${year}`,
                Invested: Math.round(baseInvested),
                TotalWealth: year <= baseYears ? Math.round(baseValue) : null, 
                OptimizedWealth: Math.round(baseValue) == Math.round(optValue) ? 0 : Math.round(optValue), 
            });
        }

        return data;
    }, [sipData, boostSip, boostTime, boostReturn]);

    const resetBoosts = () => {
        setBoostSip(0);
        setBoostTime(0);
        setBoostReturn(0);
    };

    return (
        <div className="w-full h-8/10 flex flex-col items-center bg-white p-6 rounded-2xl shadow-lg border border-gray-100 relative">
            
            {/* 🎛️ What If Scenario Builder - Now with Sliders! */}
            <div className="w-full bg-blue-50/50 p-5 rounded-xl border border-blue-100 mb-6">
                <div className="flex justify-between items-center mb-4">
                    <h4 className="text-base font-bold text-blue-900 flex items-center gap-2">
                        🚀 "What If?" Scenario Builder
                    </h4>
                    {(boostSip > 0 || boostTime > 0 || boostReturn > 0) && (
                        <button onClick={resetBoosts} className="text-xs bg-white border border-red-200 text-red-500 hover:bg-red-50 hover:text-red-700 font-medium py-1 px-3 rounded-lg transition-colors shadow-sm">
                            Reset Filters ✖️
                        </button>
                    )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* 💰 SIP Boost Slider */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-blue-800 flex justify-between">
                            <span>Extra SIP 💰</span>
                            <span className="text-blue-600 bg-blue-100 px-2 py-0.5 rounded text-xs">+ ₹{boostSip.toLocaleString('en-IN')}</span>
                        </label>
                        <input 
                            type="range" 
                            min="0" 
                            max="20000" 
                            step="500" 
                            value={boostSip} 
                            onChange={(e) => setBoostSip(Number(e.target.value))}
                            className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                    </div>

                    {/* ⏳ Time Boost Slider */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-blue-800 flex justify-between">
                            <span>Extra Time ⏳</span>
                            <span className="text-blue-600 bg-blue-100 px-2 py-0.5 rounded text-xs">+ {boostTime} Yrs</span>
                        </label>
                        <input 
                            type="range" 
                            min="0" 
                            max="15" 
                            step="1" 
                            value={boostTime} 
                            onChange={(e) => setBoostTime(Number(e.target.value))}
                            className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                    </div>

                    {/* 📈 Return Boost Slider */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-blue-800 flex justify-between">
                            <span>Extra Return 📈</span>
                            <span className="text-blue-600 bg-blue-100 px-2 py-0.5 rounded text-xs">+ {boostReturn}%</span>
                        </label>
                        <input 
                            type="range" 
                            min="0" 
                            max="10" 
                            step="0.5" 
                            value={boostReturn} 
                            onChange={(e) => setBoostReturn(Number(e.target.value))}
                            className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                    </div>
                </div>
            </div>

            <h3 className="text-xl font-bold text-gray-800 mb-2">
                Wealth Projection vs. Potential 📈
            </h3>
            
            <div style={{ width: '100%', height: 400 }}>
                <ResponsiveContainer>
                <ComposedChart data={chartData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <CartesianGrid stroke="#f5f5f5" strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 12 }} />
                    <YAxis 
                    tickFormatter={(value) => `₹${(value / 100000).toFixed(1)}L`} 
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    />
                    <Tooltip 
                    formatter={(value) => `₹ ${value.toLocaleString('en-IN')}`}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                    />
                    <Legend wrapperStyle={{ paddingTop: '20px' }}/>
                    
                    {/* 🛡️ 1st Line: The base invested amount (Safe Money) */}
                    <Bar dataKey="Invested" barSize={30} fill="#93c5fd" radius={[4, 4, 0, 0]} name="Base Invested" />
                    
                    {/* 📊 2nd Line: The base total wealth (Current Plan) */}
                    <Area type="monotone" dataKey="TotalWealth" fill="#dbeafe" stroke="#3b82f6" strokeWidth={3} name="Base Wealth" />
                    
                    {/* 💸 3rd Line: THE FOMO LINE! (Optimized Potential) */}
                    {showLine && <Line 
                        type="monotone" 
                        dataKey="OptimizedWealth" 
                        stroke="#10b981" 
                        strokeWidth={4} 
                        strokeDasharray="5 5" 
                        name="If you boost it! 🚀" 
                        dot={{ r: 4, fill: '#10b981' }}
                        activeDot={{ r: 8 }}
                    />}
                </ComposedChart>
                </ResponsiveContainer>
            <button onClick={() => navigate("/user-details")} className='bg-blue-500 absolute right-0 bottom-0 text-white px-4 py-2 rounded-lg small-box-shadow'>Your Details</button>
            </div>
        </div>
    );
};

export default SipChart;