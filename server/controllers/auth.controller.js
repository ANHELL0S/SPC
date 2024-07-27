import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import bcrypt, { compare } from 'bcrypt'
import { sendResetPasswordEmail, sendOTP } from '../libs/codeOPT.js'
import { createAccessToken } from '../libs/jwt.js'
import { UserModel } from '../models/users.model.js'
import { registerSchema } from '../models/validatorZod/login.scheme.js'
import { otpCodeScheme } from '../models/postgresql/schemes.js'

dotenv.config()

const login = async (req, res) => {
	try {
		const { email, password } = req.body

		console.log(email, password)

		if (!email.trim() || !password.trim())
			return res.status(400).json({ message: 'Por favor, ingresa tus credenciales.' })

		const userFound = await UserModel.findUserByEmail(email)
		if (!userFound) return res.status(401).json({ message: 'Credenciales inválidas.' })

		const isPasswordValid = await compare(password, userFound.password)
		if (!isPasswordValid) return res.status(401).json({ message: 'Credenciales inválidas.' })

		const token = await createAccessToken({
			id: userFound.id_user,
			username: userFound.username,
			type_rol: userFound.role.type_rol,
		})

		await sendOTP('login', userFound.id_user, email)

		res.cookie('token', token, {
			httpOnly: process.env.NODE_ENV === 'production',
			secure: process.env.NODE_ENV === 'production',
			sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
			expires: new Date(Date.now() + 86400 * 1000), // Expira en 1 día
			path: '/',
		})

		res.status(200).json({ message: 'Login successful', token, user: userFound })
	} catch (error) {
		console.log(error)
		return res.status(500).json({ message: error.message })
	}
}

const register = async (req, res) => {
	const { body } = req

	try {
		registerSchema.parse(body)
	} catch (error) {
		const errorMessage = error.errors.map(err => err.message).join(', ')
		return res.status(400).json({ message: errorMessage })
	}

	try {
		const existingUsername = await UserModel.findUserByUsername(body.username)
		if (existingUsername) {
			return res.status(400).json({ message: 'El nombre de usuario ya está en uso.' })
		}

		const existingEmail = await UserModel.findUserByEmail(body.email)
		if (existingEmail) {
			return res.status(400).json({ message: 'Correo electrónico ya está en uso.' })
		}

		const newUser = await UserModel.register({ input: body })
		return res.status(201).json({ message: 'Cuenta creada exitosamente.', newUser })
	} catch (error) {
		return res.status(500).json({ message: 'Error creating user' })
	}
}

const logout = async (req, res) => {
	try {
		res.clearCookie('token', { path: '/' })
		res.status(200).json({ message: 'Closed session' })
	} catch (error) {
		res.status(500).json({ error: 'An error occurred during logout' })
	}
}

const verifyToken = async (req, res, next) => {
	const { token } = req.cookies

	if (!token) {
		return res.status(401).json({ message: 'An access token is required.' })
	}

	jwt.verify(token, process.env.JWT_SECRET, async (error, data) => {
		if (error) {
			return res.status(401).json({ message: 'Invalid access token.' })
		}

		const userFound = await UserModel.getById({ id: data.id })
		if (!userFound) {
			return res.status(401).json({ message: 'User not found.' })
		}

		req.userData = data
		return res.status(200).json({ message: 'Token verified successfully.', data })
	})
}

const renewToken = async (req, res) => {
	try {
		const { token } = req.body

		if (!token) {
			return res.status(400).json({ message: 'Token is required' })
		}

		jwt.verify(token, process.env.JWT_SECRET, async (error, data) => {
			if (error) {
				return res.status(401).json({ message: 'Invalid token' })
			}

			const userFound = await UserModel.getById({ id: data.id })
			if (!userFound) {
				return res.status(404).json({ message: 'User not found' })
			}

			const newToken = await createAccessToken({
				id: userFound.id_user,
				username: userFound.username,
				type_rol: userFound.role.type_rol,
			})

			res.cookie('token', newToken, {
				httpOnly: true,
				secure: true,
				path: '/',
				sameSite: 'None',
			})

			res.status(200).json({ token: newToken })
		})
	} catch (error) {
		res.status(500).json({ message: 'Internal server error' })
	}
}

const updateUser = async (req, res) => {
	const { id, dataToUpdate } = req.body.data

	try {
		const user = await UserModel.getById({ id })
		if (!user) {
			return res.status(404).json({ message: 'Usuario no encontrado' })
		}

		const { newUsername, newEmail, newPassword, otp } = dataToUpdate

		const otpCode = await otpCodeScheme.findOne({
			where: {
				code: otp,
				id_user_fk: id,
			},
		})

		if (!otpCode) {
			return res.status(400).json({ message: 'Código OTP incorrecto o no encontrado' })
		}

		await otpCode.destroy()

		const userData = {
			username: newUsername || user.username,
			email: newEmail || user.email,
			password: newPassword ? await bcrypt.hash(newPassword, 10) : user.password,
		}

		const newdatauser = await UserModel.update({ id, input: userData })

		res.status(200).json({ message: 'Usuario actualizado', user: newdatauser })
	} catch (error) {
		res.status(500).json({ message: 'Error interno del servidor' })
	}
}

const validateOTP = async (req, res) => {
	const { email, otp } = req.body

	try {
		const user = await UserModel.findUserByEmail(email)
		if (!user) {
			return res.status(404).json({ message: 'Email no encontrado' })
		}

		const otpRecord = await otpCodeScheme.findOne({
			where: { code: otp },
		})

		if (!otpRecord) {
			return res.status(400).json({ message: 'OTP incorrecto' })
		}

		await otpRecord.destroy()

		res.status(200).json({ message: 'OTP validado correctamente' })
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

const requestOTP = async (req, res) => {
	const { email } = req.body.data

	try {
		const user = await UserModel.findUserByEmail(email)
		if (!user) {
			return res.status(404).json({ message: 'Email no encontrado' })
		}

		const idUser = user.id_user
		await sendOTP('update', idUser, email)

		res.status(200).json({ message: 'OTP enviado' })
	} catch (error) {
		res.status(500).json({ message: 'Error al solicitar OTP' })
	}
}

const requestPasswordReset = async (req, res) => {
	try {
		const { email } = req.body
		if (!email) return res.status(401).json({ message: 'Por favor, ingresa tu email actual.' })

		const user = await UserModel.findUserByEmail(email)
		if (!user) return res.status(404).json({ message: 'Email no encontrado' })

		const token = jwt.sign({ id: user.id_user }, process.env.JWT_SECRET, { expiresIn: '5m' })

		await sendResetPasswordEmail(email, token)

		res.status(200).json({ message: 'Correo enviado exitosamente.' })
	} catch (error) {
		res.status(500).json({ message: 'Error al solicitar restablecimiento de contraseña' })
	}
}

const isTokenExpired = token => {
	const arrayToken = token.split('.')
	const tokenPayload = JSON.parse(Buffer.from(arrayToken[1], 'base64').toString())
	const currentTime = Math.floor(Date.now() / 1000)
	return currentTime >= tokenPayload.exp
}

const resetPassword = async (req, res) => {
	const { id } = req.params
	const { token, newPassword, confirmPassword } = req.body

	try {
		if ((!id, !token, !newPassword, !confirmPassword))
			return res.status(400).json({ message: 'Por favor, compelta todos los campos' })

		// Verificar si el token ha expirado
		if (isTokenExpired(token)) return res.status(400).json({ message: 'El token ha expirado' })

		// Decodificar el token para obtener el ID del usuario
		const decoded = jwt.verify(token, process.env.JWT_SECRET)

		// Verificar si el ID decodificado del usuario coincide con el ID proporcionado en los parámetros
		if (decoded.id !== id) return res.status(400).json({ message: 'El ID del usuario no coincide' })

		// Buscar al usuario en la base de datos
		const user = await UserModel.getById({ id })
		if (!user) return res.status(404).json({ message: 'Usuario no encontrado' })

		// Validar que las contraseñas coincidan
		if (newPassword !== confirmPassword) return res.status(400).json({ message: 'Las contraseñas no coinciden' })

		// Generar hash para la nueva contraseña
		const hashedPassword = await bcrypt.hash(newPassword, 10)
		if (!hashedPassword) throw new Error('Error al generar el hash de la contraseña')

		// Actualizar la contraseña del usuario en la base de datos
		await UserModel.update({ id, input: { password: hashedPassword } })

		res.status(200).json({ message: 'Contraseña restablecida correctamente' })
	} catch (error) {
		if (error.name === 'TokenExpiredError') {
			return res.status(400).json({ message: 'El token ha expirado' })
		}
		return res.status(500).json({ message: 'Error al restablecer la contraseña' })
	}
}

export {
	login,
	register,
	logout,
	verifyToken,
	renewToken,
	updateUser,
	validateOTP,
	requestOTP,
	requestPasswordReset,
	resetPassword,
}
