// import dotenv from 'dotenv';
//
// dotenv.config();
// import {load} from 'ts-dotenv';
//
// export const env = load({
//         BOT_TOKEN: String,
//         BASE_WEBAPP_URL: String
//     },
//     "../../../.env"
// );

const env = {
    BOT_TOKEN: "7416595682:AAG78eqxFSinvXS4bdIrQvfqrBAVOWuNlR0",
    BASE_WEBAPP_URL: "https://dd37-188-130-155-165.ngrok-free.app",
}

export const url: string = env.BASE_WEBAPP_URL;

declare global {
    interface Window {
        Telegram: {
            WebApp: any;
        }
    }
}
