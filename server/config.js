import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from the root directory
dotenv.config({ path: path.join(__dirname, '../.env') });

export const config = {
    port: process.env.PORT || 3000,
    openaiApiKey: process.env.VITE_OPENAI_API_KEY,
    nodeEnv: process.env.NODE_ENV || 'development'
};