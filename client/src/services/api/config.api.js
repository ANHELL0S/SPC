import { configsInstance } from './config/axios'

export const fetch = async () => {
	try {
		const response = await configsInstance.get('/')
		return response.data
	} catch (error) {
		throw new Error(`Error fetching config: ${error.message}`)
	}
}

export const update = async (id, data) => {
	try {
		const response = await configsInstance.put(`/update/${id}`, data)
		return response.data
	} catch (error) {
		throw new Error(`Error updating config: ${error.message}`)
	}
}
