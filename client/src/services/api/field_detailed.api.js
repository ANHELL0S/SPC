import { field_detailed_Instance } from './config/axios'

const getById_field_detailed_Request = async id => {
	try {
		const response = await field_detailed_Instance.get(`/${id}`)
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

const getAll_field_detailed_Request = async () => {
	try {
		const response = await field_detailed_Instance.get('/')
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

const createField_detailedRequest = async data => {
	try {
		const response = await field_detailed_Instance.post('/', data)
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

const update_field_detailed_Request = async (id, data) => {
	try {
		const response = await field_detailed_Instance.put(`/${id}`, data)
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

const delete_field_detailed_Request = async id => {
	try {
		const response = await field_detailed_Instance.delete(`/${id}`)
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

export {
	createField_detailedRequest,
	getAll_field_detailed_Request,
	getById_field_detailed_Request,
	update_field_detailed_Request,
	delete_field_detailed_Request,
}
