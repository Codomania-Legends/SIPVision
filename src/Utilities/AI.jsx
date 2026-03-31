import { OpenRouter } from '@openrouter/sdk'
import React from 'react'

async function AI(content) {
    const openRouter = new OpenRouter({
        apiKey: import.meta.env.AI_Key
    })
    const response = await openRouter.chat.send({
        chatGenerationParams : {
            model: "openrouter/free",
            messages: [
                {
                    role: "user",
                    content: `Hello, Give me direct content of the following question and give me the content in 50 words Maximum. Question: ${content}`
                }
            ]
        }
    })
    console.log(response.choices[0].message.content)
    return response.choices[0].message.content
}

export default AI