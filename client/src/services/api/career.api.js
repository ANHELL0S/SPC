import { career_Instance } from './config/axios'

const getByIdCareerRequest = async id => {
	try {
		const response = await career_Instance.get(`/${id}`)
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

const getAllCareerRequest = async () => {
	try {
		const response = await career_Instance.get('/')
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

const createCareerRequest = async data => {
	try {
		const response = await career_Instance.post('/', data)
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

const updateCareerRequest = async (id, data) => {
	try {
		const response = await career_Instance.put(`/${id}`, data)
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

const deleteCareerRequest = async id => {
	try {
		const response = await career_Instance.delete(`/${id}`)
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

export { getAllCareerRequest, getByIdCareerRequest, createCareerRequest, updateCareerRequest, deleteCareerRequest }
