import { field_wide_Scheme } from './postgresql/schemes.js'

export class field_wide_Model {
	static async getAll() {
		try {
			const field_wide = await field_wide_Scheme.findAll({
				order: [['updatedAt', 'DESC']],
			})
			return field_wide
		} catch (error) {
			throw new Error('Error fetching faculties: ' + error.message)
		}
	}

	static async getById(id) {
		try {
			const field_wide = await field_wide_Scheme.findByPk(id)
			return field_wide
		} catch (error) {
			throw new Error('Error fetching field_wide by id: ' + error.message)
		}
	}

	static async create(data) {
		try {
			const field_wide = await field_wide_Scheme.create(data)
			return field_wide
		} catch (error) {
			throw new Error('Error creating field_wide: ' + error.message)
		}
	}

	static async update(id, data) {
		try {
			const field_wide = await field_wide_Scheme.findByPk(id)
			await field_wide.update(data)
			return field_wide
		} catch (error) {
			throw new Error('Error updating field_wide: ' + error.message)
		}
	}

	static async delete(id) {
		try {
			const field_wide = await field_wide_Scheme.findByPk(id)
			await field_wide.destroy()
		} catch (error) {
			throw new Error('Error al eliminar el rol')
		}
	}

	static async getByName(name) {
		try {
			const field_wide = await field_wide_Scheme.findOne({
				where: { name },
			})
			return field_wide
		} catch (error) {
			throw new Error('Error finding field_wide by name')
		}
	}

	static async getNameById(id) {
		try {
			const field_wide = await field_wide_Scheme.findByPk(id)
			return field_wide.name
		} catch (error) {
			throw new Error('Error finding field_wide by ID: ' + error.message)
		}
	}
}

field_wide_Scheme.afterSync(async () => {
	try {
		// Verificar si ya existe algún usuario
		const existingData = await field_wide_Scheme.findOne()
		if (!existingData) {
			const data = [{ name: 'Salud y bienestar' }, { name: 'Agricultura, silvicultura, pesca y veterinaria' }]

			// Iterar sobre los datos y crear cada registro
			for (const datas of data) {
				await field_wide_Scheme.create(datas)
			}
		}
	} catch (error) {
		console.error('Error inserting default fileds dependences:', error)
	}
})
