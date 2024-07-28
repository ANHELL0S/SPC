import { dbIndexScheme } from './postgresql/schemes.js'

export class db_indexModel {
	static async getAll() {
		try {
			const db_index = await dbIndexScheme.findAll({
				order: [['updatedAt', 'DESC']],
			})
			return db_index
		} catch (error) {
			throw new Error('Error fetching db_index: ' + error.message)
		}
	}

	static async getById(id) {
		try {
			const db_index = await dbIndexScheme.findByPk(id)
			return db_index
		} catch (error) {
			throw new Error('Error fetching db_index by id: ' + error.message)
		}
	}

	static async create(data) {
		try {
			const db_index = await dbIndexScheme.create(data)
			return db_index
		} catch (error) {
			throw new Error('Error creating db_index: ' + error.message)
		}
	}

	static async update(id, data) {
		try {
			const db_index = await dbIndexScheme.findByPk(id)
			await db_index.update(data)
			return db_index
		} catch (error) {
			throw new Error('Error updating db_index: ' + error.message)
		}
	}

	static async delete(id) {
		try {
			const db_index = await dbIndexScheme.findByPk(id)
			await db_index.destroy()
		} catch (error) {
			throw new Error('Error al eliminar el rol')
		}
	}

	static async getByName(name) {
		try {
			const db_index = await dbIndexScheme.findOne({
				where: { name },
			})
			return db_index
		} catch (error) {
			throw new Error('Error finding db_index by name')
		}
	}

	static async getNameById(id) {
		try {
			const db_index = await dbIndexScheme.findByPk(id)
			return db_index.name
		} catch (error) {
			throw new Error('Error al obtener el nombre de la la base datos indexada por ID: ' + error.message)
		}
	}
}

dbIndexScheme.afterSync(async () => {
	try {
		const existingData = await dbIndexScheme.findOne()
		if (!existingData) {
			const data_default = [{ name: 'Erihplus' }, { name: 'Scopus' }]

			// Iterar sobre los datos y crear cada registro
			for (const data of data_default) {
				await dbIndexScheme.create(data)
			}
		}
	} catch (error) {
		console.error('Error inserting default magazines:', error)
	}
})
