import { dbIndex_Instance } from './config/axios'

const getByIdDBIndexRequest = async id => {
	try {
		const response = await dbIndex_Instance.get(`/${id}`)
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

const getAllDBIndexRequest = async () => {
	try {
		const response = await dbIndex_Instance.get('/')
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

const createDBIndexRequest = async data => {
	try {
		const response = await dbIndex_Instance.post('/', data)
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

const updateDBIndexRequest = async (id, data) => {
	try {
		const response = await dbIndex_Instance.put(`/${id}`, data)
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

const deleteDBIndexRequest = async id => {
	try {
		const response = await dbIndex_Instance.delete(`/${id}`)
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

export { getAllDBIndexRequest, getByIdDBIndexRequest, createDBIndexRequest, updateDBIndexRequest, deleteDBIndexRequest }
