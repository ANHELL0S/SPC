import { field_specific_Instance } from './config/axios'

const getById_field_specific_Request = async id => {
	try {
		const response = await field_specific_Instance.get(`/${id}`)
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

const getAll_field_specific_Request = async () => {
	try {
		const response = await field_specific_Instance.get('/')
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

const createField_specificRequest = async data => {
	try {
		const response = await field_specific_Instance.post('/', data)
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

const update_field_specific_Request = async (id, data) => {
	try {
		const response = await field_specific_Instance.put(`/${id}`, data)
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

const delete_field_specific_Request = async id => {
	try {
		const response = await field_specific_Instance.delete(`/${id}`)
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

export {
	createField_specificRequest,
	getAll_field_specific_Request,
	getById_field_specific_Request,
	update_field_specific_Request,
	delete_field_specific_Request,
}
