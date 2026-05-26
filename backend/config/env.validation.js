import dotenv from "dotenv";
dotenv.config();

export const validateEnv = () => {

    if (!process.env.NODE_ENV) {
        process.env.NODE_ENV = "development";
    };

    if (!process.env.ALLOWED_ORIGINS) {
        process.env.ALLOWED_ORIGINS = "http://localhost:5173";
    };

    const requiredEnvVars = [
        "PORT",
        "MONGO_URI",
    ];

    const missingVars = requiredEnvVars.filter((curr) => !process.env[curr]);

    if (missingVars.length > 0) {

        console.error("[ERROR] Missing required environment variables:");

        missingVars.forEach((curr) => {
            console.error(`   - ${curr}`);
        });

        console.error("Please check your .env file and ensure all required variables are set.");

        process.exit(1);
    };

    console.log("[OK] All required environment variables are present");
};