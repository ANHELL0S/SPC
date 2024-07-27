import { field_specific_Model } from '../models/field_specific.model.js'
import { sendResponse } from '../helpers/responseHelpers.js'

const handleError = (res, error) => {
	return sendResponse(res, 500, '¡Ops! Ha ocurrido un error. Por favor, inténtalo de nuevo.')
}

export const field_specific_Controller = {
	async getAllField_specific(req, res) {
		try {
			const field_specific = await field_specific_Model.getAll()
			if (!field_specific) return sendResponse(res, 404, 'No existe ningún campo específico.')
			res.json(field_specific)
		} catch (error) {
			handleError(res, error)
		}
	},

	async getByIdField_specific(req, res) {
		try {
			const { id } = req.params
			const field_specific = await field_specific_Model.getById(id)
			if (!field_specific) return sendResponse(res, 404, 'Campo específico no encontrado.')
			return sendResponse(res, 200, 'Campo específico obtenido exitosamente.')
		} catch (error) {
			handleError(res, error)
		}
	},

	async createField_specific(req, res) {
		try {
			const data = req.body
			if (!data.name) return sendResponse(res, 400, 'Por favor, completa todos los campos.')
			const existingField_specific = await field_specific_Model.getByName(data.name)
			if (existingField_specific) return sendResponse(res, 400, 'Ya existe un campo específico con ese nombre.')
			await field_specific_Model.create(data)
			return sendResponse(res, 200, 'Campo específico creada exitosamente.')
		} catch (error) {
			handleError(res, error)
		}
	},

	async updateField_specific(req, res) {
		try {
			const { id } = req.params
			const data = req.body
			if (!data.name) return sendResponse(res, 400, 'Por favor, completa todos los campos.')
			const currentField_specific = await field_specific_Model.getById(id)
			if (data.name !== currentField_specific.name) {
				const existingfield_specific = await field_specific_Model.getByName(data.name)
				if (existingfield_specific) return sendResponse(res, 400, 'Ya existe un campo específico con ese nombre.')
			}
			await field_specific_Model.update(id, data)
			return sendResponse(res, 200, 'Campo específico actualizado exitosamente.')
		} catch (error) {
			handleError(res, error)
		}
	},

	async deleteField_specific(req, res) {
		try {
			const { id } = req.params

			const existingField_specific = await field_specific_Model.getById(id)
			if (!existingField_specific) return sendResponse(res, 404, 'Campo específico no encontrado.')
			await field_specific_Model.delete(id)
			return sendResponse(res, 204, 'Campo específico eliminado exitosamente.')
		} catch (error) {
			return handleError(res, error)
		}
	},
}
