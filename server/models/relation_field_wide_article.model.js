import { relation_field_wide_article_Scheme } from './postgresql/schemes.js'

export class relation_field_wide_article_Model {
	static async getAll() {
		try {
			const allwide = await relation_field_wide_article_Scheme.findAll()
			return allwide
		} catch (error) {
			throw new Error('Error fetching all relations field_wide article: ' + error.message)
		}
	}

	static async getById({ id }) {
		try {
			const one_relation_field_wide_article = await relation_field_wide_article_Scheme.findByPk(id)
			return one_relation_field_wide_article
		} catch (error) {
			throw new Error('Error fetching relation field_wide article by id: ' + error.message)
		}
	}

	static async create({ id_article_fk, id_field_wide_fk, description }) {
		try {
			const newArticlefield_wide = await relation_field_wide_article_Scheme.create({
				id_article_fk,
				id_field_wide_fk,
				description,
			})
			return newArticlefield_wide
		} catch (error) {
			throw new Error('Error creating article field_wide: ' + error.message)
		}
	}
	static async update({ id, input }) {
		try {
			const relationfield_wideArticle = await relation_field_wide_article_Scheme.findByPk(id)
			const data = await relationfield_wideArticle.update(input)
			return data
		} catch (error) {
			throw new Error('Error updating relation field_wide article: ' + error.message)
		}
	}

	static async check_exists_field_wide_id({ id }) {
		try {
			const field_wide = await relation_field_wide_article_Scheme.findOne({
				where: { id_field_wide_fk: id },
			})
			return field_wide !== null
		} catch (error) {
			throw new Error('Error checking field_wide: ' + error.message)
		}
	}
}
