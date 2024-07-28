import { z } from 'zod'
import { templateModel } from '../models/template.model.js'
import { CategoryModel } from '../models/categories.model.js'
import { sendResponse } from '../helpers/responseHelpers.js'
import { movementScheme, articleScheme } from '../models/postgresql/schemes.js'

const handleError = (res, error) => {
	return sendResponse(res, 500, '¡Ops! Ha ocurrido un error. Por favor, inténtalo de nuevo.')
}

const categorySchema = z.object({
	name: z.string().min(3, 'El nombre debe contener al menos 3 caracteres.'),
})

async function getTotalCount(req, res) {
	try {
		const totalCount = await CategoryModel.getTotalCount()
		res.json(totalCount)
	} catch (error) {
		handleError(res, error)
	}
}

async function getById(req, res) {
	const { id } = req.params

	try {
		const category = await CategoryModel.getById({ id })
		if (!category) res.status(404).json({ message: 'Categoria no encontrada.' })
		res.json(category)
	} catch (error) {
		handleError(res, error)
	}
}

async function getAll(req, res) {
	try {
		const categories = await CategoryModel.getAll()

		// Realizar el conteo de artículos por categoría
		const categoriesWithArticleCount = await Promise.all(
			categories.map(async category => {
				const articleCount = await articleScheme.count({
					where: {
						id_category_fk: category.id_category,
					},
				})
				return {
					...category.dataValues,
					articleCount,
				}
			})
		)

		res.json(categoriesWithArticleCount)
	} catch (error) {
		handleError(res, error)
	}
}

async function create(req, res) {
	const { body } = req

	try {
		// Validar los datos de entrada usando el esquema
		categorySchema.parse(body)

		const existingName = await CategoryModel.findNameCategory(body.name)
		if (existingName) return res.status(401).json({ message: 'Nombre de categoría ya en uso.' })

		const newCategory = await CategoryModel.create({ data: body })

		res.status(201).json({ message: `Creaste la categoría ${newCategory.name} exitosamente.` })
	} catch (error) {
		if (error instanceof z.ZodError) {
			const errorMessages = error.errors.map(err => err.message).join('\n')
			return res.status(400).json({ message: errorMessages })
		}
		handleError(res, error)
	}
}

async function update(req, res) {
	const { id } = req.params
	const { body, user } = req

	try {
		// Validar los datos de entrada usando el esquema
		categorySchema.parse(body)
		body.id_user_fk = user.id

		// Obtener los datos anteriores de la categoría
		const beforeUpdate = await CategoryModel.getById({ id })
		if (!beforeUpdate) return res.status(404).json({ message: 'Categoría no encontrada.' })

		const { name: previousName } = beforeUpdate

		if (body.name === previousName) return res.status(201).json({ message: 'Actualización sin cambios.' })

		// Verificar si el nuevo nombre ya está en uso por otra categoría
		if (body.name !== previousName) {
			const existingCategoryName = await CategoryModel.findNameCategory(body.name)

			if (existingCategoryName && existingCategoryName.id_category !== id)
				return res.status(401).json({ message: 'El nombre de la categoria ya está en uso.' })
		}

		// Actualizar la categoría, independientemente de si los campos han cambiado
		const updatedCategory = await CategoryModel.update({ id, data: body })
		if (!updatedCategory) return res.status(404).json({ message: 'No se pudo actualizar la categoría.' })

		// Obtener el nuevo nombre y descripción de la categoría
		const { name: currentName } = updatedCategory

		// Construir el mensaje de acción para el registro de movimiento
		let actionMessage = ''
		if (previousName !== currentName) {
			actionMessage = `Cambiaste el nombre de la categoría ${previousName} por ${currentName}.`
		} else if (previousName !== currentName) {
			actionMessage = `Cambiaste el nombre de la categoría ${previousName} por ${currentName}`
		}

		// Registrar la acción de cambio si hay cambios en el nombre
		if (actionMessage) {
			await movementScheme.create({
				action: actionMessage,
				targetType: 'categorias',
				targetId: id,
				id_user_fk: req.user.id,
			})
		}

		res.status(200).json({ message: `Se actualizó la categoría ${previousName} exitosamente.` })
	} catch (error) {
		if (error instanceof z.ZodError) {
			const errorMessages = error.errors.map(err => err.message).join('\n')
			return res.status(400).json({ message: errorMessages })
		}
		handleError(res, error)
	}
}

async function remove(req, res) {
	const { id } = req.params

	try {
		// Verificar si existen registros asociados a la categoría
		const hasAssociatedRecords = await templateModel.checkCategory(id)
		if (hasAssociatedRecords) return res.status(401).json({ message: 'Hay etiquetas asociados ha esta categoría.' })

		// Procede a eliminar la categoría
		const categoryDeleted = await CategoryModel.delete({ id })
		if (!categoryDeleted) res.status(404).json({ message: 'Categoría no encontrada.' })

		const name = await CategoryModel.findNameCategoryById({ id })

		await movementScheme.create({
			action: `Removiste la categoría ${name}`,
			targetType: 'categorias',
			targetId: id,
			id_user_fk: req.user.id,
		})

		res.status(200).json({ message: `Removiste la categoria ${name} existosamente.` })
	} catch (error) {
		handleError(res, error)
	}
}

async function reactive(req, res) {
	const { id } = req.params

	try {
		const reactiveCategory = await CategoryModel.reactive({ id })
		if (!reactiveCategory) res.status(404).json({ message: 'Categoría no encontrada.' })

		const categoryName = await CategoryModel.findNameCategoryById({ id })
		await movementScheme.create({
			action: `Reactivaste la categoría ${categoryName}`,
			targetType: 'categorias',
			targetId: id,
			id_user_fk: req.user.id,
		})

		res.status(200).json({ message: `Ractivaste la categoria ${categoryName} existosamente.` })
	} catch (error) {
		handleError(res, error)
	}
}

export { getTotalCount, getById, getAll, create, update, remove, reactive }
