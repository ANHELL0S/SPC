import { comment_Instance } from './config/axios'

const fetch = async () => {
	try {
		const response = await comment_Instance.get('/')
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

const getById = async id => {
	try {
		const response = await comment_Instance.get(`/${id}`)
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

const create = async data => {
	try {
		const response = await comment_Instance.post('/create', data)
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

const update = async (id, data) => {
	try {
		const response = await comment_Instance.put(`/update/${id}`, data)
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

const remove = async id => {
	try {
		const response = await comment_Instance.delete(`/remove/${id}`)
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

export { getById, fetch, create, update, remove }
