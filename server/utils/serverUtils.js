function startServer(app) {
	const PORT = process.env.PORT || 4000
	app.listen(PORT, () => {
		console.log(`\n>> Server running on port  -> ${PORT}`)
		console.log(`>> Connected to the db     -> ${process.env.DB_NAME}`)
		console.log(`>> CORS Origin             -> ${process.env.CORS_ORIGIN}\n`)
	})
}

export { startServer }
