import { facultyScheme } from './postgresql/schemes.js'

export class facultyModel {
	static async getAll() {
		try {
			const faculty = await facultyScheme.findAll({
				order: [['updatedAt', 'DESC']],
			})
			return faculty
		} catch (error) {
			throw new Error('Error fetching faculties: ' + error.message)
		}
	}

	static async getById(id) {
		try {
			const faculty = await facultyScheme.findByPk(id)
			return faculty
		} catch (error) {
			throw new Error('Error fetching faculty by id: ' + error.message)
		}
	}

	static async create(data) {
		try {
			const faculty = await facultyScheme.create(data)
			return faculty
		} catch (error) {
			throw new Error('Error creating faculty: ' + error.message)
		}
	}

	static async update(id, data) {
		try {
			const faculty = await facultyScheme.findByPk(id)
			await faculty.update(data)
			return faculty
		} catch (error) {
			throw new Error('Error updating faculty: ' + error.message)
		}
	}

	static async delete(id) {
		try {
			const faculty = await facultyScheme.findByPk(id)
			await faculty.destroy()
		} catch (error) {
			throw new Error('Error al eliminar el rol')
		}
	}

	static async getByName(name) {
		try {
			const faculty = await facultyScheme.findOne({
				where: { name },
			})
			return faculty
		} catch (error) {
			throw new Error('Error finding faculty by name')
		}
	}

	static async getNameById(id) {
		try {
			const field_dependence = await facultyScheme.findByPk(id)
			return field_dependence.name
		} catch (error) {
			throw new Error('Error finding field_dependence by ID: ' + error.message)
		}
	}
}

facultyScheme.afterSync(async () => {
	try {
		// Verificar si ya existe algún usuario
		const existingMagazine = await facultyScheme.findOne()
		if (!existingMagazine) {
			const magazinesData = [
				{ name: 'Facultad de Ciencias Administrativas, Gestión Empresarial e Informática' },
				{ name: 'Facultad de Jurisprudencia, Ciencias Sociales y Políticas' },
				{ name: 'Facultad de Ciencias de la Educación, Sociales, Filosóficas y Humanísticas' },
				{ name: 'Facultad de Ciencias Agropecuarias, Recursos Naturales y del Ambiente' },
				{ name: 'Facultad de Ciencias de la Salud y del Ser Humano' },
				{ name: 'Extensión Universitaria de San Miguel' },
			]

			// Iterar sobre los datos y crear cada registro
			for (const magazineData of magazinesData) {
				await facultyScheme.create(magazineData)
			}
		}
	} catch (error) {
		console.error('Error inserting default faculties:', error)
	}
})
