import React, { createContext, useState, useContext, useEffect } from 'react';

const DetailsContext = createContext();

export const DetailsProvider = ({ children }) => {
    const [story, setStory] = useState(null);
    const [sipData, setSipData] = useState(() => {
        const savedData = localStorage.getItem('sipVisionData');
        
        if (savedData) {
            return JSON.parse(savedData);
        }
        
        return {
            goal: '',
            targetAmount: '',
            monthlyAmount: '',
            timeHorizon: '',
            expectedReturn: '12', 
            currentSavings: ''
        };
    });

    useEffect(() => {
        localStorage.setItem('sipVisionData', JSON.stringify(sipData));
    }, [sipData]);

    return (
        <DetailsContext.Provider value={{ sipData, setSipData, story, setStory }}>
            {children}
        </DetailsContext.Provider>
    );
};

export const useDetails = () => {
    return useContext(DetailsContext);
};