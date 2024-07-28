import { relaction_user_facultyScheme } from './postgresql/schemes.js'

export class relation_faculty_article_Model {
	static async getAll() {
		try {
			const all_relations = await relaction_user_facultyScheme.findAll()
			return all_relations
		} catch (error) {
			throw new Error('Error fetching all relations faculty article: ' + error.message)
		}
	}

	static async getById({ id }) {
		try {
			const one_relation_faculty_article = await relaction_user_facultyScheme.findByPk(id)
			return one_relation_faculty_article
		} catch (error) {
			throw new Error('Error fetching relation faculty article by id: ' + error.message)
		}
	}

	static async create({ id_article_fk, id_faculty_fk, description }) {
		try {
			const newArticlefaculty = await relaction_user_facultyScheme.create({
				id_article_fk,
				id_faculty_fk,
				description,
			})
			return newArticlefaculty
		} catch (error) {
			throw new Error('Error creating article faculty: ' + error.message)
		}
	}
	static async update({ id, input }) {
		try {
			const relationfacultyArticle = await relaction_user_facultyScheme.findByPk(id)
			const data = await relationfacultyArticle.update(input)
			return data
		} catch (error) {
			throw new Error('Error updating relation faculty article: ' + error.message)
		}
	}

	static async check_exists_faculty_id({ id }) {
		try {
			const faculty = await relaction_user_facultyScheme.findOne({
				where: { id_faculty_fk: id },
			})
			return faculty !== null
		} catch (error) {
			throw new Error('Error checking faculty: ' + error.message)
		}
	}
}
