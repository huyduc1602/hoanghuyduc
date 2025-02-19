import OpenAI from 'openai';
import { errorHandler } from '../src/middleware/errorHandler';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        if (!req.body.messages || !Array.isArray(req.body.messages)) {
            throw new Error('Invalid message format');
        }

        const completion = await openai.chat.completions.create({
            model: "gpt-4",
            messages: req.body.messages,
            temperature: 0.7,
            max_tokens: 500,
            top_p: 0.9,
            frequency_penalty: 0,
            presence_penalty: 0
        });

        return res.status(200).json({
            choices: [{
                message: {
                    content: completion.choices[0].message.content,
                    role: 'assistant'
                }
            }]
        });
    } catch (error) {
        return errorHandler(error, req, res);
    }
}