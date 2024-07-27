import cors from 'cors'

function setupCors(app) {
	// Configuración de CORS
	app.use(
		cors({
			origin: process.env.CORS_ORIGIN,
			credentials: true,
		})
	)
}

export { setupCors }
