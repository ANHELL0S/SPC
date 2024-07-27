import { z } from 'zod'
import { TagModel } from '../models/tags.model.js'
import { movementScheme } from '../models/postgresql/schemes.js'
import { templateModel } from '../models/template.model.js'

const TagsSchema = z.object({
	name: z.string().min(3, 'El nombre debe contener al menos 3 caracteres.'),
})

async function getById(req, res) {
	try {
		const { id } = req.params
		const tag = await TagModel.getById({ id })
		if (!tag) res.status(404).json({ message: 'Etiqueta no encontrada.' })
	} catch (error) {
		res.status(500).json({ message: 'Error fetching tag by id' })
	}
}

async function getAll(req, res) {
	try {
		const tags = await TagModel.getAll()
		res.json(tags)
	} catch (error) {
		res.status(500).json({ message: 'Error fetching tag' })
	}
}

async function create(req, res) {
	const { body, user } = req

	try {
		// Validar los datos de entrada usando el esquema
		TagsSchema.parse(body)
		body.id_user_fk = user.id

		const existingName = await TagModel.findNameTag(body.name)
		if (existingName) return res.status(400).json({ message: 'Nombre de la etiqueta ya en uso.' })

		// Crear el tag si no hay conflictos
		const newTag = await TagModel.create({ data: body })

		// Crear un log con el CRUD
		await movementScheme.create({
			action: `Creaste la etiqueta ${body.name}`,
			targetType: 'etiquetas',
			targetId: newTag.id_tag,
		})

		res.status(201).json({ message: `Creaste la etiqueta ${newTag.name} exitosamente.` })
	} catch (error) {
		if (error instanceof z.ZodError) {
			const errorMessages = error.errors.map(err => err.message).join('\n')
			return res.status(400).json({ message: errorMessages })
		}

		res.status(500).json({ message: '¡Ops! Ha ocurrido un error. Por favor, inténtalo de nuevo.' })
	}
}

async function update(req, res) {
	const { id } = req.params
	const { body, user } = req

	try {
		// Validar los datos de entrada usando el esquema
		TagsSchema.parse(body)
		body.id_user_fk = user.id

		// Obtener el nombre anterior y la descripción de la etiqueta
		const beforeUpdate = await TagModel.getById({ id })
		const previousName = beforeUpdate.name

		// Verificar si el nuevo nombre es igual al nombre actual y si la nueva descripción es igual a la descripción actual
		if (body.name === previousName)
			return res.status(201).json({ message: 'Nombre y descripción actuales sin cambios.' })

		// Verificar si el nuevo nombre ya está en uso por otra etiqueta
		if (body.name !== previousName) {
			const existingTag = await TagModel.findNameTag(body.name)
			if (existingTag && existingTag.id !== id) {
				return res.status(400).json({ message: 'El nombre ya está en uso por otra etiqueta.' })
			}
		}

		// Actualizar la etiqueta, independientemente de si los campos han cambiado
		const updatedTag = await TagModel.update({ id, input: body })
		if (!updatedTag) return res.status(404).json({ message: 'Etiqueta no encontrada.' })

		// Obtener el nuevo nombre y descripción de la etiqueta
		const currentName = updatedTag.name

		// Construir el mensaje de acción para el registro de movimiento
		let actionMessage = ''
		if (previousName !== currentName) {
			actionMessage += `Cambiaste el nombre de la etiqueta ${previousName} a ${currentName}. `
		}

		// Crear el registro de movimiento si hay un cambio en el nombre o descripción
		if (actionMessage) {
			await movementScheme.create({
				action: actionMessage.trim(),
				targetType: 'etiquetas',
				targetId: id,
				id_user_fk: user.id,
			})
		}

		res.status(200).json({ message: `Actualizaste la etiqueta ${previousName} exitosamente.` })
	} catch (error) {
		if (error instanceof z.ZodError) {
			const errorMessages = error.errors.map(err => err.message).join('\n')
			return res.status(400).json({ message: errorMessages })
		}
		res.status(500).json({ message: '¡Ops! Ha ocurrido un error. Por favor, inténtalo de nuevo.' })
	}
}

async function remove(req, res) {
	const { id } = req.params

	try {
		const isTagInUse = await templateModel.checkTag(id)
		if (isTagInUse) return res.status(401).json({ message: 'Etiqueta en uso en un formato.' })

		const tagDeleted = await TagModel.delete({ id })
		if (!tagDeleted) res.status(404).json({ message: 'Etiqueta no econtrada.' })

		const name = await TagModel.findNameTagById({ id })
		await movementScheme.create({
			action: `Removiste la etiqueta ${name}`,
			targetType: 'etiquetas',
			targetId: id,
			id_user_fk: req.user.id,
		})

		res.status(200).json({ message: `Removiste la etiqueta ${name} existosamente.` })
	} catch (error) {
		res.status(500).json({ message: 'Error deleting tag' })
	}
}

async function reactive(req, res) {
	const { id } = req.params

	try {
		const reactiveTag = await TagModel.reactive({ id })
		if (!reactiveTag) res.status(404).json({ message: 'Etiqueta no encontrada.' })

		const tagName = await TagModel.findNameTagById({ id })
		await movementScheme.create({
			action: `Reactivaste la etiqueta ${tagName}`,
			targetType: 'etiquetas',
			targetId: id,
			id_user_fk: req.user.id,
		})

		res.status(200).json({ message: `Ractivaste la etiqueta ${tagName} existosamente.` })
	} catch (error) {
		res.status(500).json({ message: '¡Ops! Ha ocurrido un error. Por favor, inténtalo de nuevo.' })
	}
}

export { getById, getAll, create, update, remove, reactive }
