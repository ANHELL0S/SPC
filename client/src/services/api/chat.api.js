import { chatInstance } from './config/axios'

export const fetch = async (senderId, receiverId) => {
	try {
		const response = await chatInstance.get(`/${senderId}/${receiverId}`)
		return response.data
	} catch (error) {
		throw new Error(`Error fetching chats: ${error.message}`)
	}
}

export const sendMessage = async data => {
	try {
		const response = await chatInstance.post('/sendMessage', data)
		return response.data
	} catch (error) {
		throw new Error(`Error send message: ${error.message}`)
	}
}

export const markAsRead = async id => {
	try {
		const response = await chatInstance.put(`/markAsRead/${id}`)
		return response.data
	} catch (error) {
		throw new Error(`Error markAsRead message: ${error.message}`)
	}
}
