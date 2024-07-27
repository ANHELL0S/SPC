import { categoriesInstance } from './config/axios'

const count = async () => {
	try {
		const response = await categoriesInstance.get('/count')
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

const fetch = async () => {
	try {
		const response = await categoriesInstance.get('/')
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

const create = async data => {
	try {
		const response = await categoriesInstance.post('/create', data)
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

const update = async (id, data) => {
	try {
		const response = await categoriesInstance.put(`/update/${id}`, data)
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

const remove = async id => {
	try {
		const response = await categoriesInstance.delete(`/remove/${id}`)
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

const reactive = async id => {
	try {
		const response = await categoriesInstance.put(`/reactive/${id}`)
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

export { count, fetch, create, update, remove, reactive }
