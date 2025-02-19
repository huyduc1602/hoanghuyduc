import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import { config } from './config.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
    apiKey: config.openaiApiKey
});

app.post('/api/chat', async (req, res) => {
    try {
        const { messages } = req.body;

        if (!messages || !Array.isArray(messages)) {
            return res.status(400).json({ error: 'Invalid message format' });
        }

        // Get the last user message to detect language for error responses
        const lastUserMessage = messages.filter(m => m.role === 'user').pop()?.content || '';

        try {
            const completion = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages,
                temperature: 0.7,
                max_tokens: 500,
                top_p: 0.9,
                frequency_penalty: 0,
                presence_penalty: 0
            });

            res.json({
                choices: [{
                    message: {
                        content: completion.choices[0].message.content,
                        role: 'assistant'
                    }
                }]
            });
        } catch (apiError) {
            console.error('OpenAI API Error:', apiError);

            // Handle different types of API errors
            if (apiError.status === 429) {
                // Rate limit or quota exceeded
                const errorMessage = /[\u4e00-\u9fff]/.test(lastUserMessage) ?
                    "抱歉，服务暂时超出限制，请稍后再试。" :
                    /[\u3040-\u30ff]/.test(lastUserMessage) ?
                        "申し訳ありません。現在サービスの制限を超えています。後でお試しください。" :
                        /[ạàáảãâậầấẩẫăặằắẳẵèéẻẽêệềếểễìíỉĩòóỏõôộồốổỗơớờởỡùúủũưựừứửữỳýỷỹđ]/.test(lastUserMessage) ?
                            "Xin lỗi, dịch vụ đang quá tải. Vui lòng thử lại sau." :
                            "Sorry, the service is currently over quota. Please try again later.";

                return res.status(429).json({
                    error: errorMessage,
                    isQuotaError: true
                });
            }

            // Handle other API errors
            const genericError = /[\u4e00-\u9fff]/.test(lastUserMessage) ?
                "抱歉，服务出现问题。" :
                /[\u3040-\u30ff]/.test(lastUserMessage) ?
                    "申し訳ありません。サービスに問題が発生しました。" :
                    /[ạàáảãâậầấẩẫăặằắẳẵèéẻẽêệềếểễìíỉĩòóỏõôộồốổỗơớờởỡùúủũưựừứửữỳýỷỹđ]/.test(lastUserMessage) ?
                        "Xin lỗi, dịch vụ gặp sự cố." :
                        "Sorry, there was a problem with the service.";

            res.status(500).json({
                error: genericError,
                details: config.nodeEnv === 'development' ? apiError.stack : undefined
            });
        }
    } catch (error) {
        console.error('Server Error:', error);
        res.status(500).json({
            error: 'Internal server error',
            details: config.nodeEnv === 'development' ? error.stack : undefined
        });
    }
});

app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});