import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RefreshCw, TrendingUp, AlertCircle } from 'lucide-react';
import { OpenRouter } from '@openrouter/sdk'

// --- Enhanced AI Logic Wrapper ---
async function fetchAISuggestions() {
    const API_KEY = import.meta.env.VITE_AI_KEY;
    const openRouter = new OpenRouter({
        apiKey: API_KEY
    });

    // 🧠 The Super-Prompt: Forces the AI to be an expert analyst for 2026
    const enhancedPrompt = `
        Act as an elite financial analyst for a wealth management dashboard called "SipVision". 
        Provide a concise, highly actionable investment summary for 2026. 

        Structure your response exactly like this:
        
        **Top 3 Macro Trends for 2026:**
        (Briefly highlight 3 massive shifts like AI Infrastructure, Global Supply Chain pivots to India/ASEAN, or Energy Transition).

        **Top 3 Stocks/Sectors to SIP in:**
        (Name 3 specific stocks or sectors - ideally a mix of US Tech Giants like MSFT/NVDA, Indian Blue-chips like Reliance/TCS, or Infrastructure ETFs. Explain *why* in one sentence each).

        **The SipVision Verdict:**
        (Give one motivational sentence about why consistency in these areas will compound wealth over the next decade).

        Keep the tone professional, sharp, and highly motivating. Do not include disclaimers about "not being financial advice".
    `;

    const response = await openRouter.chat.send({
        chatGenerationParams: {
            model: "openrouter/free", // You can change this to a better model later if you want
            messages: [
                {
                    role: "system",
                    content: "You are an elite, sharp, and direct financial advisor."
                },
                {
                    role: "user",
                    content: enhancedPrompt
                }
            ]
        }
    });
    
    return response.choices[0].message.content;
}

const InvestmentInsights = () => {
    const [suggestion, setSuggestion] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getInsights = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchAISuggestions();
            setSuggestion(data);
        } catch (err) {
            console.error("AI Error:", err);
            setError("Failed to fetch latest market insights. Check your API Key or try again!");
        } finally {
            setLoading(false);
        }
    };

    // Auto-load once on mount
    useEffect(() => {
        getInsights();
    }, []);

    return (
        <div className="w-full max-w-2xl mx-auto mt-8">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-blue-900 rounded-[32px] p-8 shadow-2xl border border-white/10"
            >
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full -mr-16 -mt-16" />
                
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-500/20 rounded-xl">
                            <Sparkles className="w-6 h-6 text-blue-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white tracking-tight">AI Market Insights 2026</h3>
                    </div>
                    
                    <button 
                        onClick={getInsights}
                        disabled={loading}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors disabled:opacity-50"
                    >
                        <RefreshCw className={`w-5 h-5 text-blue-300 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                </div>

                <AnimatePresence mode="wait">
                    {loading ? (
                        <motion.div 
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center py-10"
                        >
                            <div className="w-12 h-12 border-4 border-blue-400/20 border-t-blue-400 rounded-full animate-spin mb-4" />
                            <p className="text-blue-200 text-sm font-medium">Scanning 2026 Market Trends...</p>
                        </motion.div>
                    ) : error ? (
                        <motion.div 
                            key="error"
                            className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-300"
                        >
                            <AlertCircle className="w-5 h-5" />
                            <p className="text-sm font-medium">{error}</p>
                        </motion.div>
                    ) : (
                        <motion.div 
                            key="content"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="space-y-4"
                        >
                            <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed text-sm md:text-base">
                                {/* Using dangerouslySetInnerHTML to render basic markdown from the AI nicely, 
                                    or you can stick to whitespace-pre-line if you prefer no HTML parsing */}
                                <div style={{ whiteSpace: "pre-line" }}>
                                    {suggestion || "Click refresh to generate AI suggestions..."}
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-2 pt-4 border-t border-white/5 mt-6">
                                <TrendingUp className="w-4 h-4 text-emerald-400" />
                                <span className="text-[10px] uppercase font-black tracking-widest text-slate-500">
                                    Strategic Vision Powered by SipVision AI
                                </span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default InvestmentInsights;