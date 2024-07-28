import cron from 'node-cron'
import { checkServerStatus } from '../services/serverStatusService.js'

const startServerStatusCron = () => {
	// Programar la verificación del estado del servidor cada minuto
	cron.schedule('* * * * *', checkServerStatus)

	// Llamar a la función inmediatamente al inicio
	checkServerStatus()
}

export { startServerStatusCron }
