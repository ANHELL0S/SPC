import { magazineModel } from '../models/magazine.model.js'
import { sendResponse } from '../helpers/responseHelpers.js'

const handleError = (res, error) => {
	return sendResponse(res, 500, '¡Ops! Ha ocurrido un error. Por favor, inténtalo de nuevo.')
}

export const magazineController = {
	async getAllmagizine(req, res) {
		try {
			const allMagazine = await magazineModel.getAll()
			res.json(allMagazine)
		} catch (error) {
			handleError(res, error)
		}
	},
	async getMagazineById(req, res) {
		try {
			const { id } = req.params
			const magazine = await Promise.all([magazineModel.getById(id)])
			if (!magazine) return sendResponse(res, 404, 'Revista no encontrada.')

			return sendResponse(res, 200, 'Revista obtenida exitosamente.', magazine)
		} catch (error) {
			handleError(res, error)
		}
	},

	async createMagazine(req, res) {
		try {
			const data = req.body

			// Validación temprana de campos requeridos
			if (!data.name) return sendResponse(res, 400, 'Por favor, completa todos los campos.')

			// Verificar si la revista ya existe de manera asíncrona
			const existingMagazine = await magazineModel.getByName(data.name)

			// Si existe una revista con el mismo nombre, devolver un error
			if (existingMagazine) return sendResponse(res, 400, 'Ya existe una revista con ese nombre.')

			// Crear la revista si no existe
			const magazine = await magazineModel.create(data)

			return sendResponse(res, 200, 'Revista creada exitosamente.', magazine)
		} catch (error) {
			handleError(res, error)
		}
	},

	async updateMagazine(req, res) {
		try {
			const { id } = req.params
			const data = req.body

			// Validación temprana de campos requeridos
			if (!data.name) return sendResponse(res, 400, 'Por favor, completa todos los campos.')

			// Obtener la revista actual por ID
			const currentMagazine = await magazineModel.getById(id)

			// Verificar si la revista ya existe por el nuevo nombre (excepto la actual)
			if (data.name !== currentMagazine.name) {
				const existingMagazine = await magazineModel.getByName(data.name)
				if (existingMagazine) return sendResponse(res, 400, 'Ya existe una revista con ese nombre.')
			}

			// Actualizar la revista
			const updatedmagizine = await magazineModel.update(id, data)

			return sendResponse(res, 200, 'Revista actualizada exitosamente.', updatedmagizine)
		} catch (error) {
			handleError(res, error)
		}
	},

	async deletemagizine(req, res) {
		try {
			const { id } = req.params

			// Check if magizine exists
			const existingMagazine = await magazineModel.getById(id)
			if (!existingMagazine) return sendResponse(res, 404, 'Revista no encontrada.')

			await magazineModel.delete(id)
			return sendResponse(res, 204, 'Revista eliminada exitosamente.')
		} catch (error) {
			return handleError(res, error)
		}
	},
}
