import express from 'express';
import dotenv from 'dotenv';  
import cors from 'cors';  
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import dbConnection from './database/dbConnection.js'; 
import { errorMiddleware } from './middlewares/error.js';
import messageRouter from './router/messageRoutes.js';
import userRouter from './router/userRoutes.js';
import timelineRouter from './router/timelineRoutes.js';
import applicationRouter from './router/softwareApplicationRoutes.js';
import skillRouter from './router/skillRouter.js';
import project from './router/projectRouter.js';



const app = express();
dotenv.config({path: './config/config.env'});

console.log(process.env.PORT);


app.use(cors({
    origin: 
    [process.env.PORTFOLIO_URI, process.env.DASHBOARD_URI, "http://localhost:5173", "http://localhost:3000", "http://localhost:5174", "http://localhost:5175", "http://localhost:5176"],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
   
}));

// Health check endpoint for UptimeRobot
app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'OK', 
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
});

app.use('/api/v1/message', messageRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/timeline', timelineRouter);
app.use('/api/v1/application', applicationRouter);
app.use('/api/v1/skill', skillRouter);
app.use('/api/v1/project', project);

dbConnection();
app.use(errorMiddleware);
 
export default app;