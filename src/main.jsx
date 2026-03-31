import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import Home from './Components/Home/Home'
import Navbar from './Components/Navbar/Navbar'
import { DetailsProvider } from './Utilities/DetailsContext'
import Form from './Components/Form/Form'
import MFDetails from './Components/MFDetails/MFDetails'
import Benefits from './Components/Benefits/Benefits'
import UserDetails from './Components/UserDetails/UserDetails'
import InvestmentApps from './Components/InvestmentApp/InvestmentApps'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <DetailsProvider>
            <Navbar />
            <Routes>
                <Route path="/" element={<Form />} />
                <Route path="/home" element={<Home />} />
                <Route path="/mfdetails" element={<MFDetails />} />
                <Route path="/services" element={<Benefits />} />
                <Route path="/user-details" element={<UserDetails />} />
                <Route path="/investment-apps" element={<InvestmentApps />} />
            </Routes>
        </DetailsProvider>
    </BrowserRouter>
)
