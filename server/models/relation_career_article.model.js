import { relation_career_article_Scheme } from './postgresql/schemes.js'

export class relation_career_article_Model {
	static async getAll() {
		try {
			const all_relations = await relation_career_article_Scheme.findAll()
			return all_relations
		} catch (error) {
			throw new Error('Error fetching all relations career article: ' + error.message)
		}
	}

	static async getById({ id }) {
		try {
			const one_relation_career_article = await relation_career_article_Scheme.findByPk(id)
			return one_relation_career_article
		} catch (error) {
			throw new Error('Error fetching relation career article by id: ' + error.message)
		}
	}

	static async create({ id_article_fk, id_career_fk, description }) {
		try {
			const newArticlecareer = await relation_career_article_Scheme.create({
				id_article_fk,
				id_career_fk,
				description,
			})
			return newArticlecareer
		} catch (error) {
			throw new Error('Error creating article career: ' + error.message)
		}
	}
	static async update({ id, input }) {
		try {
			const relationcareerArticle = await relation_career_article_Scheme.findByPk(id)
			const data = await relationcareerArticle.update(input)
			return data
		} catch (error) {
			throw new Error('Error updating relation career article: ' + error.message)
		}
	}

	static async check_exists_career_id({ id }) {
		try {
			const career = await relation_career_article_Scheme.findOne({
				where: { id_career_fk: id },
			})
			return career !== null
		} catch (error) {
			throw new Error('Error checking career: ' + error.message)
		}
	}
}
