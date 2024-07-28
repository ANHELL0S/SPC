import { lineResearchModel } from '../models/line_research.model.js'
import { sendResponse } from '../helpers/responseHelpers.js'

const handleError = (res, error) => {
	return sendResponse(res, 500, '¡Ops! Ha ocurrido un error. Por favor, inténtalo de nuevo.')
}

export const lineResearchController = {
	async getAll(req, res) {
		try {
			const allLineResearch = await lineResearchModel.getAll()
			res.json(allLineResearch)
		} catch (error) {
			handleError(res, error)
		}
	},
	async getById(req, res) {
		try {
			const { id } = req.params
			const lineResearch = await Promise.all([lineResearchModel.getById(id)])
			if (!lineResearch) return sendResponse(res, 404, 'Facultad no encontrada.')
			return sendResponse(res, 200, 'Línea de investigación obtenida exitosamente.', faculty)
		} catch (error) {
			handleError(res, error)
		}
	},

	async create(req, res) {
		try {
			const data = req.body

			// Validación temprana de campos requeridos
			if (!data.name) return sendResponse(res, 400, 'Por favor, completa todos los campos.')

			// Verificar si la facultad ya existe de manera asíncrona
			const existingFaculty = await lineResearchModel.getByName(data.name)

			// Si existe una facultad con el mismo nombre, devolver un error
			if (existingFaculty) return sendResponse(res, 400, 'Ya existe una línea de investigación con ese nombre.')

			const faculty = await lineResearchModel.create(data)
			return sendResponse(res, 200, 'Línea de investigación creada exitosamente.', faculty)
		} catch (error) {
			handleError(res, error)
		}
	},

	async update(req, res) {
		try {
			const { id } = req.params
			const data = req.body

			if (!data.name) return sendResponse(res, 400, 'Por favor, completa todos los campos.')

			const currentFaculty = await lineResearchModel.getById(id)
			if (data.name !== currentFaculty.name) {
				const existingFaculty = await lineResearchModel.getByName(data.name)
				if (existingFaculty) return sendResponse(res, 400, 'Ya existe una línea de investigación con ese nombre.')
			}

			const updatedFaculty = await lineResearchModel.update(id, data)
			return sendResponse(res, 200, 'Línea de investigación actualizada exitosamente.', updatedFaculty)
		} catch (error) {
			console.log(error)
			handleError(res, error)
		}
	},

	async delete(req, res) {
		try {
			const { id } = req.params

			const existingFaculty = await lineResearchModel.getById(id)
			if (!existingFaculty) return sendResponse(res, 404, 'Línea de investigación no encontrada.')

			await lineResearchModel.delete(id)
			return sendResponse(res, 204, 'Línea de investigación eliminada exitosamente.')
		} catch (error) {
			return handleError(res, error)
		}
	},
}
