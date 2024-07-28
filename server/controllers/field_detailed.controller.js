import { field_detailed_Model } from '../models/field_detailed.model.js'
import { sendResponse } from '../helpers/responseHelpers.js'

const handleError = (res, error) => {
	return sendResponse(res, 500, '¡Ops! Ha ocurrido un error. Por favor, inténtalo de nuevo.')
}

export const field_detailed_Controller = {
	async getAllField_detailed(req, res) {
		try {
			const field_detailed = await field_detailed_Model.getAll()
			if (!field_detailed) return sendResponse(res, 404, 'No existe ningún campo detallado.')
			res.json(field_detailed)
		} catch (error) {
			handleError(res, error)
		}
	},

	async getByIdField_detailed(req, res) {
		try {
			const { id } = req.params
			const field_detailed = await field_detailed_Model.getById(id)
			if (!field_detailed) return sendResponse(res, 404, 'Campo detallado no encontrado.')
			return sendResponse(res, 200, 'Campo detallado obtenido exitosamente.')
		} catch (error) {
			handleError(res, error)
		}
	},

	async createField_detailed(req, res) {
		try {
			const data = req.body
			if (!data.name) return sendResponse(res, 400, 'Por favor, completa todos los campos.')
			const existingField_detailed = await field_detailed_Model.getByName(data.name)
			if (existingField_detailed) return sendResponse(res, 400, 'Ya existe un campo detallado con ese nombre.')
			await field_detailed_Model.create(data)
			return sendResponse(res, 200, 'Campo detallado creada exitosamente.')
		} catch (error) {
			handleError(res, error)
		}
	},

	async updateField_detailed(req, res) {
		try {
			const { id } = req.params
			const data = req.body
			if (!data.name) return sendResponse(res, 400, 'Por favor, completa todos los campos.')
			const currentField_detailed = await field_detailed_Model.getById(id)
			if (data.name !== currentField_detailed.name) {
				const existingfield_detailed = await field_detailed_Model.getByName(data.name)
				if (existingfield_detailed) return sendResponse(res, 400, 'Ya existe un campo detallado con ese nombre.')
			}
			await field_detailed_Model.update(id, data)
			return sendResponse(res, 200, 'Campo detallado actualizado exitosamente.')
		} catch (error) {
			handleError(res, error)
		}
	},

	async deleteField_detailed(req, res) {
		try {
			const { id } = req.params

			const existingField_detailed = await field_detailed_Model.getById(id)
			if (!existingField_detailed) return sendResponse(res, 404, 'Campo detallado no encontrado.')
			await field_detailed_Model.delete(id)
			return sendResponse(res, 204, 'Campo detallado eliminado exitosamente.')
		} catch (error) {
			return handleError(res, error)
		}
	},
}
