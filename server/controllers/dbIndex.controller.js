import { db_indexModel } from '../models/dbIndex.model.js'
import { sendResponse } from '../helpers/responseHelpers.js'

const handleError = (res, error) => {
	return sendResponse(res, 500, '¡Ops! Ha ocurrido un error. Por favor, inténtalo de nuevo.')
}

export const dbIndexController = {
	async getAllDBIndex(req, res) {
		try {
			const dbIndex = await db_indexModel.getAll()
			if (!dbIndex) return sendResponse(res, 404, 'No existen basees de datos indexadas.')
			res.json(dbIndex)
		} catch (error) {
			handleError(res, error)
		}
	},

	async getByIdDBIndex(req, res) {
		try {
			const { id } = req.params
			const dbIndex = await db_indexModel.getById(id)
			if (!dbIndex) return sendResponse(res, 404, 'Base datos indexada no encontrada.')
			return sendResponse(res, 200, 'Facultad obtenida exitosamente.')
		} catch (error) {
			handleError(res, error)
		}
	},

	async createDBIndex(req, res) {
		try {
			const data = req.body
			if (!data.name) return sendResponse(res, 400, 'Por favor, completa todos los campos.')
			const existingDBIndex = await db_indexModel.getByName(data.name)
			if (existingDBIndex) return sendResponse(res, 400, 'Ya existe una base de datos indexada con ese nombre.')
			await db_indexModel.create(data)
			return sendResponse(res, 200, 'Base de datos indexa creada exitosamente.')
		} catch (error) {
			handleError(res, error)
		}
	},

	async updateDBIndex(req, res) {
		try {
			const { id } = req.params
			const data = req.body
			if (!data.name) return sendResponse(res, 400, 'Por favor, completa todos los campos.')
			const currentDBIndex = await db_indexModel.getById(id)
			if (data.name !== currentDBIndex.name) {
				const existingDBIndex = await db_indexModel.getByName(data.name)
				if (existingDBIndex) return sendResponse(res, 400, 'Ya existe una base datos indexada con ese nombre.')
			}
			await db_indexModel.update(id, data)
			return sendResponse(res, 200, 'Base de datos indexa actualizada exitosamente.')
		} catch (error) {
			console.log(error)
			handleError(res, error)
		}
	},

	async deleteDBIndex(req, res) {
		try {
			const { id } = req.params

			console.log('reciebei', id)
			const existingDBIndex = await db_indexModel.getById(id)
			if (!existingDBIndex) return sendResponse(res, 404, 'Base datos indexada no encontrada.')
			await db_indexModel.delete(id)
			return sendResponse(res, 204, 'Base de datos indexa eliminada exitosamente.')
		} catch (error) {
			return handleError(res, error)
		}
	},
}
