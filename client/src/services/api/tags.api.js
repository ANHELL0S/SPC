import { tagsInstance } from './config/axios'

export const fetch = async () => {
	try {
		const response = await tagsInstance.get('/')
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

export const create = async data => {
	try {
		const response = await tagsInstance.post('/create', data)
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

export const update = async (id, data) => {
	try {
		const response = await tagsInstance.put(`/update/${id}`, data)
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

export const remove = async id => {
	try {
		const response = await tagsInstance.delete(`/remove/${id}`)
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

export const reactive = async id => {
	try {
		const response = await tagsInstance.put(`/reactive/${id}`)
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}
