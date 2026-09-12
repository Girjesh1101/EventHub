import dotenv from 'dotenv';

const environment = process.env.ENV || 'qa' || 'dev';

dotenv.config({
    path: `.env.${environment}`
});

if (!process.env.UI_BASE_URL) {
    throw new Error('Missing UI_BASE_URL environment variable');
}

if (!process.env.API_BASE_URL) {
    throw new Error('Missing API_BASE_URL environment variable');
}

export const envConfig = {
    environment,
    baseURL: process.env.UI_BASE_URL,
    apiBaseURL: process.env.API_BASE_URL
};