import { faculty_Instance } from './config/axios'

const getByIdFacultyRequest = async id => {
	try {
		const response = await faculty_Instance.get(`/${id}`)
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

const getAllFacultyRequest = async () => {
	try {
		const response = await faculty_Instance.get('/')
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

const createFacultyRequest = async data => {
	try {
		const response = await faculty_Instance.post('/', data)
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

const updateFacultyRequest = async (id, data) => {
	try {
		const response = await faculty_Instance.put(`/${id}`, data)
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

const deleteFacultyRequest = async id => {
	try {
		const response = await faculty_Instance.delete(`/${id}`)
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

export { getAllFacultyRequest, getByIdFacultyRequest, createFacultyRequest, updateFacultyRequest, deleteFacultyRequest }
