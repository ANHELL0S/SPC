import { articleInstance } from './config/axios'

const getPopular = async () => {
	try {
		const response = await articleInstance.get('/popular')
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

const fetch = async () => {
	try {
		const response = await articleInstance.get('/')
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

const getByIdUser = async id => {
	try {
		const response = await articleInstance.get(`/my-articles/${id}`)
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

const getById = async id => {
	try {
		const response = await articleInstance.get(`/${id}`)
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

const fetch_for_public = async () => {
	try {
		const response = await articleInstance.get('/article-public')
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

const create = async data => {
	try {
		const response = await articleInstance.post('/create', data)
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

const update = async (id, data) => {
	try {
		const response = await articleInstance.put(`/update/${id}`, data)
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

const check = async (id, data) => {
	try {
		const response = await articleInstance.put(`/check/${id}`, data)
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

const remove = async id => {
	try {
		const response = await articleInstance.delete(`/remove/${id}`)
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

export { getPopular, getById, getByIdUser, fetch, fetch_for_public, create, update, check, remove }
