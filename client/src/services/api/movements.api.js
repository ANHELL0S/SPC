import { movementsInstance } from './config/axios'

const fetch = async () => {
	try {
		const response = await movementsInstance.get('/')
		return response.data
	} catch (error) {
		throw new Error(`Error fetching movements: ${error.message}`)
	}
}

const getById = async id => {
	try {
		const response = await movementsInstance.get(`/${id}`)
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

export { fetch, getById }
