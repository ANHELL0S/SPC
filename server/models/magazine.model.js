import { magazineScheme } from './postgresql/schemes.js'

export class magazineModel {
	static async getAll() {
		try {
			const magazine = await magazineScheme.findAll({
				order: [['updatedAt', 'DESC']],
			})
			return magazine
		} catch (error) {
			throw new Error('Error fetching magazine: ' + error.message)
		}
	}

	static async getById(id) {
		try {
			const magazine = await magazineScheme.findByPk(id)
			return magazine
		} catch (error) {
			throw new Error('Error fetching magazine by id: ' + error.message)
		}
	}

	static async create(data) {
		try {
			const magazine = await magazineScheme.create(data)
			return magazine
		} catch (error) {
			throw new Error('Error creating magazine: ' + error.message)
		}
	}

	static async update(id, data) {
		try {
			const magazine = await magazineScheme.findByPk(id)
			await magazine.update(data)
			return magazine
		} catch (error) {
			throw new Error('Error updating magazine: ' + error.message)
		}
	}

	static async delete(id) {
		try {
			const magazine = await magazineScheme.findByPk(id)
			await magazine.destroy()
		} catch (error) {
			throw new Error('Error al eliminar el rol')
		}
	}

	static async getByName(name) {
		try {
			const magazine = await magazineScheme.findOne({
				where: { name },
			})
			return magazine
		} catch (error) {
			throw new Error('Error finding magazine by name')
		}
	}

	static async getNameById(id) {
		try {
			const magazine = await magazineScheme.findByPk(id)
			return magazine.name
		} catch (error) {
			throw new Error('Error al obtener el nombre de la revista por ID: ' + error.message)
		}
	}
}

magazineScheme.afterSync(async () => {
	try {
		const existingData = await magazineScheme.findOne()
		if (!existingData) {
			const data_default = [
				{ name: 'Migration Letters' },
				{ name: 'Journal of Medicinal and Pharmaceutical Chemistry Research' },
			]

			// Iterar sobre los datos y crear cada registro
			for (const data of data_default) {
				await magazineScheme.create(data)
			}
		}
	} catch (error) {
		console.error('Error inserting default magazines:', error)
	}
})
