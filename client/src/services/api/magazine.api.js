import { magazine_Instance } from './config/axios'

const getByIdMagazineRequest = async id => {
	try {
		const response = await magazine_Instance.get(`/${id}`)
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

const getAllMagazineRequest = async () => {
	try {
		const response = await magazine_Instance.get('/')
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

const createMagazineRequest = async data => {
	try {
		const response = await magazine_Instance.post('/', data)
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

const updateMagazineRequest = async (id, data) => {
	try {
		const response = await magazine_Instance.put(`/${id}`, data)
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

const deleteMagazineRequest = async id => {
	try {
		const response = await magazine_Instance.delete(`/${id}`)
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

export {
	getAllMagazineRequest,
	getByIdMagazineRequest,
	createMagazineRequest,
	updateMagazineRequest,
	deleteMagazineRequest,
}
