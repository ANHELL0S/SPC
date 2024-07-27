import { relation_field_dependence_article_Scheme } from './postgresql/schemes.js'

export class relation_field_dependence_article_Model {
	static async getAll() {
		try {
			const all_relations = await relation_field_dependence_article_Scheme.findAll()
			return all_relations
		} catch (error) {
			throw new Error('Error fetching all relations field_dependence article: ' + error.message)
		}
	}

	static async getById({ id }) {
		try {
			const one_relation_field_dependence_article = await relation_field_dependence_article_Scheme.findByPk(id)
			return one_relation_field_dependence_article
		} catch (error) {
			throw new Error('Error fetching relation field_dependence article by id: ' + error.message)
		}
	}

	static async create({ id_article_fk, id_field_dependence_fk, description }) {
		try {
			const newArticlefield_dependence = await relation_field_dependence_article_Scheme.create({
				id_article_fk,
				id_field_dependence_fk,
				description,
			})
			return newArticlefield_dependence
		} catch (error) {
			throw new Error('Error creating article field_dependence: ' + error.message)
		}
	}
	static async update({ id, input }) {
		try {
			const relationfield_dependenceArticle = await relation_field_dependence_article_Scheme.findByPk(id)
			const data = await relationfield_dependenceArticle.update(input)
			return data
		} catch (error) {
			throw new Error('Error updating relation field_dependence article: ' + error.message)
		}
	}

	static async check_exists_field_dependence_id({ id }) {
		try {
			const field_dependence = await relation_field_dependence_article_Scheme.findOne({
				where: { id_field_dependence_fk: id },
			})
			return field_dependence !== null
		} catch (error) {
			throw new Error('Error checking field_dependence: ' + error.message)
		}
	}
}
