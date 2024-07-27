import { fetch } from '../api/config.api'

// Define la función para obtener datos de configuración
export const fetchData = async () => {
	try {
		const configsData = await fetch()
		return configsData
	} catch (error) {
		console.error('Error fetching configs:', error)
		throw new Error('Error fetching configs')
	}
}
