import { TagModel } from '../models/tags.model.js'
import { templateModel } from '../models/template.model.js'
import { CategoryModel } from '../models/categories.model.js'
import { parameter_Model } from '../models/parameter.model.js'
import { field_dependence_Model } from '../models/field_dependences.model.js'
import { field_detailed_Model } from '../models/field_detailed.model.js'
import { field_specific_Model } from '../models/field_specific.model.js'
import { field_wide_Model } from '../models/field_wide.model.js'
import { movementScheme, templateScheme, relation_tag_template_Scheme } from '../models/postgresql/schemes.js'

async function getAll(req, res) {
	try {
		const templates = await templateScheme.findAll()

		const parameterDefaults = await parameter_Model.getAll()
		const field_dependenceDefaults = await field_dependence_Model.getAll()
		const field_detailedDefaults = await field_detailed_Model.getAll()
		const field_specificDefaults = await field_specific_Model.getAll()
		const field_wideDefaults = await field_wide_Model.getAll()

		const templateData = []

		for (const templateItem of templates) {
			const tagRelations = await relation_tag_template_Scheme.findAll({
				where: { id_template_fk: templateItem.id_template },
			})

			const tags = []
			for (const tagRelation of tagRelations) {
				const tag = await TagModel.getById({ id: tagRelation.id_tag_fk })

				if (tag) {
					tags.push({
						id_relation_tag_template: tagRelation.id_relation_tag_template,
						id_tag_fk: tag.id_tag,
						tag_name: tag.name,
						tag_descripction: tag.description,
						tag_active: tag.active,
					})
				}
			}

			if (tags) {
				const parameterDefaultsForTemplate = parameterDefaults.map(param => ({
					id_parameter: param.id_parameter,
					name_parameter: param.name,
					param_descripction: param.description,
					param_active: param.active,
				}))

				const field_dependenceDefaultsForTemplate = field_dependenceDefaults.map(dependence => ({
					id_field_dependence: dependence.id_field_dependence,
					name_field_dependence: dependence.name,
				}))

				const field_detailedDefaultsForTemplate = field_detailedDefaults.map(detailed => ({
					id_field_detailed: detailed.id_field_detailed,
					name_field_detailed: detailed.name,
				}))

				const field_specificDefaultsForTemplate = field_specificDefaults.map(specific => ({
					id_field_specific: specific.id_field_specific,
					name_field_specific: specific.name,
				}))

				const field_wideDefaultsForTemplate = field_wideDefaults.map(wide => ({
					id_field_wide: wide.id_field_wide,
					name_field_wide: wide.name,
				}))

				const categoryName = await CategoryModel.findNameCategoryById({ id: templateItem.id_category_fk })

				templateData.push({
					id_template: templateItem.id_template,
					id_category_fk: templateItem.id_category_fk,
					category_name: categoryName,
					parameter: parameterDefaultsForTemplate,
					field_dependence: field_dependenceDefaultsForTemplate,
					field_detailed: field_detailedDefaultsForTemplate,
					field_specific: field_specificDefaultsForTemplate,
					field_wide: field_wideDefaultsForTemplate,
					tags: tags,
					createdAt: templateItem.createdAt,
					updatedAt: templateItem.updatedAt,
				})
			}
		}

		res.json(templateData)
	} catch (error) {
		res.status(500).json({ message: '¡Ops! Ha ocurrido un error. Por favor, inténtalo de nuevo.' })
	}
}

async function getById(req, res) {
	try {
		const templateId = req.params.id // Obtener el ID desde los parámetros de la solicitud

		// Buscar la plantilla por su ID
		const templateItem = await templateScheme.findByPk(templateId)

		if (!templateItem) {
			return res.status(404).json({ message: '¡La plantilla no fue encontrada!' })
		}

		// Obtener relaciones de etiquetas para esta plantilla
		const tagRelations = await relation_tag_template_Scheme.findAll({
			where: { id_template_fk: templateId },
		})

		const tags = []
		for (const tagRelation of tagRelations) {
			const tag = await TagModel.getById({ id: tagRelation.id_tag_fk })

			if (tag) {
				tags.push({
					id_relation_tag_template: tagRelation.id_relation_tag_template,
					id_tag_fk: tag.id_tag,
					tag_name: tag.name,
					tag_active: tag.active,
				})
			}
		}

		// Obtener parámetros por defecto
		const parameterDefaults = await parameter_Model.getAll()
		const parameterDefaultsForTemplate = parameterDefaults.map(param => ({
			id_parameter: param.id_parameter,
			name_parameter: param.name,
		}))

		// Obtener nombre de categoría
		const categoryName = await CategoryModel.findNameCategoryById({ id: templateItem.id_category_fk })

		// Construir el objeto de datos de la plantilla
		const templateData = {
			id_template: templateItem.id_template,
			id_category_fk: templateItem.id_category_fk,
			category_name: categoryName,
			parameter: parameterDefaultsForTemplate,
			tags: tags,
			createdAt: templateItem.createdAt,
			updatedAt: templateItem.updatedAt,
		}

		res.json(templateData) // Devolver los datos de la plantilla encontrada
	} catch (error) {
		res.status(500).json({ message: '¡Ops! Ha ocurrido un error. Por favor, inténtalo de nuevo.' })
	}
}

async function create(req, res) {
	const { body, user } = req
	console.log(body)

	try {
		const { id_category, id_tag } = body

		if (!id_category) return res.status(400).json({ message: 'Por favor, selecciona una categoria.' })

		// Verifica si la categoría ya está en uso
		const categoryExists = await templateScheme.findOne({ where: { id_category_fk: id_category } })
		if (categoryExists) return res.status(405).json({ message: 'Ya existe un formato para esta categoría.' })

		// Crea el nuevo template
		const newTemplate = await templateScheme.create({
			id_category_fk: id_category,
			id_user_fk: user.id,
		})

		// Itera sobre las etiquetas y crea una asociación con el template para cada una
		const associations = []
		for (const tagId of id_tag) {
			const newAssociation = await relation_tag_template_Scheme.create({
				id_template_fk: newTemplate.id_template,
				id_tag_fk: tagId,
			})
			associations.push(newAssociation)
		}

		// Obtener los nombres de las etiquetas asociadas
		const tagNames = []
		for (const tagId of id_tag) {
			const tag = await TagModel.getById({ id: tagId })
			if (tag) tagNames.push(tag.name)
		}

		// Obtener el nombre de la categoría
		const categoryName = await CategoryModel.findNameCategoryById({ id: id_category })

		// Crear registro en el movimiento
		const actionMessage = `El administrador ${user.username} creó el formato ${categoryName} con ${
			id_tag.length > 1 ? 'las etiquetas' : 'la etiqueta'
		} ${tagNames.join(', ')}`

		const movement = await movementScheme.create({
			action: actionMessage,
			targetType: 'formatos',
			targetId: newTemplate.id_template,
			id_user_fk: user.id,
		})

		res.status(201).json({ message: `Creaste el formato ${categoryName} exitosamente.` })
	} catch (error) {
		console.log(error)
		res.status(500).json({ message: '¡Ops! Ha ocurrido un error. Por favor, inténtalo de nuevo.' })
	}
}

async function update(req, res) {
	const { id } = req.params
	const { id_tag } = req.body

	try {
		// Verifica si id_tag es un array y si contiene al menos un elemento
		if (!Array.isArray(id_tag) || id_tag.length === 0) {
			return res.status(400).json({ message: 'La propiedad id_tag debe ser un array con al menos un elemento.' })
		}

		const associations = []
		for (const tagId of id_tag) {
			// Crea una nueva asociación en la base de datos
			const newAssociation = await relation_tag_template_Scheme.create({
				id_template_fk: id,
				id_tag_fk: tagId,
			})
			associations.push(newAssociation)
		}

		res.status(201).json({ message: `Etiqueta(s) añadida(s) al formato exitosamente.` })
	} catch (error) {
		res.status(500).json({ message: '¡Ops! Ha ocurrido un error. Por favor, inténtalo de nuevo.' })
	}
}

async function remove(req, res) {
	const { id } = req.params
	const { user } = req

	try {
		// Fetch the template by ID
		const associations = await templateModel.getById(id)
		if (!associations) return res.status(404).json({ message: 'Formato no encontrado.' })

		// Proceed with deletion if the template exists
		await templateModel.remove(id)

		// Uncomment to log the action in movementScheme
		const categoryName = await CategoryModel.findNameCategoryById({ id: associations[0].id_category_fk })

		await movementScheme.create({
			action: `El adminitrador ${user.username} eliminó el formato ${categoryName}`,
			targetType: 'formatos',
			targetId: id,
			id_user_fk: req.user.id,
		})

		res.status(200).json({ message: 'Removiste el formato exitosamente.' })
	} catch (error) {
		res.status(500).json({ message: '¡Ops! Ha ocurrido un error. Por favor, inténtalo de nuevo.' })
	}
}

async function removeTags(req, res) {
	const { id } = req.params

	try {
		// Fetch all associations for the given template ID
		const associations = await relation_tag_template_Scheme.findAll({
			where: {
				id_relation_tag_template: id,
			},
		})

		// If there are no associations, return with a 404 status
		if (!associations) {
			return res.status(404).json({ message: 'No se encontraron etiquetas asociadas.' })
		}

		await relation_tag_template_Scheme.destroy({
			where: {
				id_relation_tag_template: id,
			},
		})

		res.status(200).json({ message: 'Removiste la asociación de la etiqueta exitosamente.' })
	} catch (error) {
		res.status(500).json({ message: '¡Ops! Ha ocurrido un error. Por favor, inténtalo de nuevo.' })
	}
}

export { getById, getAll, create, update, remove, removeTags }
