import { field_wide_Model } from '../models/field_wide.model.js'
import { sendResponse } from '../helpers/responseHelpers.js'

const handleError = (res, error) => {
	return sendResponse(res, 500, '¡Ops! Ha ocurrido un error. Por favor, inténtalo de nuevo.')
}

export const field_wide_Controller = {
	async getAllField_wide(req, res) {
		try {
			const field_wide = await field_wide_Model.getAll()
			if (!field_wide) return sendResponse(res, 404, 'No existe ningún campo amplio.')
			res.json(field_wide)
		} catch (error) {
			handleError(res, error)
		}
	},

	async getByIdField_wide(req, res) {
		try {
			const { id } = req.params
			const field_wide = await field_wide_Model.getById(id)
			if (!field_wide) return sendResponse(res, 404, 'Campo amplio no encontrado.')
			return sendResponse(res, 200, 'Campo amplio obtenido exitosamente.')
		} catch (error) {
			handleError(res, error)
		}
	},

	async createField_wide(req, res) {
		try {
			const data = req.body
			if (!data.name) return sendResponse(res, 400, 'Por favor, completa todos los campos.')
			const existingField_wide = await field_wide_Model.getByName(data.name)
			if (existingField_wide) return sendResponse(res, 400, 'Ya existe un campo amplio con ese nombre.')
			await field_wide_Model.create(data)
			return sendResponse(res, 200, 'Campo amplio creada exitosamente.')
		} catch (error) {
			handleError(res, error)
		}
	},

	async updateField_wide(req, res) {
		try {
			const { id } = req.params
			const data = req.body
			if (!data.name) return sendResponse(res, 400, 'Por favor, completa todos los campos.')
			const currentField_wide = await field_wide_Model.getById(id)
			if (data.name !== currentField_wide.name) {
				const existingfield_wide = await field_wide_Model.getByName(data.name)
				if (existingfield_wide) return sendResponse(res, 400, 'Ya existe un campo amplio con ese nombre.')
			}
			await field_wide_Model.update(id, data)
			return sendResponse(res, 200, 'Campo amplio actualizado exitosamente.')
		} catch (error) {
			handleError(res, error)
		}
	},

	async deleteField_wide(req, res) {
		try {
			const { id } = req.params

			const existingField_wide = await field_wide_Model.getById(id)
			if (!existingField_wide) return sendResponse(res, 404, 'Campo amplio no encontrado.')
			await field_wide_Model.delete(id)
			return sendResponse(res, 204, 'Campo amplio eliminado exitosamente.')
		} catch (error) {
			return handleError(res, error)
		}
	},
}
