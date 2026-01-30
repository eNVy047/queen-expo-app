import chalk from "chalk"
import dotenv from "dotenv"
import connectDB from "./common/db/index.js";
import {app} from './app.js'
import logger from "./common/logger/winston.logger.js";
dotenv.config({
    path: './.env'
})



connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        logger.info(chalk.bgBlue`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    logger.error(chalk.bgRed`MONGO db connection failed !!! , ${err}`);
})
