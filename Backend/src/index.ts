import express , {Request, Response} from 'express';
import cors from 'cors';
import "dotenv/config";
import mongoose from 'mongoose';
import userRoutes from './routes/users';
import authRoutes from "./routes/auth";
import cookieParser from "cookie-parser";
import path from 'path';

// Connect to MongoDB Database
mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string)


const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// app.use(cors());
const corsOptions = {
  origin: 'http://localhost:5173', // Adjust this to your front-end URL
  credentials: true, // Allow credentials
};

app.use(express.static(path.join(__dirname, '../../frontend/dist" ')));

app.use(cors(corsOptions));

app.use("/api/auth", authRoutes);
app.use('/api/users' , userRoutes)

app.listen(8000, () => {
  console.log('server is runing on port')});
