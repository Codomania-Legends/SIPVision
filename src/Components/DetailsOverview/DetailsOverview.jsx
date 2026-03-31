import React from 'react';
import { useDetails } from '../../Utilities/DetailsContext';
import { Link } from 'react-router'; // Make sure react-router-dom is installed! 🛣️
import { Pencil } from 'lucide-react';

function DetailsCard({ title, value }) {
    return (
        <div className="flex justify-between items-center bg-blue-50/40 border border-blue-100/50 p-3 rounded-xl hover:bg-blue-50 transition-colors shadow-sm">
            <span className="font-medium text-gray-500 text-sm">{title}:</span> 
            <span className="font-bold text-blue-900">{value}</span>
        </div>
    );
}

function DetailsOverview() {
    const { sipData } = useDetails();

    if (!sipData.targetAmount && !sipData.monthlyAmount) {
        return (
            <div className="flex flex-col items-center justify-center p-10 bg-white rounded-3xl border border-gray-100 shadow-xl max-w-md mx-auto mt-10 text-center">
                <div className="text-7xl mb-4 animate-bounce">📭</div>
                <h2 className="text-2xl font-extrabold text-gray-800 mb-2">No Details Found!</h2>
                <p className="text-gray-500 mb-8 text-sm px-4">
                    It looks like you haven't filled out your investment goals yet. Let's get started!
                </p>
                <Link 
                    to="/" 
                    className="bg-blue-600 text-white font-bold py-3 px-8 rounded-xl hover:bg-blue-700 hover:shadow-lg transition-all flex items-center gap-2 transform hover:-translate-y-1"
                >
                    ⬅️ Go Back to Calculator
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-white p-8 w-full md:w-2/5 shadow-xl border border-gray-100 rounded-3xl max-w-md mx-auto mt-10 relative overflow-hidden">
            {/* Soft background glow effect */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-full blur-3xl opacity-50 -z-10 -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                <h2 className="text-2xl font-extrabold text-gray-800 flex items-center gap-2">
                    📊 Your SIP Summary
                </h2>
                
                {/* Replaced GSAP with Tailwind Group Hover! */}
                {/* Add your actual edit route to the Link's 'to' prop */}
                <Link 
                    to="/" 
                    className="group flex items-center gap-2 bg-blue-50 hover:bg-blue-100 p-2 rounded-full transition-all duration-300 cursor-pointer"
                >
                    <div className="overflow-hidden max-w-0 group-hover:max-w-xs transition-all duration-500 ease-in-out flex items-center">
                        <span className="text-blue-600 font-bold text-xs whitespace-nowrap pl-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                            Edit Details
                        </span>
                    </div>
                    <Pencil className="text-blue-600 h-4 w-4" />
                </Link>
            </div>
            
            <div className="flex flex-col gap-3">
                <DetailsCard title="Goal" value={sipData.goal || "Not specified"} />
                <DetailsCard title="Target Amount" value={`₹${Number(sipData.targetAmount).toLocaleString('en-IN')}`} />
                <DetailsCard title="Monthly SIP" value={`₹${Number(sipData.monthlyAmount).toLocaleString('en-IN')}`} />
                <DetailsCard title="Time Horizon" value={`${sipData.timeHorizon} Years`} />
                <DetailsCard title="Expected Return" value={`${sipData.expectedReturn}%`} />
                <DetailsCard title="Current Savings" value={`₹${Number(sipData.currentSavings || 0).toLocaleString('en-IN')}`} />
            </div>
        </div>
    );
}

export default DetailsOverview;