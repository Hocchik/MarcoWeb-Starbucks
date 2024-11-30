import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRoutes from './routes/auth.routes.js'
import taskRoutes from './routes/task.routes.js';
import authAdminRoutes from './routes/authAdmin.routes.js'
import adminInfo from './routes/admininfo.routes.js'

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", taskRoutes);
app.use("/api", authAdminRoutes);
app.use("/api", adminInfo)

export default app;
