import dotenv from 'dotenv'
import express from 'express'
import routes from './routes.js'
import cookieParser from 'cookie-parser'
import sequelize from './config/sequelize.js'
import { startServer } from './utils/serverUtils.js'
import { setupCors } from './middlewares/cors.middleware.js'
import { setupMorgan } from './middlewares/morgan.middleware.js'
import { startServerStatusCron } from './cron/serverStatusCron.js'

dotenv.config()
const app = express()

// Setup middleware
setupCors(app)
setupMorgan(app)

// JSON parsing middleware
app.use(cookieParser())
app.use(express.json())

// Use routes
app.use('/', routes)

// Connect to database and start server
sequelize
	.sync({ force: false })
	.then(() => {
		startServer(app)
		startServerStatusCron()
	})
	.catch(err => {
		console.error('Error syncing with database:', err)
	})
