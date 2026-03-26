import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';  
import taskRoutes from './routes/taskRoutes.js';                                                                              
import { errorHandler } from './middleware/errorMiddleware.js';
import logger from './utils/logger.js';
const app = express();
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
	const start = Date.now();
	res.on('finish', () => {
		logger.info('HTTP request completed', {
			method: req.method,
			path: req.originalUrl,
			statusCode: res.statusCode,
			durationMs: Date.now() - start,
		});
	});
	next();
});


app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/tasks', taskRoutes);

app.use(errorHandler);
export default app;

