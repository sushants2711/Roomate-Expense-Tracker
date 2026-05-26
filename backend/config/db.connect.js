import mongoose from "mongoose";
import { MONGO_URI } from "./constant.js";


export const connectDb = async () => {

    if (!MONGO_URI) {
        throw new Error("MONGO_URI is not defined");
    };

    try {
        await mongoose.connect(MONGO_URI, {
            maxPoolSize: 10,              // M0 allows 500 connections
            minPoolSize: 2,               // Keep 2 warm connections always
            serverSelectionTimeoutMS: 5000, // Fail fast if Atlas unreachable
            socketTimeoutMS: 45000,       // Drop idle sockets after 45s
            connectTimeoutMS: 10000,      // Connection attempt timeout
        })
            .then(() => console.log(`Db Connected Successfully`))
            .catch((err) => console.log(`Error Occured from Db, ${err.message}`));

    } catch (error) {
        throw new Error(`Connection Failed from Db, ${error}`);
    };
};