import React from 'react';
import { useDetails } from '../../Utilities/DetailsContext';
import { Link } from 'react-router'; // Make sure react-router-dom is installed! 🛣️

function DetailsCard({title, value}) {
    return (
        <div className="flex justify-between bg-gray-50 p-2 rounded-md">
            <span className="font-medium text-gray-500">{title}:</span> 
            <span className="font-semibold text-gray-800">{value}</span>
        </div>
    )
}

function DetailsOverview() {
    const { sipData } = useDetails();

    if (!sipData.targetAmount && !sipData.monthlyAmount) {
        return (
            <div className="flex flex-col items-center justify-center p-10 bg-white rounded-2xl border border-red-50 max-w-md mx-auto mt-10 text-center">
                <div className="text-6xl mb-4">📭</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">No Details Found!</h2>
                <p className="text-gray-600 mb-6 text-sm">
                    It looks like you haven't filled out your investment goals yet.
                </p>
                <Link 
                    to="/" 
                    className="bg-blue-600 text-white font-semibold py-2.5 px-6 rounded-lg hover:bg-blue-700 transition-colors shadow-md flex items-center gap-2"
                >
                    ⬅️ Go Back to Calculator
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 w-2/5 small-box-shadow rounded-2xl max-w-md mx-auto mt-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-3 flex items-center gap-2">
                📊 Your SIP Summary
            </h2>
            
            <div className="flex flex-col gap-3 text-gray-700">
                <DetailsCard title="Goal" value={sipData.goal || "Not specified"} />
                
                <DetailsCard title="Target Amount" value={`₹${sipData.targetAmount}`} />
                
                <DetailsCard title="Monthly SIP" value={`₹${sipData.monthlyAmount}`} />
                
                <DetailsCard title="Time Horizon" value={`${sipData.timeHorizon} Years`} />
                
                <DetailsCard title="Expected Return" value={`${sipData.expectedReturn}%`} />
                
                <DetailsCard title="Current Savings" value={`₹${sipData.currentSavings || "0"}`} />
            </div>
        </div>
    );
}

export default DetailsOverview;