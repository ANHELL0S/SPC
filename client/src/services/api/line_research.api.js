import { line_research_Instance } from './config/axios'

const getByIdLineResearchRequest = async id => {
	try {
		const response = await line_research_Instance.get(`/${id}`)
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

const getAllLineResearchRequest = async () => {
	try {
		const response = await line_research_Instance.get('/')
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

const createLineResearchRequest = async data => {
	try {
		const response = await line_research_Instance.post('/', data)
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

const updateLineResearchRequest = async (id, data) => {
	try {
		const response = await line_research_Instance.put(`/${id}`, data)
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

const deleteLineResearchRequest = async id => {
	try {
		const response = await line_research_Instance.delete(`/${id}`)
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

export {
	getAllLineResearchRequest,
	getByIdLineResearchRequest,
	createLineResearchRequest,
	updateLineResearchRequest,
	deleteLineResearchRequest,
}
