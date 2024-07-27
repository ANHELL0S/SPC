import { relation_field_details_article_Scheme } from './postgresql/schemes.js'

export class relation_field_detailed_article_Model {
	static async getAll() {
		try {
			const all_relations = await relation_field_details_article_Scheme.findAll()
			return all_relations
		} catch (error) {
			throw new Error('Error fetching all relations field_detailed article: ' + error.message)
		}
	}

	static async getById({ id }) {
		try {
			const one_relation_field_detailed_article = await relation_field_details_article_Scheme.findByPk(id)
			return one_relation_field_detailed_article
		} catch (error) {
			throw new Error('Error fetching relation field_detailed article by id: ' + error.message)
		}
	}

	static async create({ id_article_fk, id_field_detailed_fk, description }) {
		try {
			const newArticlefield_detailed = await relation_field_details_article_Scheme.create({
				id_article_fk,
				id_field_detailed_fk,
				description,
			})
			return newArticlefield_detailed
		} catch (error) {
			throw new Error('Error creating article field_detailed: ' + error.message)
		}
	}
	static async update({ id, input }) {
		try {
			const relationfield_detailedArticle = await relation_field_details_article_Scheme.findByPk(id)
			const data = await relationfield_detailedArticle.update(input)
			return data
		} catch (error) {
			throw new Error('Error updating relation field_detailed article: ' + error.message)
		}
	}

	static async check_exists_field_detailed_id({ id }) {
		try {
			const field_detailed = await relation_field_details_article_Scheme.findOne({
				where: { id_field_detailed_fk: id },
			})
			return field_detailed !== null
		} catch (error) {
			throw new Error('Error checking field_detailed: ' + error.message)
		}
	}
}
