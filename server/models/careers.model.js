import { career_Scheme } from './postgresql/schemes.js'

export class careerModel {
	static async getAll() {
		try {
			const career = await career_Scheme.findAll({
				order: [['updatedAt', 'DESC']],
			})
			return career
		} catch (error) {
			throw new Error('Error fetching career: ' + error.message)
		}
	}

	static async getById(id) {
		try {
			const career = await career_Scheme.findByPk(id)
			return career
		} catch (error) {
			throw new Error('Error fetching career by id: ' + error.message)
		}
	}

	static async create(data) {
		try {
			const career = await career_Scheme.create(data)
			return career
		} catch (error) {
			throw new Error('Error creating career: ' + error.message)
		}
	}

	static async update(id, data) {
		try {
			const career = await career_Scheme.findByPk(id)
			await career.update(data)
			return career
		} catch (error) {
			throw new Error('Error updating career: ' + error.message)
		}
	}

	static async delete(id) {
		try {
			const career = await career_Scheme.findByPk(id)
			await career.destroy()
		} catch (error) {
			throw new Error('Error al eliminar el rol')
		}
	}

	static async getByName(name) {
		try {
			const career = await career_Scheme.findOne({
				where: { name },
			})
			return career
		} catch (error) {
			throw new Error('Error finding career by name')
		}
	}

	static async getNameById(id) {
		try {
			const career = await career_Scheme.findByPk(id)
			return career.name
		} catch (error) {
			throw new Error('Error al obtener el nombre de la la base datos indexada por ID: ' + error.message)
		}
	}
}

career_Scheme.afterSync(async () => {
	try {
		const existingData = await career_Scheme.findOne()
		if (!existingData) {
			const data_default = [
				{ name: 'Ciencias de la educación mención inglés' },
				{ name: 'Gestión del talento humano' },
				{ name: 'Ingeniería en riesgos de desastres' },
				{ name: 'Enfermería' },
				{ name: 'Terapia física' },
				{ name: 'Ciencias del fuego y seguridad contra incendios' },
				{ name: 'Educación Básica' },
				{ name: 'Educación Inicial' },
				{ name: 'Educación Intercultural bilingue' },
				{ name: 'Software' },
				{ name: 'Derecho' },
				{ name: 'Agroindustria' },
				{ name: 'Agronomía' },
				{ name: 'Medicina veterinaria' },
				{ name: 'Mercadotecnia y publicidad' },
				{ name: 'Sociología' },
				{ name: 'Emprendimiento e innovación social' },
				{ name: 'Pedagogía de las ciencias experimentales' },
				{ name: 'Turismo y hotelería' },
				{ name: 'Contabilidad y auditoría' },
				{ name: 'Comunicación' },
				{ name: 'Administración de empresas' },
				{ name: 'Tecnologías de la información' },
				{ name: 'Pedagogía de los idiomas nacionales y extranjeros' },
				{ name: 'Marketing digitalicación' },
				{ name: 'Criminalística' },
			]

			// Iterar sobre los datos y crear cada registro
			for (const data of data_default) {
				await career_Scheme.create(data)
			}
		}
	} catch (error) {
		console.error('Error inserting default magazines:', error)
	}
})
