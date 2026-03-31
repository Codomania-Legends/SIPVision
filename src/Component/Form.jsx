import React, { useState } from 'react';

function Form() {
    // Managing the complete set of inputs in our state! 🧠📊
    const [sipData, setSipData] = useState({
        goal: '',
        targetAmount: '',
        monthlyAmount: '',
        timeHorizon: '',
        expectedReturn: '12', // Defaulting to 12% for mutual funds! 📈
        currentSavings: ''
    });

    // Universal handler for all our inputs ✍️⚙️
    const handleChange = (e) => {
        setSipData({ 
            ...sipData, 
            [e.target.name]: e.target.value 
        });
    };

    // Submitting the full dataset! 🚀📨
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Full SIP Data ready for the chart:", sipData); 
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 max-w-md">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">🎯 SIPVision Planner</h1>
                
                {/* 1. Goal Input */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-600 mb-1">What is your goal?</label>
                    <input 
                        type="text" 
                        name="goal"
                        value={sipData.goal}
                        onChange={handleChange}
                        placeholder="e.g., Dream Home, Retirement" 
                        className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {/* 2. Target Amount Input */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-600 mb-1">Target (₹)</label>
                        <input 
                            type="number" 
                            name="targetAmount"
                            value={sipData.targetAmount}
                            onChange={handleChange}
                            placeholder="5000000" 
                            className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        />
                    </div>

                    {/* 3. Monthly Amount Input */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-600 mb-1">Monthly SIP (₹)</label>
                        <input 
                            type="number" 
                            name="monthlyAmount"
                            value={sipData.monthlyAmount}
                            onChange={handleChange}
                            placeholder="5000" 
                            className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {/* 4. Time Horizon Input */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-600 mb-1">Time (Years)</label>
                        <input 
                            type="number" 
                            name="timeHorizon"
                            value={sipData.timeHorizon}
                            onChange={handleChange}
                            placeholder="10" 
                            className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        />
                    </div>

                    {/* 5. Expected Return Input */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-600 mb-1">Return (%)</label>
                        <input 
                            type="number" 
                            name="expectedReturn"
                            value={sipData.expectedReturn}
                            onChange={handleChange}
                            placeholder="12" 
                            className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        />
                    </div>
                </div>

                {/* 6. Current Savings Input */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-600 mb-1">Current Savings (₹)</label>
                    <input 
                        type="number" 
                        name="currentSavings"
                        value={sipData.currentSavings}
                        onChange={handleChange}
                        placeholder="Initial investment (optional)" 
                        className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    />
                </div>

                {/* Submit Button */}
                <button 
                    type="submit" 
                    className="mt-4 bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg flex justify-center items-center gap-2"
                >
                    Calculate My Future 🌟
                </button>
                
            </form>
        </div>
    )
}

export default Form;