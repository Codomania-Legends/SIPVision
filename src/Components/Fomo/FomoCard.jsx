import React from 'react';

const FomoCard = () => {
    return (
        <div className="bg-linear-to-br from-indigo-50 to-blue-50 p-6 rounded-2xl shadow-md border border-indigo-100 w-full max-w-md mt-6">
        <h3 className="text-lg font-bold text-indigo-900 mb-2 flex items-center gap-2">
            ⏳ The Cost of Waiting
        </h3>
        <p className="text-sm text-indigo-700 mb-4">
            Time is your biggest asset in investing. See what you might be missing!
        </p>
        
        <div className="bg-white p-4 rounded-xl shadow-inner border border-indigo-50">
            <p className="text-sm text-gray-600">
            If you had started investing just <span className="font-bold text-gray-800">₹5,000/month</span> 5 years ago at 12% returns...
            </p>
            <div className="mt-3">
            <p className="text-xs text-gray-500 uppercase tracking-wide">You would have</p>
            <p className="text-2xl font-extrabold text-green-600">₹4,12,432</p>
            <p className="text-xs text-gray-400 mt-1">Total invested: ₹3,00,000</p>
            </div>
        </div>
        </div>
    );
};

export default FomoCard;