import { field_detailed_Scheme } from './postgresql/schemes.js'

export class field_detailed_Model {
	static async getAll() {
		try {
			const field_detailed = await field_detailed_Scheme.findAll({
				order: [['updatedAt', 'DESC']],
			})
			return field_detailed
		} catch (error) {
			throw new Error('Error fetching field_detailed: ' + error.message)
		}
	}

	static async getById(id) {
		try {
			const field_detailed = await field_detailed_Scheme.findByPk(id)
			return field_detailed
		} catch (error) {
			throw new Error('Error fetching field_detailed by id: ' + error.message)
		}
	}

	static async create(data) {
		try {
			const field_detailed = await field_detailed_Scheme.create(data)
			return field_detailed
		} catch (error) {
			throw new Error('Error creating field_detailed: ' + error.message)
		}
	}

	static async update(id, data) {
		try {
			const field_detailed = await field_detailed_Scheme.findByPk(id)
			await field_detailed.update(data)
			return field_detailed
		} catch (error) {
			throw new Error('Error updating field_detailed: ' + error.message)
		}
	}

	static async delete(id) {
		try {
			const field_detailed = await field_detailed_Scheme.findByPk(id)
			await field_detailed.destroy()
		} catch (error) {
			throw new Error('Error al eliminar el rol')
		}
	}

	static async getByName(name) {
		try {
			const field_detailed = await field_detailed_Scheme.findOne({
				where: { name },
			})
			return field_detailed
		} catch (error) {
			throw new Error('Error finding field_detailed by name')
		}
	}

	static async getNameById(id) {
		try {
			const field_detailed = await field_detailed_Scheme.findByPk(id)
			return field_detailed.name
		} catch (error) {
			throw new Error('Error finding field_detailed by ID: ' + error.message)
		}
	}
}

field_detailed_Scheme.afterSync(async () => {
	try {
		// Verificar si ya existe algún usuario
		const existingData = await field_detailed_Scheme.findOne()
		if (!existingData) {
			const data = [{ name: 'Salud pública' }, { name: 'Producción agrícola y ganadera' }]

			// Iterar sobre los datos y crear cada registro
			for (const datas of data) {
				await field_detailed_Scheme.create(datas)
			}
		}
	} catch (error) {
		console.error('Error inserting default fileds detaileds:', error)
	}
})
