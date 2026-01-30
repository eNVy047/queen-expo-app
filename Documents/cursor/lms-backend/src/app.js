import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import http from "http";
import { Server } from "socket.io";
import morganMiddleware from "./common/logger/morgan.logger.js"

const app = express()
const server = http.createServer(app);

app.use(
  cors({
    origin:
      process.env.CORS_ORIGIN === "*"
        ? "*" // This might give CORS error for some origins due to credentials set to true
        : process.env.CORS_ORIGIN?.split(","), // For multiple cors origin for production.
    credentials: true,
  })
);

// for socket connection
const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  },
});

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser())
app.use(morganMiddleware);

// api routes
import { errorHandler } from "./common/middlewares/error.middlewares.js";

//routes import
import userRouter from './common/routes/user.routes.js'
import lmsRouter from './apps/lms/routes/index.js'


// set io 

//routes declaration
app.use("/api/v1/auth", userRouter)
app.use("/api/v1/lms", lmsRouter)


// http://localhost:8000/api/v1/auth/register
app.use(errorHandler);

export { app }
