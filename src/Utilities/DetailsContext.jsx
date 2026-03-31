import React, { createContext, useState, useContext } from 'react';

const DetailsContext = createContext();

export const DetailsProvider = ({ children }) => {
    
    const [sipData, setSipData] = useState({
        goal: '',
        targetAmount: '',
        monthlyAmount: '',
        timeHorizon: '',
        expectedReturn: '12',
        currentSavings: ''
    });

    return (
        <DetailsContext.Provider value={{ sipData, setSipData }}>
            {children}
        </DetailsContext.Provider>
    );
};

export const useDetails = () => {
    return useContext(DetailsContext);
};