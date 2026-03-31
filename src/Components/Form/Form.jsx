import React, { useState } from 'react';
import { useDetails } from '../../Utilities/DetailsContext';
import { useNavigate } from 'react-router';

function Form() {
    const {sipData, setSipData} = useDetails();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setSipData({ 
            ...sipData, 
            [e.target.name]: e.target.value 
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSipData({
            ...sipData,
            [e.target.name]: e.target.value
        });
        navigate("/home");
    };

    return (
        <div className="flex justify-center items-center h-[90vh] w-screen">
            <div className="bg-white p-6 rounded-2xl medium-box-shadow max-w-md">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">🎯 SIPVision Planner</h1>
                    
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-600 mb-1">What is your goal?</label>
                        <input 
                            type="text" 
                            name="goal"
                            defaultValue={sipData.goal}
                            onChange={handleChange}
                            placeholder="e.g., Dream Home, Retirement" 
                            className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">  
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

                    <button 
                        type="submit" 
                        className="mt-4 bg-blue-600 small-box-shadow hover:bg-blue-700 hover:scale-102 hover:medium-box-shadow text-white font-semibold py-3 rounded-lg transition-all duration-300 flex justify-center items-center gap-2 hover:cursor-pointer hover:rounded-xl"
                    >
                        Calculate My Future 🌟
                    </button>
                    
                </form>
            </div>
        </div>
    )
}

export default Form;