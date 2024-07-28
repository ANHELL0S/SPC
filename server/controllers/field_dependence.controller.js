import { field_dependence_Model } from '../models/field_dependences.model.js'
import { sendResponse } from '../helpers/responseHelpers.js'

const handleError = (res, error) => {
	return sendResponse(res, 500, '¡Ops! Ha ocurrido un error. Por favor, inténtalo de nuevo.')
}

export const field_dependenceController = {
	async getAllField_dependence(req, res) {
		try {
			const field_dependence = await field_dependence_Model.getAll()
			if (!field_dependence) return sendResponse(res, 404, 'No existe la dependencia.')
			res.json(field_dependence)
		} catch (error) {
			handleError(res, error)
		}
	},

	async getByIdField_dependence(req, res) {
		try {
			const { id } = req.params
			const field_dependence = await field_dependence_Model.getById(id)
			if (!field_dependence) return sendResponse(res, 404, 'Dependencia no encontrada.')
			return sendResponse(res, 200, 'Facultad obtenida exitosamente.')
		} catch (error) {
			handleError(res, error)
		}
	},

	async createField_dependence(req, res) {
		try {
			const data = req.body
			if (!data.name) return sendResponse(res, 400, 'Por favor, completa todos los campos.')
			const existingField_dependence = await field_dependence_Model.getByName(data.name)
			if (existingField_dependence) return sendResponse(res, 400, 'Ya existe una dependencia con ese nombre.')
			await field_dependence_Model.create(data)
			return sendResponse(res, 200, 'Dependencia creada exitosamente.')
		} catch (error) {
			handleError(res, error)
		}
	},

	async updateField_dependence(req, res) {
		try {
			const { id } = req.params
			const data = req.body
			if (!data.name) return sendResponse(res, 400, 'Por favor, completa todos los campos.')
			const currentField_dependence = await field_dependence_Model.getById(id)
			if (data.name !== currentField_dependence.name) {
				const existingfield_dependence = await field_dependence_Model.getByName(data.name)
				if (existingfield_dependence) return sendResponse(res, 400, 'Ya existe una dependencia con ese nombre.')
			}
			await field_dependence_Model.update(id, data)
			return sendResponse(res, 200, 'Base de datos indexa actualizada exitosamente.')
		} catch (error) {
			console.log(error)
			handleError(res, error)
		}
	},

	async deleteField_dependence(req, res) {
		try {
			const { id } = req.params

			const existingField_dependence = await field_dependence_Model.getById(id)
			if (!existingField_dependence) return sendResponse(res, 404, 'Dependencia no encontrada.')
			await field_dependence_Model.delete(id)
			return sendResponse(res, 204, 'Dependencia eliminada exitosamente.')
		} catch (error) {
			return handleError(res, error)
		}
	},
}
