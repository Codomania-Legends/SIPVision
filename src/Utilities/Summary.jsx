import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText } from 'lucide-react';
import { useDetails } from './DetailsContext';
import { sileo } from 'sileo';
import jsPDF from 'jspdf';

function SummaryDownloader() {
    const { sipData } = useDetails();
    const [isDownloading, setIsDownloading] = useState(false);

    const generatePDF = async () => {
        setIsDownloading(true);

        const createAndSavePDF = async () => {
            const doc = new jsPDF();
            const pageWidth = doc.internal.pageSize.getWidth();
            let yPos = 0;

            // --- 1. Modern Dark Header ---
            doc.setFillColor(15, 23, 42); // slate-900
            doc.rect(0, 0, pageWidth, 55, 'F');
            
            // Header Accents
            doc.setFillColor(59, 130, 246); // blue-500
            doc.rect(0, 53, pageWidth, 2, 'F');

            doc.setTextColor(255, 255, 255);
            doc.setFontSize(28);
            doc.setFont("helvetica", "bold");
            doc.text("WEALTH BLUEPRINT", 20, 32);
            
            doc.setFontSize(12);
            doc.setFont("helvetica", "normal");
            doc.setTextColor(148, 163, 184); // slate-400
            doc.text("Your Strategic Investment Roadmap", 20, 44);

            yPos = 75;

            // --- 2. Highlighted Summary Box ---
            doc.setFillColor(248, 250, 252); // slate-50
            doc.setDrawColor(226, 232, 240); // slate-200
            doc.roundedRect(20, yPos - 10, pageWidth - 40, 50, 4, 4, 'FD');

            doc.setTextColor(15, 23, 42); // slate-900
            doc.setFontSize(14);
            doc.setFont("helvetica", "bold");
            doc.text("Executive Summary", 26, yPos + 2);

            const reportText = `You are actively on the path to achieving your goal of "${sipData.goal || 'Wealth Building'}". By consistently investing your targeted monthly amount, you are leveraging the immense power of compounding. Stay disciplined, and let time do the heavy lifting for your portfolio.`;

            doc.setTextColor(71, 85, 105); // slate-600
            doc.setFontSize(11);
            doc.setFont("helvetica", "normal");
            const splitText = doc.splitTextToSize(reportText, pageWidth - 52);
            doc.text(splitText, 26, yPos + 12);
            
            yPos += 65;

            // --- 3. The Numbers (Card Grid Layout) ---
            doc.setTextColor(15, 23, 42);
            doc.setFontSize(16);
            doc.setFont("helvetica", "bold");
            doc.text("Key Metrics", 20, yPos);
            yPos += 10;

            const cardWidth = (pageWidth - 50) / 2;
            const cardHeight = 24;
            const col1X = 20;
            const col2X = 20 + cardWidth + 10;

            // Helper function to draw a data card
            const drawCard = (x, y, label, value, isHighlight = false) => {
                doc.setFillColor(isHighlight ? 239 : 255, isHighlight ? 246 : 255, isHighlight ? 255 : 255); // blue-50 or white
                doc.setDrawColor(isHighlight ? 191 : 226, isHighlight ? 219 : 232, isHighlight ? 254 : 240); // blue-200 or slate-200
                doc.roundedRect(x, y, cardWidth, cardHeight, 3, 3, 'FD');
                
                doc.setFontSize(9);
                doc.setFont("helvetica", "normal");
                doc.setTextColor(100, 116, 139); // slate-500
                doc.text(label.toUpperCase(), x + 6, y + 8);

                doc.setFontSize(13);
                doc.setFont("helvetica", "bold");
                doc.setTextColor(isHighlight ? 37 : 15, isHighlight ? 99 : 23, isHighlight ? 235 : 42); // blue-600 or slate-900
                doc.text(value, x + 6, y + 18);
            };

            // Row 1
            drawCard(col1X, yPos, "Primary Goal", `${sipData.goal || 'Not specified'}`);
            drawCard(col2X, yPos, "Target Amount", `Rs. ${Number(sipData.targetAmount).toLocaleString('en-IN') || '0'}`, true);
            yPos += cardHeight + 8;

            // Row 2
            drawCard(col1X, yPos, "Monthly SIP", `Rs. ${Number(sipData.monthlyAmount).toLocaleString('en-IN') || '0'}`, true);
            drawCard(col2X, yPos, "Time Horizon", `${sipData.timeHorizon || '0'} Years`);
            yPos += cardHeight + 8;

            // Row 3
            drawCard(col1X, yPos, "Expected Returns", `${sipData.expectedReturn || '0'}% p.a.`);
            
            yPos += cardHeight + 25;

            // --- 4. Stylish Footer ---
            doc.setDrawColor(226, 232, 240); // slate-200
            doc.line(20, yPos, pageWidth - 20, yPos);
            yPos += 10;

            doc.setFontSize(10);
            doc.setFont("helvetica", "italic");
            doc.setTextColor(148, 163, 184); // slate-400
            doc.text('"Consistency is the ultimate cheat code to wealth."', pageWidth / 2, yPos, { align: "center" });
            
            yPos += 8;
            doc.setFontSize(8);
            doc.setFont("helvetica", "normal");
            doc.text(`Generated securely by SIPVision on ${new Date().toLocaleDateString()}`, pageWidth / 2, yPos, { align: "center" });

            // --- Save the PDF ---
            doc.save(`SIPVision_Blueprint_${sipData.goal || 'Plan'}.pdf`);
        };

        const processPromise = createAndSavePDF();

        sileo.promise(processPromise, {
            loading: { title: "Rendering Design...", description: "Building your sleek PDF blueprint 🎨📊" },
            success: { title: "Blueprint Exported! 🎉", description: "Your gorgeous PDF is ready." },
            error: { title: "Generation Failed", description: "Oops, couldn't create the PDF." }
        });

        processPromise.finally(() => setIsDownloading(false));
    };

    return (
        <motion.button
            whileHover={{ scale: 1.05, translateY: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={generatePDF}
            disabled={isDownloading}
            className="flex items-center gap-3 bg-slate-900 border-2 border-slate-800 text-white font-bold py-4 px-6 rounded-2xl shadow-lg hover:bg-slate-800 hover:border-slate-700 hover:shadow-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed group justify-center sm:justify-start scale-70 absolute left-0 bottom-0"
        >
            <div className="p-2 bg-slate-800 text-blue-400 rounded-xl group-hover:bg-slate-700 group-hover:text-blue-300 transition-colors">
                {isDownloading ? (
                    <Download className="w-5 h-5 animate-bounce" />
                ) : (
                    <FileText className="w-5 h-5" />
                )}
            </div>
            <div className="flex flex-col items-start text-left">
                <span className="text-xs text-slate-400 uppercase tracking-wider font-black text-[10px]">Export Strategy</span>
                <span className="text-md">Download Blueprint</span>
            </div>
        </motion.button>
    );
}

export default SummaryDownloader;