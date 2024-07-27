import { parameter_Model } from '../models/parameter.model.js'
import { movementScheme } from '../models/postgresql/schemes.js'
import { relation_parameter_article_Model } from '../models/relation_parameter_article.model.js'
import { templateModel } from '../models/template.model.js'

async function getAll(req, res) {
	try {
		const articleDefaults = await parameter_Model.getAll()
		res.json(articleDefaults)
	} catch (error) {
		res.status(500).json({ message: '¡Ops! Ha ocurrido un error. Por favor, inténtalo de nuevo.' })
	}
}

async function create(req, res) {
	const { body, user } = req

	try {
		body.id_user_fk = user.id

		const existingName = await parameter_Model.findName(body.name)
		if (existingName) return res.status(401).json({ message: 'Nombre del parametro ya en uso.' })

		const newparemeter = await parameter_Model.create({ data: body })

		await movementScheme.create({
			action: `Creaste el parametro ${body.name}`,
			targetType: 'paremetros',
			targetId: newparemeter.id_parameter,
			id_user_fk: user.id,
		})

		res.status(201).json({ message: `Creaste el parametro ${newparemeter.name}  exitosamente.` })
	} catch (error) {
		res.status(500).json({ message: '¡Ops! Ha ocurrido un error. Por favor, inténtalo de nuevo.' })
	}
}

async function update(req, res) {
	const { id } = req.params
	const { body } = req

	try {
		const beforeUpdate = await parameter_Model.getById({ id })
		if (!beforeUpdate) return res.status(404).json({ message: 'Paremetro no encontrado.' })

		const { name: previousName } = beforeUpdate

		if (body.name === previousName) return res.status(201).json({ message: 'Nombre actual sin cambios.' })

		// Verificar si el nuevo nombre ya está en uso por otra categoría
		if (body.name !== previousName) {
			const existingName = await parameter_Model.findName(body.name)
			if (existingName && existingName.id_articleDefault !== id)
				return res.status(401).json({ message: 'El nombre del parametro ya está en uso.' })
		}

		const updateParameter = await parameter_Model.update({ id, input: body })

		res.status(201).json({ message: `Actualizaste el parametro ${updateParameter.name}  exitosamente.` })
	} catch (error) {
		res.status(500).json({ message: '¡Ops! Ha ocurrido un error. Por favor, inténtalo de nuevo.' })
	}
}

async function remove(req, res) {
	const { id } = req.params

	try {
		const isParameterInUse = await templateModel.checkParameter(id)
		if (isParameterInUse) return res.status(401).json({ message: 'Parametro en uso en un formato.' })

		const parameterDeleted = await parameter_Model.delete({ id })
		if (!parameterDeleted) res.status(404).json({ message: 'Parametro no encontrado.' })

		const name = await parameter_Model.findNameCategoryById({ id })
		await movementScheme.create({
			action: `Removiste el parametro ${name}`,
			targetType: 'parametros',
			targetId: id,
			id_user_fk: req.user.id,
		})

		res.status(200).json({ message: `Removiste el parametro ${name} existosamente.` })
	} catch (error) {
		res.status(500).json({ message: '¡Ops! Ha ocurrido un error. Por favor, inténtalo de nuevo.' })
	}
}

async function reactive(req, res) {
	const { id } = req.params

	try {
		const reactiveParameter = await parameter_Model.reactive({ id })
		if (!reactiveParameter) res.status(404).json({ message: 'Etiqueta no encontrada.' })

		const parameterName = await parameter_Model.findNameCategoryById({ id })
		await movementScheme.create({
			action: `Reactivaste el parametro ${parameterName}`,
			targetType: 'parametros',
			targetId: id,
			id_user_fk: req.user.id,
		})

		res.status(200).json({ message: `Ractivaste el parametro ${parameterName} existosamente.` })
	} catch (error) {
		res.status(500).json({ message: '¡Ops! Ha ocurrido un error. Por favor, inténtalo de nuevo.' })
	}
}

export { getAll, create, update, remove, reactive }
