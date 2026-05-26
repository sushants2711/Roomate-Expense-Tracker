// import all package that is required to start the server
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

// import all the functions that is necessary, before start the server that help to check everything is perfectly working or not
import { validateEnv } from "./config/env.validation.js";
import { connectDb } from "./config/db.connect.js";
import { PORT, ALLOWED_ORIGINS } from "./config/constant.js";

// import all the api endpoints here that help to where the api endpoints gone

// .env configration 
dotenv.config();

// check all required .env is available or not in the .env files
validateEnv();

// initialize the express inside the app
const app = express();

// define the port
const portNumber = PORT;

// try to connect to db while calling the db functions
connectDb();

// cookie parser config
app.use(cookieParser());

// convert the data into a json format
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// define the cors policy
const origins = ALLOWED_ORIGINS ? ALLOWED_ORIGINS.split(",").map((curr) => curr.trim()) : [];

app.use(cors({
    origin: origins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    exposedHeaders: ["Set-Cookie"],
    maxAge: 86400,
    preflightContinue: false,
    optionsSuccessStatus: 204
}));

// check the server is healthy or not for any error is occured for that
app.get("/health", (req, res) => {
    const dbStatus = mongoose.connection.readyState === 1 ? "Connected" : "Disconnected";
    return res.status(200).json({
        success: true,
        message: "Server is healthy",
        database: dbStatus,
        timestamp: new Date().toISOString()
    });
});

// check the api endpoints where server working or not
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is working",
        timestamp: new Date().toISOString()
    });
});


// api endpoints start here


// ready to start the server
app.listen(portNumber, () => {
    console.log(`server is running on http://localhost:${portNumber}`);
});