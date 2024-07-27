import { tagScheme } from './postgresql/schemes.js'

export class TagModel {
	static async getAll() {
		try {
			const allTags = await tagScheme.findAll({
				order: [['updatedAt', 'DESC']],
			})
			return allTags
		} catch (error) {
			throw new Error('Error fetching tags: ' + error.message)
		}
	}

	static async getById({ id }) {
		try {
			const tag = await tagScheme.findByPk(id)
			return tag
		} catch (error) {
			throw new Error('Error fetching tag by id: ' + error.message)
		}
	}

	static async create({ data }) {
		try {
			const newTag = await tagScheme.create(data)
			return newTag
		} catch (error) {
			throw new Error('Error creating tag: ' + error.message)
		}
	}

	static async update({ id, input }) {
		try {
			const tag = await tagScheme.findByPk(id)

			/*
			if (!tag?.active) {
				throw new Error('Tag not found')
			}
			*/

			await tag.update(input)

			return tag
		} catch (error) {
			throw new Error('Error updating tag: ' + error.message)
		}
	}

	static async delete({ id, reactivate = false }) {
		try {
			const tag = await tagScheme.findByPk(id)

			if (!tag) {
				throw new Error('User not found')
			}

			if (reactivate) {
				tag.active = true
			} else {
				tag.active = false
			}

			await tag.save()

			return true
		} catch (error) {
			throw new Error('Error deleting user')
		}
	}

	static async reactive({ id, reactivate = false }) {
		try {
			const user = await tagScheme.findByPk(id)

			if (reactivate) {
				user.active = false
			} else {
				user.active = true
			}

			await user.save()

			return true
		} catch (error) {
			throw new Error('Error deleting user')
		}
	}

	static async findName(id) {
		try {
			const tag = await tagScheme.findByPk(id)

			if (!tag) {
				throw new Error('Tag not found')
			}

			return tag.name
		} catch (error) {
			throw new Error('Error finding tag name by ID: ' + error.message)
		}
	}

	static async findNameTag(name) {
		try {
			const tag = await tagScheme.findOne({ where: { name } })
			return tag
		} catch (error) {
			throw new Error('Error finding tag by name')
		}
	}

	static async findDescriptionTag(description) {
		try {
			const user = await tagScheme.findOne({ where: { description } })
			return user
		} catch (error) {
			throw new Error('Error finding tag by description')
		}
	}

	static async findNameTagById({ id }) {
		try {
			const tag = await tagScheme.findByPk(id)
			if (!tag) {
				return null
			}
			return tag.name
		} catch (error) {
			throw new Error('Error finding tag name by ID: ' + error.message)
		}
	}

	static async getNameById(id) {
		try {
			const tag = await tagScheme.findByPk(id)
			return tag.name
		} catch (error) {
			throw new Error('Error finding tag by ID: ' + error.message)
		}
	}

	static async isActive({ id }) {
		try {
			const tag = await tagScheme.findByPk(id)
			return tag.active === true
		} catch (error) {
			throw new Error('Error fetching tag status by id: ' + error.message)
		}
	}
}

tagScheme.afterSync(async () => {
	try {
		// Verificar si ya existe algún usuario
		const existingData = await tagScheme.findOne()
		if (!existingData) {
			const data = [
				{
					name: 'Código ISBN',
					description: 'Número estándar internacional que identifica un libro o publicación impresa de manera única.',
				},
				{
					name: 'Editor compilador',
					description:
						'Nombre de la persona o entidad que recopiló, editó o compiló el contenido del libro o artículo.',
				},
				{
					name: 'Capitulo de libro',
					description:
						'Número o título del capítulo específico dentro de un libro en el que se encuentra el artículo o documento.',
				},
				{
					name: 'Paginas',
					description: 'Rango de páginas en el que aparece el artículo o capítulo dentro de la publicación.',
				},
				{
					name: 'Revisados por pares',
					description:
						'Indica si el artículo ha sido evaluado y aprobado por expertos en el campo antes de su publicación.',
				},
				{
					name: 'Link editorial',
					description: 'Enlace a la página del editor o editorial que publica el artículo o libro.',
				},
				{ name: 'Link de descarga', description: 'Enlace directo para descargar el artículo o documento completo.' },
				{
					name: 'Link revista',
					description: 'Enlace a la página web de la revista donde se ha publicado el artículo.',
				},
				{ name: 'Link publicación', description: 'Enlace directo a la publicación en línea del artículo o libro.' },
				{ name: 'Nombre revista', description: 'Nombre de la revista en la que se ha publicado el artículo.' },
				{
					name: 'Código ISSN',
					description:
						'Número estándar internacional que identifica una revista o publicación periódica de manera única.',
				},
				{
					name: 'Base datos indexada',
					description:
						'Nombre de la base de datos en la que el artículo o publicación está indexado para su búsqueda y recuperación.',
				},
				{ name: 'Número revista', description: 'Número específico de la revista en la que se publicó el artículo.' },
				{
					name: 'Impacto',
					description:
						'Medida del impacto o relevancia del artículo en el campo académico. Puede ser clasificado como Mundial o Regional.',
				},
				{
					name: 'Cantidad de impacto',
					description:
						'Número específico que representa el impacto cuantitativo del artículo, como el número de citas recibidas. Solo es relevante si el impacto se clasifica como Mundial.',
				},
				{
					name: 'Cuartil',
					description:
						'Clasificación del artículo o revista en cuartiles según su impacto y relevancia en el campo académico.',
				},
			]

			// Iterar sobre los datos y crear cada registro
			for (const dataDefault of data) {
				await tagScheme.create(dataDefault)
			}
		}
	} catch (error) {
		console.error('Error inserting default:', error)
	}
})
