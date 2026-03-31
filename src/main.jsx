import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'sileo/styles.css' // Required: Import Sileo's stylesheet
import { BrowserRouter, Routes, Route, Outlet } from 'react-router'
import Home from './Components/Home/Home'
import Navbar from './Components/Navbar/Navbar'
import { DetailsProvider, useDetails } from './Utilities/DetailsContext'
import Form from './Components/Form/Form'
import MFDetails from './Components/MFDetails/MFDetails'
import Benefits from './Components/Benefits/Benefits'
import UserDetails from './Components/UserDetails/UserDetails'
import InvestmentApps from './Components/InvestmentApp/InvestmentApps'
import { Toaster } from "sileo"

const Layout = ({children}) => {
    const {story} = useDetails()
    return (
        <>
            <Navbar />
            {children}
            {story && <p>{story}</p>}
        </>
    )
}

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <DetailsProvider>
            {/* Wrap custom styles inside the options prop */}
            <Toaster 
                position="bottom-right" 
                options={{
                    fill: "#171717", 
                    styles: {
                        title: "text-white!", 
                        description: "text-white/75!"
                    }
                }}
            />
            <Layout>
                <Routes>
                    <Route path="/" element={<Form />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/mfdetails" element={<MFDetails />} />
                    <Route path="/benefits" element={<Benefits />} />
                    <Route path="/user-details" element={<UserDetails />} />
                    <Route path="/investment-apps" element={<InvestmentApps />} />
                </Routes>
            </Layout>
        </DetailsProvider>
    </BrowserRouter>
)