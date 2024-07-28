import { field_specific_Scheme } from './postgresql/schemes.js'

export class field_specific_Model {
	static async getAll() {
		try {
			const field_specific = await field_specific_Scheme.findAll({
				order: [['updatedAt', 'DESC']],
			})
			return field_specific
		} catch (error) {
			throw new Error('Error fetching field_specific: ' + error.message)
		}
	}

	static async getById(id) {
		try {
			const field_specific = await field_specific_Scheme.findByPk(id)
			return field_specific
		} catch (error) {
			throw new Error('Error fetching field_specific by id: ' + error.message)
		}
	}

	static async create(data) {
		try {
			const field_specific = await field_specific_Scheme.create(data)
			return field_specific
		} catch (error) {
			throw new Error('Error creating field_specific: ' + error.message)
		}
	}

	static async update(id, data) {
		try {
			const field_specific = await field_specific_Scheme.findByPk(id)
			await field_specific.update(data)
			return field_specific
		} catch (error) {
			throw new Error('Error updating field_specific: ' + error.message)
		}
	}

	static async delete(id) {
		try {
			const field_specific = await field_specific_Scheme.findByPk(id)
			await field_specific.destroy()
		} catch (error) {
			throw new Error('Error al eliminar el rol')
		}
	}

	static async getByName(name) {
		try {
			const field_specific = await field_specific_Scheme.findOne({
				where: { name },
			})
			return field_specific
		} catch (error) {
			throw new Error('Error finding field_specific by name')
		}
	}

	static async getNameById(id) {
		try {
			const field_specific = await field_specific_Scheme.findByPk(id)
			return field_specific.name
		} catch (error) {
			throw new Error('Error finding field_specific by ID: ' + error.message)
		}
	}
}

field_specific_Scheme.afterSync(async () => {
	try {
		// Verificar si ya existe algún usuario
		const existingData = await field_specific_Scheme.findOne()
		if (!existingData) {
			const data = [{ name: 'Salud' }, { name: 'Agricultura' }]

			// Iterar sobre los datos y crear cada registro
			for (const datas of data) {
				await field_specific_Scheme.create(datas)
			}
		}
	} catch (error) {
		console.error('Error inserting default fileds specifics:', error)
	}
})
