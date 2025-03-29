import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import { createServer } from "node:http";
import { Server } from "socket.io";
import cors from "cors";
import { connectionToSocket } from "./controllers/socketManager.js";
import userRoutes from "./routes/users.routers.js";

const app = express();
const server = createServer(app);
const io = connectionToSocket(server);

app.set("port", process.env.PORT || 3001);
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

app.use("/api/v1/users", userRoutes);

const start = async () => {
  try {
    const mongoDb = await mongoose.connect(process.env.MONGO_URL);
    console.log(`mongo connected: ${mongoDb.connection.host}`);

    server.listen(app.get("port"), () => {
      console.log(`Server is running on port ${app.get("port")}`);
    });
  } catch (err) {
    console.log(err)
  }
};

start();
