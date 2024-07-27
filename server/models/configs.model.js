import { configScheme } from './postgresql/schemes.js'

export class ConfigModel {
	static async getAll() {
		try {
			const allConfig = await configScheme.findAll()
			return allConfig
		} catch (error) {
			throw new Error('Error fetching config: ' + error.message)
		}
	}

	static async update({ id, input }) {
		try {
			const config = await configScheme.findByPk(id)

			await config.update(input)

			return config
		} catch (error) {
			throw new Error('Error updating config: ' + error.message)
		}
	}
}

const Config = configScheme

// Hook afterSync para insertar valores predeterminados después de crear la tabla
Config.afterSync(async () => {
	try {
		// Insertar valores predeterminados si la tabla está recién creada
		const existingConfig = await Config.findOne()
		if (!existingConfig) {
			await Config.create({
				name_institution: 'Universidad Estatal de Bolívar',
				abbreviation: 'UEB',
				slogan: 'La Universidad que queremos',
				link_fb: 'https://www.facebook.com/ueboficial',
				link_ig: 'https://www.instagram.com/ueboficial_ec',
				link_x: 'https://twitter.com/ueboficial_ec',
				link_yt: 'https://www.youtube.com/channel/UCml4cc2U6oWm7jG9iayK3UA/videos',
			})
		}
	} catch (error) {
		console.error('Error inserting default values:', error)
	}
})

export { Config }
