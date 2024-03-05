import dotenv from 'dotenv';

dotenv.config();

interface AppConfig {
    serverPort: string | number;
    filloutApiKey: string;
    filloutFormId: string;
}

const config: AppConfig = {
    serverPort: process.env.SERVER_PORT || 3000,
    filloutApiKey: process.env.FILLOUT_API_KEY || "",
    filloutFormId: process.env.FILLOUT_FORM_ID || "cLZojxk94ous",
}

export default config;
