import { authInstance } from './config/axios'

const loginRequest = async user => {
	const { email, password } = user
	try {
		const response = await authInstance.post(`/login`, { email, password })
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

const registerRequest = async user => {
	const { username, email, password } = user
	try {
		const response = await authInstance.post(`/register`, { username, email, password })
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

const closeRequest = async user => {
	try {
		const response = await authInstance.post(`/logout`, user)
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

const updateRequest = async (id, data) => {
	try {
		const response = await authInstance.put(`/update/${id}`, data)
		return response.data
	} catch (error) {
		throw new Error(`Error updating user info: ${error.message}`)
	}
}

const verifyTokenRequest = async () => {
	try {
		const response = await authInstance.get(`/verify`)
		return response.data
	} catch (error) {
		throw new Error(`Error verifying token: ${error.message}`)
	}
}

const renewTokenRequest = async token => {
	try {
		const response = await authInstance.post(`/renew-token`, { token })
		return response.data
	} catch (error) {
		throw new Error(`Error renewing token: ${error.message}`)
	}
}

const requestOTP = async data => {
	try {
		const response = await authInstance.post('/request-otp', data)
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

const updateUser = async data => {
	try {
		const response = await authInstance.put('/update', { data })
		return response.data
	} catch (error) {
		throw new Error(`Error updating user info: ${error.message}`)
	}
}

const validateOTP = async (email, otp) => {
	try {
		const response = await authInstance.post('/validate-otp', { email, otp })
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

const requestPasswordReset = async email => {
	try {
		const response = await authInstance.post('/request-password-reset', { email })
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

const resetPassword = async (id, token, newPassword, confirmPassword) => {
	try {
		const response = await authInstance.put(`/reset-password/${id}`, { token, newPassword, confirmPassword })
		return response.data
	} catch (error) {
		throw new Error(`${error.response.data.message}`)
	}
}

export {
	loginRequest,
	registerRequest,
	closeRequest,
	updateRequest,
	verifyTokenRequest,
	renewTokenRequest,
	updateUser,
	requestOTP,
	validateOTP,
	requestPasswordReset,
	resetPassword,
}
