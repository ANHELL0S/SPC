import { relation_field_specific_article_Scheme } from './postgresql/schemes.js'

export class relation_field_specific_article_Model {
	static async getAll() {
		try {
			const allspecific = await relation_field_specific_article_Scheme.findAll()
			return allspecific
		} catch (error) {
			throw new Error('Error fetching all relations field_specific article: ' + error.message)
		}
	}

	static async getById({ id }) {
		try {
			const one_relation_field_specific_article = await relation_field_specific_article_Scheme.findByPk(id)
			return one_relation_field_specific_article
		} catch (error) {
			throw new Error('Error fetching relation field_specific article by id: ' + error.message)
		}
	}

	static async create({ id_article_fk, id_field_specific_fk, description }) {
		try {
			const newArticlefield_specific = await relation_field_specific_article_Scheme.create({
				id_article_fk,
				id_field_specific_fk,
				description,
			})
			return newArticlefield_specific
		} catch (error) {
			throw new Error('Error creating article field_specific: ' + error.message)
		}
	}
	static async update({ id, input }) {
		try {
			const relationfield_specificArticle = await relation_field_specific_article_Scheme.findByPk(id)
			const data = await relationfield_specificArticle.update(input)
			return data
		} catch (error) {
			throw new Error('Error updating relation field_specific article: ' + error.message)
		}
	}

	static async check_exists_field_specific_id({ id }) {
		try {
			const field_specific = await relation_field_specific_article_Scheme.findOne({
				where: { id_field_specific_fk: id },
			})
			return field_specific !== null
		} catch (error) {
			throw new Error('Error checking field_specific: ' + error.message)
		}
	}
}
