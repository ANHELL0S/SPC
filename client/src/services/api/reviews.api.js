import { reviewInstance } from './config/axios'

const fetch = async () => {
	try {
		const response = await reviewInstance.get('/')
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

const get_approved = async id => {
	try {
		const response = await reviewInstance.get(`/approved/${id}`)
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

const get_pending = async id => {
	try {
		const response = await reviewInstance.get(`/pending/${id}`)
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

const create = async data => {
	try {
		const response = await reviewInstance.post('/create', data)
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

const update = async (id, data) => {
	try {
		const response = await reviewInstance.put(`/update/${id}`, data)
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

const check_review = async id => {
	try {
		const response = await reviewInstance.put(`/check/${id}`)
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

const uncheck_review = async id => {
	try {
		const response = await reviewInstance.put(`/uncheck/${id}`)
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

const remove = async id => {
	try {
		const response = await reviewInstance.delete(`/remove/${id}`)
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

export { get_approved, get_pending, fetch, create, update, check_review, uncheck_review, remove }
