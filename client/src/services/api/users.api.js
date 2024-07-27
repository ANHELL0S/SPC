import { usersInstance } from './config/axios'

const getCountUsersRequest = async () => {
	try {
		const response = await usersInstance.get('/getCount')
		return response.data
	} catch (error) {
		throw new Error(`Error fetching users: ${error.response.data.message}`)
	}
}

const getByIdUsersRequest = async id => {
	try {
		const response = await usersInstance.get(`/${id}`)
		return response.data
	} catch (error) {
		throw new Error(`Error fetching user: ${error.response.data.message}`)
	}
}

const getALlUsersRequest = async () => {
	try {
		const response = await usersInstance.get('/')
		return response.data
	} catch (error) {
		throw new Error(`Error fetching users: ${error.response.data.message}`)
	}
}

const createUsersRequest = async data => {
	try {
		const response = await usersInstance.post('/create', data)
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

const updateUsersRequest = async (id, data) => {
	try {
		const response = await usersInstance.put(`/update/${id}`, data)
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

const updateUserWithRoleRequest = async (id, data) => {
	try {
		const response = await usersInstance.put(`/updateUserWithRole/${id}`, data)
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

const updateUsernameRequest = async (id, data) => {
	try {
		const response = await usersInstance.put(`/updateUsername/${id}`, data)
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

const updateEmailRequest = async (id, data) => {
	try {
		const response = await usersInstance.put(`/updateEmail/${id}`, data)
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

const updatePasswordRequest = async (id, data) => {
	try {
		const response = await usersInstance.put(`/updatePassword/${id}`, data)
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

const removeUsersRequest = async id => {
	try {
		const response = await usersInstance.delete(`/remove/${id}`)
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

const reactiveUsersRequest = async id => {
	try {
		const response = await usersInstance.put(`/reactive/${id}`)
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

export {
	getCountUsersRequest,
	getByIdUsersRequest,
	getALlUsersRequest,
	createUsersRequest,
	updateEmailRequest,
	updateUsersRequest,
	updateUserWithRoleRequest,
	updateUsernameRequest,
	updatePasswordRequest,
	removeUsersRequest,
	reactiveUsersRequest,
}
