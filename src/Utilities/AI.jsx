import { OpenRouter } from '@openrouter/sdk'
import React from 'react'

async function AI(content) {
    const openRouter = new OpenRouter({
        apiKey: import.meta.env.VITE_AI_KEY
    });

    const response = await openRouter.chat.send({
        chatGenerationParams: {
            model: "openrouter/free",
            messages: [
                {
                    role: "system",
                    content: `You are the elite 'SipVision' AI Wealth Coach. Your job is to write a highly motivational, personalized financial blueprint narrative based on raw user data. 
                    
                    CRITICAL RULES:
                    1. STRICTLY MAXIMUM 50 words.
                    2. NEVER repeat or echo the raw JSON data.
                    3. NEVER use intro phrases like "Here is the story:", "Data:", or "Story:".
                    4. Output ONLY the raw, conversational, and inspiring narrative. 
                    5. Include exactly 2 relevant emojis.`
                },
                {
                    role: "user",
                    content: `Turn this user's financial data into a punchy, 50-word motivational wealth blueprint: \n\n${content}`
                }
            ]
        }
    });

    const finalContent = response.choices[0].message.content.trim();
    console.log("Clean AI Story:", finalContent);
    return finalContent;
}

export default AI