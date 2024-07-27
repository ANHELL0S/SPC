import { movementScheme } from '../models/postgresql/schemes.js'
import { UserModel } from '../models/users.model.js'
import { TagModel } from '../models/tags.model.js'
import { CategoryModel } from '../models/categories.model.js'

// FIXME erro en los movements, el erroe radica en function getTargetName
async function getTargetName(targetId, targetType) {
	try {
		let targetName = ''

		if (targetType === 'usuarios') {
			const user = await UserModel.getById({ id: targetId })
			if (user) {
				targetName = user.username
			}
		} else if (targetType === 'etiquetas') {
			const tag = await TagModel.getById({ id: targetId })
			if (tag) {
				targetName = tag.name
			}
		} else if (targetType === 'categorias') {
			const category = await CategoryModel.getById({ id: targetId })
			if (category) {
				targetName = category.name
			}
		}

		return targetName
	} catch (error) {
		throw new Error('Error fetching target name: ' + error.message)
	}
}

export async function getById(req, res) {
	const { id } = req.params

	try {
		const movement = await movementScheme.findOne({ where: { id_user_fk: id } })
		res.json(movement)
	} catch (error) {
		res.status(500).json({ message: 'Error fetching movement by id' })
	}
}

export async function getAll(req, res) {
	try {
		const movements = await movementScheme.findAll()
		res.json(movements)
	} catch (error) {
		res.status(500).json({ message: 'Error fetching movements' })
	}
}
