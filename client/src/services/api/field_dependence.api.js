import { field_dependence_Instance } from './config/axios'

const getById_field_dependence_Request = async id => {
	try {
		const response = await field_dependence_Instance.get(`/${id}`)
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

const getAll_field_dependence_Request = async () => {
	try {
		const response = await field_dependence_Instance.get('/')
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

const createField_dependenceRequest = async data => {
	try {
		const response = await field_dependence_Instance.post('/', data)
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

const update_field_dependence_Request = async (id, data) => {
	try {
		const response = await field_dependence_Instance.put(`/${id}`, data)
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

const delete_field_dependence_Request = async id => {
	try {
		const response = await field_dependence_Instance.delete(`/${id}`)
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

export {
	createField_dependenceRequest,
	getAll_field_dependence_Request,
	getById_field_dependence_Request,
	update_field_dependence_Request,
	delete_field_dependence_Request,
}
