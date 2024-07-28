import { lineResearchScheme } from './postgresql/schemes.js'

export class lineResearchModel {
	static async getAll() {
		try {
			const faculty = await lineResearchScheme.findAll({
				order: [['updatedAt', 'DESC']],
			})
			return faculty
		} catch (error) {
			throw new Error('Error fetching faculties: ' + error.message)
		}
	}

	static async getById(id) {
		try {
			const faculty = await lineResearchScheme.findByPk(id)
			return faculty
		} catch (error) {
			throw new Error('Error fetching faculty by id: ' + error.message)
		}
	}

	static async create(data) {
		try {
			const faculty = await lineResearchScheme.create(data)
			return faculty
		} catch (error) {
			throw new Error('Error creating faculty: ' + error.message)
		}
	}

	static async update(id, data) {
		try {
			const faculty = await lineResearchScheme.findByPk(id)
			await faculty.update(data)
			return faculty
		} catch (error) {
			throw new Error('Error updating faculty: ' + error.message)
		}
	}

	static async delete(id) {
		try {
			const faculty = await lineResearchScheme.findByPk(id)
			await faculty.destroy()
		} catch (error) {
			throw new Error('Error al eliminar el rol')
		}
	}

	static async getByName(name) {
		try {
			const faculty = await lineResearchScheme.findOne({
				where: { name },
			})
			return faculty
		} catch (error) {
			throw new Error('Error finding faculty by name')
		}
	}

	static async getNameById(id) {
		try {
			const line_research = await lineResearchScheme.findByPk(id)
			return line_research.name
		} catch (error) {
			throw new Error('Error al obtener el nombre de la linea de investigacion por ID: ' + error.message)
		}
	}
}

lineResearchScheme.afterSync(async () => {
	try {
		const existingData = await lineResearchScheme.findOne()
		if (!existingData) {
			const data_default = [
				{ name: 'Salud y bienestar humano' },
				{ name: 'Biotecnología vegetal, animal y de los alimentos' },
			]

			// Iterar sobre los datos y crear cada registro
			for (const data of data_default) {
				await lineResearchScheme.create(data)
			}
		}
	} catch (error) {
		console.error('Error inserting default line research:', error)
	}
})
