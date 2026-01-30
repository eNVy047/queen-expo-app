// "mongodb+srv://Narayan1:Narayan123@test-app.56hdbdf.mongodb.net"
import mongoose from "mongoose";
import { DB_NAME } from "../../constants.js";
import chalk from "chalk";
import logger from "../logger/winston.logger.js";


const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URI?.replace(/\/$/, "");
        const connectionInstance = await mongoose.connect(`${uri}/${DB_NAME}`)
        logger.info(chalk.bgGreen`\n🥳🥳 MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        logger.error(chalk.bgRed`🧐🧐 MONGODB connection FAILED , ${error}`);
        process.exit(1)
    }
}

export default connectDB