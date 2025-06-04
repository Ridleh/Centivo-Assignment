import dotenv from 'dotenv';

dotenv.config();

export const PORT: string = process.env.PORT || '3000';
export const MONGO_URL: string = process.env.MONGO_URI || '';