import { facultyModel } from '../models/faculty.model.js'
import { sendResponse } from '../helpers/responseHelpers.js'
import { relaction_user_facultyScheme, articleScheme } from '../models/postgresql/schemes.js'
import sequelize from 'sequelize'

const handleError = (res, error) => {
	return sendResponse(res, 500, '¡Ops! Ha ocurrido un error. Por favor, inténtalo de nuevo.')
}

export const facultyController = {
	async getAllFaculty(req, res) {
		try {
			const allFaculty = await facultyModel.getAll()

			// Obtener los artículos
			const articles = await articleScheme.findAll()

			// Obtener el número de artículos por usuario
			const articlesCountByUser = await articleScheme.findAll({
				attributes: ['manager', [sequelize.fn('count', sequelize.col('id_article')), 'articleCount']],
				group: ['manager'],
			})

			// Mapear para incluir el número total de artículos por usuario
			const userArticleCounts = {}
			articlesCountByUser.forEach(articleCount => {
				userArticleCounts[articleCount.manager] = articleCount.get('articleCount')
			})

			// Mapear para incluir el número total de usuarios por facultad y sumar los artículos
			const facultyWithArticlesCount = await Promise.all(
				allFaculty.map(async faculty => {
					const usersInFaculty = await relaction_user_facultyScheme.findAll({
						where: { id_faculty_fk: faculty.id_faculty },
						attributes: ['id_user_fk'],
					})

					let totalArticles = 0
					usersInFaculty.forEach(user => {
						const userId = user.id_user_fk
						// Sumar solo los artículos gestionados por este usuario
						const articlesManagedByUser = articles.filter(article => article.manager === userId)
						totalArticles += articlesManagedByUser.length
					})

					return {
						...faculty.toJSON(),
						usersCount: usersInFaculty.length,
						totalArticles: Number(totalArticles),
					}
				})
			)

			res.json(facultyWithArticlesCount)
		} catch (error) {
			handleError(res, error)
		}
	},

	async getFacultyById(req, res) {
		try {
			const { id } = req.params
			const faculty = await Promise.all([facultyModel.getById(id)])
			if (!faculty) return sendResponse(res, 404, 'Facultad no encontrada.')

			return sendResponse(res, 200, 'Facultad obtenida exitosamente.', faculty)
		} catch (error) {
			handleError(res, error)
		}
	},

	async createFaculty(req, res) {
		try {
			const data = req.body

			// Validación temprana de campos requeridos
			if (!data.name) return sendResponse(res, 400, 'Por favor, completa todos los campos.')

			// Verificar si la facultad ya existe de manera asíncrona
			const existingFaculty = await facultyModel.getByName(data.name)

			// Si existe una facultad con el mismo nombre, devolver un error
			if (existingFaculty) return sendResponse(res, 400, 'Ya existe una facultad con ese nombre.')

			// Crear la facultad si no existe
			const faculty = await facultyModel.create(data)

			return sendResponse(res, 200, 'Facultad creada exitosamente.', faculty)
		} catch (error) {
			handleError(res, error)
		}
	},

	async updateFaculty(req, res) {
		try {
			const { id } = req.params
			const data = req.body

			// Validación temprana de campos requeridos
			if (!data.name) return sendResponse(res, 400, 'Por favor, completa todos los campos.')

			// Obtener la facultad actual por ID
			const currentFaculty = await facultyModel.getById(id)

			// Verificar si la facultad ya existe por el nuevo nombre (excepto la actual)
			if (data.name !== currentFaculty.name) {
				const existingFaculty = await facultyModel.getByName(data.name)
				if (existingFaculty) return sendResponse(res, 400, 'Ya existe una facultad con ese nombre.')
			}

			// Actualizar la facultad
			const updatedFaculty = await facultyModel.update(id, data)

			return sendResponse(res, 200, 'Facultad actualizada exitosamente.', updatedFaculty)
		} catch (error) {
			console.log(error)
			handleError(res, error)
		}
	},

	async deleteFaculty(req, res) {
		try {
			const { id } = req.params

			// Check if faculty exists
			const existingFaculty = await facultyModel.getById(id)
			if (!existingFaculty) return sendResponse(res, 404, 'Facultad no encontrada.')

			await facultyModel.delete(id)
			return sendResponse(res, 204, 'Facultad eliminada exitosamente.')
		} catch (error) {
			return handleError(res, error)
		}
	},
}
