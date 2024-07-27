import bcrypt from 'bcrypt'
import { userScheme, rolScheme, relaction_user_facultyScheme, facultyScheme } from './postgresql/schemes.js'

export class UserModel {
	static async getAll() {
		try {
			const allUsers = await userScheme.findAll({
				include: [
					{
						model: rolScheme,
						attributes: ['type_rol'],
					},
					{
						model: relaction_user_facultyScheme,
						include: [
							{
								model: facultyScheme,
								attributes: ['name'],
							},
						],
					},
				],
				order: [['updatedAt', 'DESC']],
			})
			return allUsers
		} catch (error) {
			throw new Error('Error fetching users with roles and faculties: ' + error.message)
		}
	}

	static async getById({ id }) {
		try {
			const user = await userScheme.findByPk(id, {
				include: [
					{
						model: rolScheme,
						attributes: ['type_rol'],
					},
				],
			})

			return user
		} catch (error) {
			throw new Error('Error fetching user by id: ' + error.message)
		}
	}

	static async getUserRoleType({ id }) {
		try {
			const user = await userScheme.findByPk(id, {
				include: [
					{
						model: rolScheme,
						attributes: ['type_rol'],
					},
				],
			})

			return user.roles.type_rol
		} catch (error) {
			throw new Error('Error fetching user role type: ' + error.message)
		}
	}

	static async createUser(newData) {
		try {
			const user = await userScheme.create(newData)
			rolScheme.create({ id_user_fk: user.id_user })
			await relaction_user_facultyScheme.create({ id_user_fk: user.id_user, id_faculty_fk: newData.id_faculty })
			return { user }
		} catch (error) {
			throw new Error(error)
		}
	}

	static async register({ input }) {
		const { username, email, password } = input

		try {
			// Encrypt the password
			const hashedPassword = await bcrypt.hash(password, 10)

			// Create the user
			const user = await userScheme.create({
				username,
				email,
				password: hashedPassword,
			})

			// Create and assign the role to the user
			const role = await rolScheme.create({ id_user_fk: user.id_user, type_rol: 'general' })

			// Create and assign the realtion user to the faculty
			await rolScheme.create({ id_user_fk: user.id_user, id_faculty_fk: input.id_faculty })

			return { user, role }
		} catch (error) {
			throw new Error('Error creating user: ' + error.message)
		}
	}

	static async update({ id, input }) {
		try {
			const user = await userScheme.findByPk(id)
			await user.update(input)
			return user
		} catch (error) {
			throw new Error('Error updating user: ' + error.message)
		}
	}

	static async updateUserRole({ id, newData }) {
		try {
			const user = await userScheme.findByPk(id)

			// Update user details
			await user.update(newData)

			// Update user role if provided
			if (newData.role) {
				const userRole = await rolScheme.findOne({ where: { id_user_fk: id } })
				if (userRole) {
					await userRole.update({ type_rol: newData.role })
				} else {
					await rolScheme.create({ id_user_fk: id, type_rol: newData.role })
				}
			}

			// Update faculty if provided
			if (newData.faculty) {
				// Assuming you have a method to update faculty association
				await relaction_user_facultyScheme.update({ id_faculty_fk: newData.faculty }, { where: { id_user_fk: id } })
			}

			return user
		} catch (error) {
			throw new Error('Error updating user: ' + error.message)
		}
	}

	static async delete({ id, reactivate = false }) {
		try {
			const user = await userScheme.findByPk(id)

			if (reactivate) {
				user.active = true
			} else {
				user.active = false
			}

			await user.save()

			return true
		} catch (error) {
			throw new Error('Error deleting user')
		}
	}

	static async reactive({ id, reactivate = false }) {
		try {
			const user = await userScheme.findByPk(id)

			if (!user) {
				throw new Error('User not found')
			}

			if (reactivate) {
				user.active = false
			} else {
				user.active = true
			}

			await user.save()

			return true
		} catch (error) {
			throw new Error('Error deleting user')
		}
	}

	static async findUserByEmail(email) {
		try {
			const user = await userScheme.findOne({
				where: { email },
				include: { model: rolScheme, attributes: ['type_rol'] },
			})

			return user
		} catch (error) {
			throw new Error('Error finding user by email')
		}
	}

	static async findUserByIdentification_card(identification_card) {
		try {
			const user = await userScheme.findOne({
				where: { identification_card },
				include: { model: rolScheme, attributes: ['type_rol'] },
			})
			return user
		} catch (error) {
			throw new Error('Error finding user by identification_card')
		}
	}

	static async findUserByUsername(username) {
		try {
			const user = await userScheme.findOne({ where: { username } })
			if (!user) {
				return null
			}
			return user.name
		} catch (error) {
			throw new Error('Error finding user by username')
		}
	}

	static async findUsername(username) {
		try {
			const user = await userScheme.findOne({ where: { username } })
			return user
		} catch (error) {
			throw new Error('Error finding category by name')
		}
	}

	static async findEmail(email) {
		try {
			const user = await userScheme.findOne({ where: { email } })
			return user
		} catch (error) {
			throw new Error('Error finding user by username')
		}
	}

	static async findNameById({ id }) {
		try {
			const user = await userScheme.findByPk(id)
			return user.username
		} catch (error) {
			throw new Error('Error finding user name by ID: ' + error.message)
		}
	}

	static async decryptPassword(ciphertextPassword, originalPassword) {
		try {
			const match = await bcrypt.compare(originalPassword, ciphertextPassword)
			return match
		} catch (error) {
			throw new Error('Error decrypting password: ' + error.message)
		}
	}
}

// Asegurarse de que el nombre de tu modelo sea correcto
userScheme.afterSync(async () => {
	try {
		// Verificar si ya existe algún usuario
		const existingUser = await userScheme.findOne()
		if (!existingUser) {
			// Hashear la contraseña por defecto
			const hashedPassword = await bcrypt.hash('Admin1@gmail.com', 10)
			// Crear un usuario por defecto
			const userAdmin = await userScheme.create({
				username: 'Administrador',
				email: 'admin@gmail.com',
				password: hashedPassword,
			})
		}
	} catch (error) {
		console.error('Error al insertar el usuario por defecto:', error)
	}
})

// Asegurarse de que el nombre de tu modelo sea correcto
rolScheme.afterSync(async () => {
	try {
		// Verificar si ya existe algún rol
		const existingRole = await rolScheme.findOne({ where: { type_rol: 'admin' } })
		if (!existingRole) {
			// Buscar el usuario por defecto
			const userAdmin = await userScheme.findOne({ where: { email: 'admin@gmail.com' } })
			if (userAdmin) {
				// Crear un rol por defecto para el nuevo usuario
				await rolScheme.create({ type_rol: 'admin', id_user_fk: userAdmin.id_user })
			}
		}
	} catch (error) {
		console.error('Error al insertar el rol por defecto:', error)
	}
})
