import { templateInstance } from './config/axios'

export const getByIdTemplateRequest = async id => {
	try {
		const response = await templateInstance.get(`/${id}`)
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

export const fetch = async () => {
	try {
		const response = await templateInstance.get('/')
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

export const create = async data => {
	try {
		const response = await templateInstance.post('/create', data)
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

export const update = async (id, data) => {
	try {
		const response = await templateInstance.put(`/update/${id}`, data)
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

export const remove = async id => {
	try {
		const response = await templateInstance.delete(`/remove/${id}`)
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

export const removeTags = async id => {
	try {
		const response = await templateInstance.delete(`/removeTags/${id}`)
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}
