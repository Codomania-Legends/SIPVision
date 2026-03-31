import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import Home from './Components/Home/Home'
import Navbar from './Components/Navbar/Navbar'
import { DetailsProvider } from './Utilities/DetailsContext'
import Form from './Components/Form/Form'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <DetailsProvider>
            <Navbar />
            <Routes>
                <Route path="/" element={<Form />} />
                <Route path="/home" element={<Home />} />
            </Routes>
        </DetailsProvider>
    </BrowserRouter>
)
