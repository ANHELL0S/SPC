import { field_wide_Instance } from './config/axios'

const getById_field_wide_Request = async id => {
	try {
		const response = await field_wide_Instance.get(`/${id}`)
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

const getAll_field_wide_Request = async () => {
	try {
		const response = await field_wide_Instance.get('/')
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

const createField_wideRequest = async data => {
	try {
		const response = await field_wide_Instance.post('/', data)
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

const update_field_wide_Request = async (id, data) => {
	try {
		const response = await field_wide_Instance.put(`/${id}`, data)
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

const delete_field_wide_Request = async id => {
	try {
		const response = await field_wide_Instance.delete(`/${id}`)
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

export {
	createField_wideRequest,
	getAll_field_wide_Request,
	getById_field_wide_Request,
	update_field_wide_Request,
	delete_field_wide_Request,
}
