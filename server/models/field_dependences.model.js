import { field_dependence_Scheme } from './postgresql/schemes.js'

export class field_dependence_Model {
	static async getAll() {
		try {
			const field_dependence = await field_dependence_Scheme.findAll({
				order: [['updatedAt', 'DESC']],
			})
			return field_dependence
		} catch (error) {
			throw new Error('Error fetching faculties: ' + error.message)
		}
	}

	static async getById(id) {
		try {
			const field_dependence = await field_dependence_Scheme.findByPk(id)
			return field_dependence
		} catch (error) {
			throw new Error('Error fetching field_dependence by id: ' + error.message)
		}
	}

	static async create(data) {
		try {
			const field_dependence = await field_dependence_Scheme.create(data)
			return field_dependence
		} catch (error) {
			throw new Error('Error creating field_dependence: ' + error.message)
		}
	}

	static async update(id, data) {
		try {
			const field_dependence = await field_dependence_Scheme.findByPk(id)
			await field_dependence.update(data)
			return field_dependence
		} catch (error) {
			throw new Error('Error updating field_dependence: ' + error.message)
		}
	}

	static async delete(id) {
		try {
			const field_dependence = await field_dependence_Scheme.findByPk(id)
			await field_dependence.destroy()
		} catch (error) {
			throw new Error('Error al eliminar el rol')
		}
	}

	static async getByName(name) {
		try {
			const field_dependence = await field_dependence_Scheme.findOne({
				where: { name },
			})
			return field_dependence
		} catch (error) {
			throw new Error('Error finding field_dependence by name')
		}
	}

	static async getNameById(id) {
		try {
			const field_dependence = await field_dependence_Scheme.findByPk(id)
			return field_dependence.name
		} catch (error) {
			throw new Error('Error finding field_dependence by ID: ' + error.message)
		}
	}
}

field_dependence_Scheme.afterSync(async () => {
	try {
		// Verificar si ya existe algún usuario
		const existingData = await field_dependence_Scheme.findOne()
		if (!existingData) {
			const data = [{ name: 'Salud y del ser humano' }, { name: 'Agropecuarias, recursos naturales y del ambiente' }]

			// Iterar sobre los datos y crear cada registro
			for (const datas of data) {
				await field_dependence_Scheme.create(datas)
			}
		}
	} catch (error) {
		console.error('Error inserting default fileds dependences:', error)
	}
})
