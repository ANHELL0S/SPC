import { collection_article_Instance } from './config/axios'

const fetch = async () => {
	try {
		const response = await collection_article_Instance.get('/')
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

const getById = async id => {
	try {
		const response = await collection_article_Instance.get(`/${id}`)
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

const create = async data => {
	try {
		const response = await collection_article_Instance.post('/create', data)
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

const remove = async id => {
	try {
		const response = await collection_article_Instance.delete(`/remove/${id}`)
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

export { getById, fetch, create, remove }
