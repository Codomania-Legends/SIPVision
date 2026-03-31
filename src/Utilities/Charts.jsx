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

const SipChart = () => {
    const { sipData } = useDetails();

    const [boostSip, setBoostSip] = useState(0);
    const [boostTime, setBoostTime] = useState(0);
    const [boostReturn, setBoostReturn] = useState(0);
    const [showLine , setShowLine] = useState(false);

    useEffect( () => {
        if(boostSip > 0 || boostTime > 0 || boostReturn > 0){
            setShowLine(true);
        }
        else{
            setShowLine(false);
        }
    } , [boostSip, boostTime, boostReturn] )

    const chartData = useMemo(() => {
        const baseSip = Number(sipData.monthlyAmount) || 5000; 
        const baseYears = Number(sipData.timeHorizon) || 10;   
        const baseReturn = Number(sipData.expectedReturn) || 12; 
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
        <div className="w-full flex flex-col items-center bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
        
        <div className="w-full bg-blue-50/50 p-4 rounded-xl border border-blue-100 mb-6">
            <div className="flex justify-between items-center mb-3">
            <h4 className="text-sm font-bold text-blue-900 flex items-center gap-2">
                🚀 "What If?" Scenario Builder
            </h4>
            {(boostSip > 0 || boostTime > 0 || boostReturn > 0) && (
                <button onClick={resetBoosts} className="text-xs text-red-500 hover:text-red-700 font-medium transition-colors">
                Reset Filters ✖️
                </button>
            )}
            </div>
            
            <div className="flex flex-wrap gap-3">
            <button 
                onClick={() => setBoostSip(prev => prev + 1000)}
                className="flex-1 bg-white border border-blue-200 text-blue-700 hover:bg-blue-600 hover:text-white text-sm font-semibold py-2 px-4 rounded-lg transition-all shadow-sm"
            >
                + ₹1,000 / mo
            </button>
            <button 
                onClick={() => setBoostTime(prev => prev + 2)}
                className="flex-1 bg-white border border-blue-200 text-blue-700 hover:bg-blue-600 hover:text-white text-sm font-semibold py-2 px-4 rounded-lg transition-all shadow-sm"
            >
                + 2 Years
            </button>
            <button 
                onClick={() => setBoostReturn(prev => prev + 2)}
                className="flex-1 bg-white border border-blue-200 text-blue-700 hover:bg-blue-600 hover:text-white text-sm font-semibold py-2 px-4 rounded-lg transition-all shadow-sm"
            >
                + 2% Return
            </button>
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
                
                {/* 1st Line: The base invested amount (Safe Money) */}
                <Bar dataKey="Invested" barSize={30} fill="#93c5fd" radius={[4, 4, 0, 0]} name="Base Invested" />
                
                {/* 2nd Line: The base total wealth (Current Plan) */}
                <Area type="monotone" dataKey="TotalWealth" fill="#dbeafe" stroke="#3b82f6" strokeWidth={3} name="Base Wealth" />
                
                {/* 3rd Line: THE FOMO LINE! (Optimized Potential) 💸 */}
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
        </div>
        </div>
    );
};

export default SipChart;