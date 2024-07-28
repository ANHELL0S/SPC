import { parameter_Instance } from './config/axios'

const fetch = async () => {
	try {
		const response = await parameter_Instance.get('/')
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

const create = async data => {
	try {
		const response = await parameter_Instance.post('/create', data)
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

const update = async (id, data) => {
	try {
		const response = await parameter_Instance.put(`/update/${id}`, data)
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

const remove = async id => {
	try {
		const response = await parameter_Instance.delete(`/remove/${id}`)
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

const reactive = async id => {
	try {
		const response = await parameter_Instance.put(`/reactive/${id}`)
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}
export { fetch, create, update, remove, reactive }
