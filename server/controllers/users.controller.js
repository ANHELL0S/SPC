import { z } from 'zod'
import bcrypt from 'bcrypt'
import { sendOTP } from '../libs/codeOPT.js'
import { UserModel } from '../models/users.model.js'
import { ArticleModel } from '../models/article.model.js'
import { articleScheme, movementScheme } from '../models/postgresql/schemes.js'
import {
	createUsersSchema,
	updateUsersSchema,
	updateUsersWithRoleSchema,
} from '../models/validatorZod/crudUsers.schema.js'

async function getById(req, res) {
	const { id } = req.params

	try {
		const user = await UserModel.getById({ id })
		if (!user) return res.status(404).json({ Message: 'User not found' })
		res.json(user)
	} catch (error) {
		res.status(500).json({ message: '¡Ops! Ha ocurrido un error. Por favor, inténtalo de nuevo.' })
	}
}

async function getCount(req, res) {
	try {
		const users = await UserModel.getAll()
		res.json(users.length)
	} catch (error) {
		res.status(500).json({ message: '¡Ops! Ha ocurrido un error. Por favor, inténtalo de nuevo.' })
	}
}

async function getAll(req, res) {
	try {
		const users = await UserModel.getAll()

		// Create an array of promises to fetch article counts for each user
		const userPromises = users.map(async user => {
			const faculties = user.relaction_user_faculties
				.filter(rel => rel && rel.faculty) // Filter out null relations or without faculty
				.map(rel => rel.faculty.name)

			// Fetch the number of articles for the user
			const articles = await ArticleModel.findAllByUserId(user.id_user)
			const articleCount = articles.length

			return {
				id_user: user.id_user,
				active: user.active,
				username: user.username,
				email: user.email,
				phone: user.phone,
				identification_card: user.identification_card,
				dedication: user.dedication,
				gender: user.gender,
				filiation: user.filiation,
				employmentRelationship: user.employmentRelationship,
				password: user.password,
				createdAt: user.createdAt,
				updatedAt: user.updatedAt,
				role: user.role,
				faculty: {
					name: faculties.length ? faculties[0] : null,
				},
				articleCount: articleCount, // Add article count here
			}
		})

		// Wait for all promises to resolve
		const formattedUsers = await Promise.all(userPromises)

		res.json(formattedUsers)
	} catch (error) {
		res.status(500).json({ message: '¡Ops! Ha ocurrido un error. Por favor, inténtalo de nuevo.' })
	}
}

async function create(req, res) {
	const { body } = req

	try {
		// Parsear los datos del cuerpo de la solicitud utilizando el esquema de Zod
		const userData = createUsersSchema.parse(body)

		// Verificar si el correo electrónico ya existen
		const existingEmail = await UserModel.findUserByEmail(userData.email)
		if (existingEmail) return res.status(400).json({ message: 'El correo electrónico ya está en uso.' })

		// Verificar si el nombre de usuario ya existen
		const existingUsername = await UserModel.findUserByUsername(userData.username)
		if (existingUsername) return res.status(400).json({ message: 'El nombre de usuario ya está en uso.' })

		// Verificar si la cedula ya existen
		const existingIdentification_card = await UserModel.findUserByIdentification_card(userData.identification_card)
		if (existingIdentification_card) return res.status(400).json({ message: 'El número de cédula ya está en uso.' })

		// Extraer la primera palabra del nombre de usuario
		const usernameFirstWord = userData.username.split(' ')[0].toLowerCase()
		// Extraer los últimos cinco dígitos de la cédula de identificación
		const identificationLastFive = userData.identification_card.slice(-5)
		// Crear la cadena para la contraseña
		const passwordString = `${usernameFirstWord}@${identificationLastFive}`
		// Cifrar la contraseña antes de guardarla en la base de datos
		const hashedPassword = await bcrypt.hash(passwordString, 10)

		// Crear el nuevo usuario
		const newData = {
			username: userData.username,
			email: userData.email,
			phone: userData.phone,
			identification_card: userData.identification_card,
			dedication: userData.dedication,
			gender: userData.gender,
			filiation: userData.filiation,
			employmentRelationship: userData.employmentRelationship,
			id_faculty: userData.faculty,
			password: hashedPassword,
		}

		const newUser = await UserModel.createUser(newData)

		await movementScheme.create({
			action: `Creaste al usuario ${userData.username}`,
			targetType: 'usuarios',
			targetId: newUser.user.id_user,
			id_user_fk: req.user.id,
		})

		res.status(200).json({
			message: `Creaste al usuario ${newUser.username} existosamente.`,
		})
	} catch (error) {
		res.status(500).json({ message: '¡Ops! Ha ocurrido un error. Por favor, inténtalo de nuevo.' })
	}
}

async function update(req, res) {
	const { id } = req.params
	const { body } = req

	try {
		// Parsear los datos del cuerpo de la solicitud utilizando el esquema de Zod
		const userData = updateUsersSchema.parse(body)

		// Obtener el usuario antes de la actualización
		const beforeUpdate = await UserModel.getById({ id })
		if (!beforeUpdate) return res.status(404).json({ message: 'Usuario no encontrado.' })

		const { username: previousName, email: previousEmail } = beforeUpdate

		// Verificar si el nuevo username es igual al username actual y si el nuevo email es igual al email actual
		if (body.username === beforeUpdate.username && body.email === beforeUpdate.email)
			return res.status(201).json({ message: 'Nombre de usuario y email actuales sin cambios.' })

		// Verificar si el nuevo username ya está en uso por otro usuario
		const existingUsername = await UserModel.findUsername(body.username)
		if (existingUsername && existingUsername.id_user !== id)
			return res.status(400).json({ message: 'El nuevo nombre de usuario ya está en uso por otro usuario.' })

		// Verificar si el nuevo email ya está en uso por otro usuario
		const existingEmail = await UserModel.findEmail(body.email)
		if (existingEmail && existingEmail.id_user !== id)
			return res.status(400).json({ message: 'El nuevo email ya está en uso por otro usuario.' })

		// Actualizar el usuario
		await UserModel.update({ id, input: userData })

		// Obtener el usuario después de la actualización
		const afterUpdate = await UserModel.getById({ id })
		const { username: currentName, email: currentEmail } = afterUpdate

		// Crear un mensaje de acción para el registro de movimiento
		let actionMessage = ''
		if (previousName !== currentName && previousEmail !== currentEmail) {
			actionMessage = `Cambiaste el nombre de usuario de ${previousName} a ${currentName} y el correo electrónico de ${previousEmail} a ${currentEmail}.`
		} else if (previousName !== currentName) {
			actionMessage = `Cambiaste el nombre de usuario de ${previousName} a ${currentName}.`
		} else if (previousEmail !== currentEmail) {
			actionMessage = `Cambiaste el correo electrónico de ${currentName} de ${previousEmail} a ${currentEmail}.`
		}

		// Crear el registro de movimiento si hay un cambio
		if (actionMessage) {
			await movementScheme.create({
				action: actionMessage,
				targetType: 'usuarios',
				targetId: id,
				id_user_fk: req.user.id,
			})
		}

		res.status(200).json({ message: `Datos actualizados existosamente.` })
	} catch (error) {
		if (error instanceof z.ZodError) {
			const errorMessages = error.errors.map(err => err.message).join('\n')
			return res.status(400).json({ message: errorMessages })
		}

		res.status(500).json({ message: '¡Ops! Ha ocurrido un error. Por favor, inténtalo de nuevo.' })
	}
}

async function updateUserWithRole(req, res) {
	const { id } = req.params
	const { body } = req

	try {
		// Parse the request body using the Zod schema
		const userData = updateUsersWithRoleSchema.parse(body)

		// Get the user before the update
		const beforeUpdate = await UserModel.getById({ id })
		if (!beforeUpdate) return res.status(404).json({ message: 'Usuario no encontrado.' })

		if (!beforeUpdate.role) {
			return res.status(400).json({ message: 'El usuario no tiene un rol asociado.' })
		}

		const {
			username: previousName,
			email: previousEmail,
			role: {
				dataValues: { type_rol: previousRole },
			},
		} = beforeUpdate

		// Check if the new username, email, and role are the same as the current ones
		if (body.username === previousName && body.email === previousEmail && body.rol === previousRole)
			return res.status(201).json({ message: 'Nombre de usuario, email y rol actuales sin cambios.' })

		// Check if the new username is already in use by another user
		const existingUsername = await UserModel.findUsername(body.username)
		if (existingUsername && existingUsername.id_user !== id)
			return res.status(400).json({ message: 'El nuevo nombre de usuario ya está en uso por otro usuario.' })

		// Check if the new email is already in use by another user
		const existingEmail = await UserModel.findEmail(body.email)
		if (existingEmail && existingEmail.id_user !== id)
			return res.status(400).json({ message: 'El nuevo email ya está en uso por otro usuario.' })

		// Update the user and the role
		await UserModel.updateUserRole({ id, newData: userData })

		// Get the user after the update
		const afterUpdate = await UserModel.getById({ id })
		if (!afterUpdate.role) {
			return res.status(500).json({ message: 'Error al obtener el rol del usuario después de la actualización.' })
		}

		const {
			username: currentName,
			email: currentEmail,
			role: {
				dataValues: { type_rol: currentRole },
			},
		} = afterUpdate

		// Create an action message for the movement log
		let actionMessage = ''
		if (previousName !== currentName && previousEmail !== currentEmail && previousRole !== currentRole) {
			actionMessage = `Cambiaste el nombre de usuario de ${previousName} a ${currentName}, el correo electrónico de ${previousEmail} a ${currentEmail} y el rol de ${previousRole} a ${currentRole}.`
		} else if (previousName !== currentName) {
			actionMessage = `Cambiaste el nombre de usuario de ${previousName} a ${currentName}.`
		} else if (previousEmail !== currentEmail) {
			actionMessage = `Cambiaste el correo electrónico de ${previousEmail} a ${currentEmail}.`
		} else if (previousRole !== currentRole) {
			actionMessage = `Cambiaste el rol de ${previousRole} a ${currentRole}.`
		}

		// Create the movement log if there is a change
		if (actionMessage) {
			await movementScheme.create({
				action: actionMessage,
				targetType: 'usuarios',
				targetId: id,
				id_user_fk: req.user.id,
			})
		}

		res.status(200).json({ message: `Datos actualizados existosamente.` })
	} catch (error) {
		if (error instanceof z.ZodError) {
			const errorMessages = error.errors.map(err => err.message).join('\n')
			return res.status(400).json({ message: errorMessages })
		}

		res.status(500).json({ message: '¡Ops! Ha ocurrido un error. Por favor, inténtalo de nuevo.' })
	}
}

async function updateUsername(req, res) {
	const { id } = req.params
	const { username } = req.body

	try {
		// Verificar si el nombre de usuario ya está en uso
		const existingUser = await UserModel.findUserByUsername(username)
		if (existingUser) return res.status(400).json({ message: 'Username is already in use' })

		// Obtener el nombre de usuario anterior del usuario
		const beforeUpdate = await UserModel.getById({ id })
		const previousName = beforeUpdate.username

		// Actualizar el nombre de usuario
		const updatedUser = await UserModel.update({ id, input: { username } })

		// Obtener el nuevo nombre de usuario del usuario actualizado
		const afterUpdate = await UserModel.getById({ id })
		const currentName = afterUpdate.username

		if (updatedUser) {
			await movementScheme.create({
				action: `Cambiaste tu nombre de usuario de ${previousName} a ${currentName}`,
				targetType: 'usuarios',
				targetId: id,
				id_user_fk: req.user.id,
			})

			return res.status(200).json({ message: 'Nombre de usuario actualizado.' })
		} else {
			throw res.status(404).json({ message: 'User not found' })
		}
	} catch (error) {
		res.status(500).json({ message: '¡Ops! Ha ocurrido un error. Por favor, inténtalo de nuevo.' })
	}
}

async function updateEmail(req, res) {
	const { id } = req.params
	const { email } = req.body

	try {
		res.json(updatedUser)

		// Verificar si el correo electrónico ya está en uso
		const existingUserWithEmail = await UserModel.findUserByEmail(email)
		if (existingUserWithEmail) return res.status(400).json({ message: 'Email is already in use' })

		// Obtener el correo electrónico anterior del usuario
		const beforeUpdate = await UserModel.getById({ id })
		const previousEmail = beforeUpdate.email

		// Actualizar el correo electrónico
		const updatedUser = await UserModel.update({ id, input: { email } })

		// Obtener el nuevo correo electrónico del usuario actualizado
		const afterUpdate = await UserModel.getById({ id })
		const currentEmail = afterUpdate.email

		if (updatedUser) {
			// Enviar el código OTP al nuevo correo electrónico
			const sentcode = sendOTP(id, email) // Se debe enviar al nuevo correo electrónico

			if (!sentcode) return res.status(400).json({ message: 'Error sending code OTP' })

			await movementScheme.create({
				action: `Cambiaste tu correo electrónico de ${previousEmail} a ${currentEmail}`,
				targetType: 'usuarios',
				targetId: id,
				id_user_fk: req.user.id,
			})

			return res.status(200).json({ message: 'Email actualizado.' })
		} else {
			throw res.status(404).json({ message: 'Error update email' })
		}
	} catch (error) {
		res.status(500).json({ message: '¡Ops! Ha ocurrido un error. Por favor, inténtalo de nuevo.' })
	}
}

async function updatePassword(req, res) {
	const { id } = req.params
	const { currentPassword, newPassword, confirmPassword } = req.body

	const passwordSchema = z
		.string()
		.min(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
		.regex(/[A-Z]/, { message: 'La contraseña debe contener al menos una letra mayúscula' })
		.regex(/[0-9]/, { message: 'La contraseña debe contener al menos un número' })
		.regex(/[^a-zA-Z0-9]/, { message: 'La contraseña debe contener al menos un carácter especial' })

	// Verificar si los campos están vacíos
	if (!currentPassword || !newPassword || !confirmPassword)
		return res.status(400).json({ message: 'Por favor, completa todos los campos' })

	// Validar las nuevas contraseñas con Zod
	try {
		passwordSchema.parse(newPassword)
		passwordSchema.parse(confirmPassword)
	} catch (e) {
		return res.status(400).json({ message: e.errors.map(error => error.message).join(', ') })
	}

	try {
		// Obtener la contraseña cifrada del usuario desde la base de datos
		const user = await UserModel.getById({ id })

		// Verificar si se encontró el usuario
		if (!user) return res.status(404).json({ message: 'Usuario no encontrado' })

		// Comparar la contraseña actual proporcionada con la contraseña almacenada en la base de datos
		bcrypt.compare(currentPassword, user.password, async (err, match) => {
			if (err) return res.status(500).json({ message: 'Error interno del servidor' })

			if (match) {
				if (newPassword === confirmPassword) {
					const hashedPassword = await bcrypt.hash(newPassword, 10)

					// Actualizar la contraseña en la base de datos
					await UserModel.update({ id, input: { password: hashedPassword } })

					// Crear registro de movimiento
					let actionText = ''
					if (user.role.type_rol === 'admin') {
						actionText = `Has cambiado tu contraseña`
					} else {
						actionText = `El usuario ${user.username} ha cambiado su contraseña`
					}

					await movementScheme.create({
						action: actionText,
						targetType: 'usuarios',
						targetId: id,
						id_user_fk: req.user.id,
					})

					return res.status(200).json({ message: 'Contraseña actualizada exitosamente' })
				} else {
					return res.status(400).json({ message: 'Las nuevas contraseñas no coinciden' })
				}
			} else {
				return res.status(401).json({ message: 'Contraseña actual inválida' })
			}
		})
	} catch (error) {
		res.status(500).json({ message: '¡Ops! Ha ocurrido un error. Por favor, inténtalo de nuevo.' })
	}
}

async function remove(req, res) {
	const { id } = req.params

	try {
		const deletedUser = await UserModel.delete({ id })
		if (!deletedUser) throw res.status(404).json({ message: 'User not found' })

		const name = await UserModel.findNameById({ id })
		await movementScheme.create({
			action: `Removiste al usuario ${name}`,
			targetType: 'usuarios',
			targetId: id,
			id_user_fk: req.user.id,
		})

		res.status(201).json({ message: `Removiste al usuario ${name} existosamente.` })
	} catch (error) {
		res.status(500).json({ message: '¡Ops! Ha ocurrido un error. Por favor, inténtalo de nuevo.' })
	}
}

async function reactive(req, res) {
	const { id } = req.params

	try {
		await UserModel.reactive({ id })

		const name = await UserModel.findNameById({ id })
		await movementScheme.create({
			action: `Reactivaste al usuario ${name}`,
			targetType: 'usuarios',
			targetId: id,
			id_user_fk: req.user.id,
		})

		res.status(201).json({ message: `Reactivaste al usuario ${name} existosamente.` })
	} catch (error) {
		res.status(500).json({ message: '¡Ops! Ha ocurrido un error. Por favor, inténtalo de nuevo.' })
	}
}

export {
	getById,
	getCount,
	getAll,
	create,
	update,
	updateUserWithRole,
	updateUsername,
	updateEmail,
	updatePassword,
	remove,
	reactive,
}
