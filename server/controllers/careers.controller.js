import { careerModel } from '../models/careers.model.js'
import { sendResponse } from '../helpers/responseHelpers.js'
import { articleScheme, relation_career_article_Scheme } from '../models/postgresql/schemes.js'
import sequelize from 'sequelize'

const handleError = (res, error) => {
	return sendResponse(res, 500, '¡Ops! Ha ocurrido un error. Por favor, inténtalo de nuevo.')
}

export const careerController = {
	async getAllCareer(req, res) {
		try {
			// Obtener todas las carreras
			const allCareers = await careerModel.getAll()

			// Obtener todos los artículos
			const articles = await articleScheme.findAll()

			// Contar el número de artículos por carrera
			const articlesCountByCareer = await relation_career_article_Scheme.findAll({
				attributes: ['id_career_fk', [sequelize.fn('count', sequelize.col('id_article_fk')), 'articleCount']],
				group: ['id_career_fk'],
			})

			// Mapear para incluir el número total de artículos por carrera
			const careerArticleCounts = {}
			articlesCountByCareer.forEach(articleCount => {
				careerArticleCounts[articleCount.id_career_fk] = articleCount.get('articleCount')
			})

			// Mapear para incluir el número total de artículos por carrera
			const careerWithArticlesCount = await Promise.all(
				allCareers.map(async career => {
					// Obtener el número de artículos para esta carrera
					const totalArticles = careerArticleCounts[career.id_career] || 0

					return {
						...career.toJSON(),
						totalArticles: Number(totalArticles),
					}
				})
			)

			res.json(careerWithArticlesCount)
		} catch (error) {
			handleError(res, error)
		}
	},

	async getByCareer(req, res) {
		try {
			const { id } = req.params
			const career = await careerModel.getById(id)
			if (!career) return sendResponse(res, 404, 'Carrera no encontrada.')
			return sendResponse(res, 200, 'Carrera obtenida exitosamente.')
		} catch (error) {
			handleError(res, error)
		}
	},

	async createCareer(req, res) {
		try {
			const data = req.body
			if (!data.name) return sendResponse(res, 400, 'Por favor, completa todos los campos.')
			const existingcareer = await careerModel.getByName(data.name)
			if (existingcareer) return sendResponse(res, 400, 'Ya existe una carrera con ese nombre.')
			await careerModel.create(data)
			return sendResponse(res, 200, 'Carrera creada exitosamente.')
		} catch (error) {
			handleError(res, error)
		}
	},

	async updateCareer(req, res) {
		try {
			const { id } = req.params
			const data = req.body
			if (!data.name) return sendResponse(res, 400, 'Por favor, completa todos los campos.')
			const currentcareer = await careerModel.getById(id)
			if (data.name !== currentcareer.name) {
				const existingcareer = await careerModel.getByName(data.name)
				if (existingcareer) return sendResponse(res, 400, 'Ya existe una carrera con ese nombre.')
			}
			await careerModel.update(id, data)
			return sendResponse(res, 200, 'Carrera actualizada exitosamente.')
		} catch (error) {
			console.log(error)
			handleError(res, error)
		}
	},

	async deleteCareer(req, res) {
		try {
			const { id } = req.params

			console.log('reciebei', id)
			const existingcareer = await careerModel.getById(id)
			if (!existingcareer) return sendResponse(res, 404, 'Carrera no encontrada.')
			await careerModel.delete(id)
			return sendResponse(res, 204, 'Carrera eliminada exitosamente.')
		} catch (error) {
			return handleError(res, error)
		}
	},
}
