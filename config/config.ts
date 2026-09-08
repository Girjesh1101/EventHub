import dotenv from 'dotenv';

const environment = process.env.ENV || "qa";

dotenv.config({
    path: `.env.${environment}`
});

export const envConfig = {

    environment,
    baseURL: process.env.UI_BASE_URL!,
    apiBaseURL: process.env.API_BASE_URL!
}