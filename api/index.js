import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import listingRouter from "./routes/listing.route.js";

dotenv.config();


mongoose.connect("mongodb://simataamwiya8:!amstillMusiq04@new-meta-home-shard-00-00.jzgdw.mongodb.net:27017,new-meta-home-shard-00-01.jzgdw.mongodb.net:27017,new-meta-home-shard-00-02.jzgdw.mongodb.net:27017/?ssl=true&replicaSet=atlas-x3iot9-shard-0&authSource=admin&retryWrites=true&w=majority&appName=new-meta-home").then(() => {
    console.log("Connected to MongoDB!!!");
    }).catch((err) => {
    console.log("Error: ", err);
    });




const app = express();
app.use(express.json());
app.use(cookieParser());

app.listen(3000, () => {
  console.log('Server is running on port 3000!!!');
});


app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);


app.use((err, req, res, next) => {
  const statusCode = res.statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});