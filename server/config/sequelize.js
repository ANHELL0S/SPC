import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'
dotenv.config()

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	dialect: 'postgres',
	logging: false,

	/*
	dialectOptions: {
		ssl: {
			require: true,
			rejectUnauthorized: false,
		},
	},
	retry: {
		match: [/SequelizeConnectionError/, /SequelizeConnectionRefusedError/, /EAI_AGAIN/],
		max: 5, // Number of retry attempts
		backoffBase: 1000, // Initial backoff duration in milliseconds
		backoffExponent: 2, // Exponent to increase backoff each attempt
	},
	*/
})

export default sequelize
