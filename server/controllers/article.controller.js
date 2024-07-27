import { TagModel } from '../models/tags.model.js'
import { UserModel } from '../models/users.model.js'
import { ArticleModel } from '../models/article.model.js'
import { CategoryModel } from '../models/categories.model.js'
import { parameter_Model } from '../models/parameter.model.js'
import {
	articleScheme,
	articleView,
	relation_magazine_article_Scheme,
	relation_line_research_article_Scheme,
	relation_db_index_article_Scheme,
	relation_field_dependence_article_Scheme,
	relation_field_details_article_Scheme,
	relation_field_specific_article_Scheme,
	relation_field_wide_article_Scheme,
	relation_career_article_Scheme,
	relaction_user_facultyScheme,
} from '../models/postgresql/schemes.js'
import { movementScheme } from '../models/postgresql/schemes.js'
import { relation_tag_article_Model } from '../models/relation_tag_article.model.js'
import { collection_article_Scheme, comments_Scheme } from '../models/postgresql/schemes.js'
import { relation_parameter_article_Model } from '../models/relation_parameter_article.model.js'
import { review_model } from '../models/review.model.js'
import { magazineModel } from '../models/magazine.model.js'
import { lineResearchModel } from '../models/line_research.model.js'
import { db_indexModel } from '../models/dbIndex.model.js'
import { field_dependence_Model } from '../models/field_dependences.model.js'
import { field_detailed_Model } from '../models/field_detailed.model.js'
import { field_specific_Model } from '../models/field_specific.model.js'
import { careerModel } from '../models/careers.model.js'
import { field_wide_Model } from '../models/field_wide.model.js'
import { collection_article_Model } from '../models/collection_article.model.js'
import { sendEmailApprovedArticle } from '../libs/codeOPT.js'
import moment from 'moment'
import { relation_field_dependence_article_Model } from '../models/relation_field_dependence_article.model.js'
import { relation_field_detailed_article_Model } from '../models/relation_field_detailed_article.model.js'
import { relation_field_specific_article_Model } from '../models/relation_field_specific_article.model.js'
import { relation_field_wide_article_Model } from '../models/relation_field_wide_article.model.js'
import { relation_career_article_Model } from '../models/relation_career_article.model.js'
import { facultyModel } from '../models/faculty.model.js'

async function getArticlePopular(req, res) {
	try {
		const articles = await ArticleModel.getAll()
		const parameterRelations = await relation_parameter_article_Model.getAll()
		const parameters = await parameter_Model.getAll()
		const relationTagArticles = await relation_tag_article_Model.getAll()
		const tags = await TagModel.getAll()
		const collections = await collection_article_Model.getAll()

		const transformedArticles = await Promise.all(
			articles.map(async article => {
				if (article.status === 'aprobado') {
					const managerName = await UserModel.findNameById({ id: article.manager })
					const articleParameters = parameterRelations
						.filter(relation => relation.id_article_fk === article.id_article)
						.map(relation => {
							const parameter = parameters.find(param => param.id_parameter === relation.id_parameter_fk)
							return {
								id_parameter: parameter.id_parameter,
								name_parameter: parameter.name,
								description_parameter: relation.description,
							}
						})

					const articleTags = relationTagArticles
						.filter(relation => relation.id_article_fk === article.id_article)
						.map(relation => {
							const tag = tags.find(tag => tag.id_tag === relation.id_tag_fk)
							return {
								id_tag: tag.id_tag,
								name_tag: tag.name,
								description_tag: relation.description,
							}
						})

					// Obtener el nombre de la categoría
					const category = await CategoryModel.getById({ id: article.id_category_fk })
					const categoryName = category ? category.name : null

					// Contar las colecciones de cada artículo
					const collectionCount = collections.filter(
						collection => collection.id_article_fk === article.id_article
					).length

					return {
						id_article: article.id_article,
						status: article.status,
						manager_name: managerName,
						title: article.title,
						author: article.author,
						summary: article.summary,
						link: article.link,
						category_name: categoryName,
						parameters: articleParameters,
						tags: articleTags,
						collection_count: collectionCount,
						createdAt: article.createdAt,
						updatedAt: article.updatedAt,
					}
				} else {
					return null
				}
			})
		)

		// Filtrar artículos nulos (no aprobados)
		const approvedArticles = transformedArticles.filter(article => article !== null)

		// Ordenar los artículos por el conteo de colecciones en orden descendente y tomar los dos primeros
		const sortedArticles = approvedArticles.sort((a, b) => b.collection_count - a.collection_count).slice(0, 2)

		res.json(sortedArticles)
	} catch (error) {
		res.status(500).json({ message: '¡Ops! Ha ocurrido un error al obtener los artículos.' })
	}
}

async function getAllArticles(req, res) {
	try {
		const [
			articles,
			tags,
			parameters,
			relationTagArticles,
			parameterRelations,
			dependenceRelations,
			detailedRelations,
			specificRelations,
			wideRelations,
		] = await Promise.all([
			ArticleModel.getAll(),
			TagModel.getAll(),
			parameter_Model.getAll(),
			relation_tag_article_Model.getAll(),
			relation_parameter_article_Model.getAll(),
			relation_field_dependence_article_Model.getAll(),
			relation_field_detailed_article_Model.getAll(),
			relation_field_specific_article_Model.getAll(),
			relation_field_wide_article_Model.getAll(),
		])

		const transformedArticles = await Promise.all(
			articles.map(async article => {
				const [managerName, user_info, category, facultyRelation] = await Promise.all([
					UserModel.findNameById({ id: article.manager }),
					UserModel.getById({ id: article.manager }),
					CategoryModel.getById({ id: article.id_category_fk }),
					relaction_user_facultyScheme.findOne({
						where: { id_user_fk: article.manager },
					}),
				])

				const relationLineResearchArticle = await relation_line_research_article_Scheme.findOne({
					where: { id_article_fk: article.id_article },
				})
				const lineResearchInfo = relationLineResearchArticle
					? {
							id_relation_line_research_article: relationLineResearchArticle.id_relation_line_research_article,
							id_line_research_fk: relationLineResearchArticle.id_line_research_fk,
							description: await lineResearchModel.getNameById(relationLineResearchArticle.id_line_research_fk),
					  }
					: null

				const relationCareerArticle = await relation_career_article_Scheme.findOne({
					where: { id_article_fk: article.id_article },
				})
				const careerInfo = relationCareerArticle
					? {
							id_relation_career_article: relationCareerArticle.id_relation_career,
							id_career_fk: relationCareerArticle.id_career_fk,
							description: await careerModel.getNameById(relationCareerArticle.id_career_fk),
					  }
					: null

				const relations = parameterRelations.filter(relation => relation.id_article_fk === article.id_article)
				const articleParameters = await Promise.all(
					relations.map(async relation => {
						const parameter = parameters.find(param => param.id_parameter === relation.id_parameter_fk)
						return {
							id_parameter: parameter.id_parameter,
							name_parameter: await parameter_Model.getNameById(parameter.id_parameter),
							description_parameter: relation.description,
						}
					})
				)

				const articleTags = relationTagArticles
					.filter(relation => relation.id_article_fk === article.id_article)
					.map(relation => {
						const tag = tags.find(tag => tag.id_tag === relation.id_tag_fk)
						return {
							id_tag: tag.id_tag,
							name_tag: tag.name,
							description_tag: relation.description,
						}
					})

				const articleDependence = await Promise.all(
					dependenceRelations
						.filter(relation => relation.id_article_fk === article.id_article)
						.map(async relation => {
							const dependence = dependenceRelations.find(depen => depen.id_dependence === relation.id_dependence_fk)
							return {
								id_relation_field_dependence: dependence.id_relation_field_dependence,
								id_field_dependence_fk: dependence.id_field_dependence_fk,
								name_dependence: await field_dependence_Model.getNameById(dependence.id_field_dependence_fk),
							}
						})
				)

				const articleDetailed = await Promise.all(
					detailedRelations
						.filter(relation => relation.id_article_fk === article.id_article)
						.map(async relation => {
							const detailed = detailedRelations.find(deta => deta.id_detailed === relation.id_detailed_fk)
							return {
								id_relation_field_details: detailed.id_relation_field_details,
								id_field_detailed_fk: detailed.id_field_detailed_fk,
								name_detailed: await field_detailed_Model.getNameById(detailed.id_field_detailed_fk),
							}
						})
				)

				const articleSpecific = await Promise.all(
					specificRelations
						.filter(relation => relation.id_article_fk === article.id_article)
						.map(async relation => {
							const specific = specificRelations.find(spec => spec.id_specific === relation.id_specific_fk)
							return {
								id_relation_field_specific: specific.id_relation_field_specific,
								id_field_specific_fk: specific.id_field_specific_fk,
								name_specific: await field_specific_Model.getNameById(specific.id_field_specific_fk),
							}
						})
				)

				const articleWide = await Promise.all(
					wideRelations
						.filter(relation => relation.id_article_fk === article.id_article)
						.map(async relation => {
							const wide = wideRelations.find(wid => wid.id_wide === relation.id_wide_fk)
							if (wide) {
								return {
									id_relation_field_wide: wide.id_relation_field_wide,
									id_field_wide_fk: wide.id_field_wide_fk,
									name_wide: await field_wide_Model.getNameById(wide.id_field_wide_fk),
								}
							}
							return null // Return null if the wide object is not found
						})
				)

				const commentCount = await comments_Scheme.count({ where: { id_article_fk: article.id_article } })
				const collectionCount = await collection_article_Scheme.count({ where: { id_article_fk: article.id_article } })
				const viewCount = await articleView.count({ where: { id_article_fk: article.id_article } })

				return {
					id_article: article.id_article,
					status: article.status,
					manager: article.manager,
					manager_info: user_info,
					manager_name: managerName,
					faculty_info: facultyRelation
						? {
								id_faculty: facultyRelation.id_faculty_fk,
								faculty_name: await facultyModel.getNameById(facultyRelation.id_faculty_fk),
						  }
						: null,
					id_category: article.id_category_fk,
					category_name: category ? category.name : null,
					title: article.title,
					participation: article.participation,
					summary: article.summary,
					comment_count: commentCount,
					collection_count: collectionCount,
					view_count: viewCount,
					parameters: articleParameters,
					tags: articleTags,
					career_info: careerInfo,
					lineResearch_info: lineResearchInfo,
					field_dependence_info: articleDependence,
					field_detailed_info: articleDetailed,
					field_specific_info: articleSpecific,
					field_wide_info: articleWide.filter(item => item !== null), // Filter out null values
					createdAt: article.createdAt,
					updatedAt: article.updatedAt,
				}
			})
		)

		res.json(transformedArticles)
	} catch (error) {
		console.error('Error fetching articles:', error)
		res.status(500).json({ message: '¡Ops! Ha ocurrido un error al obtener los artículos.' })
	}
}

async function getAllApprovedArticles(req, res) {
	try {
		const articles = await ArticleModel.getAll()
		const parameterRelations = await relation_parameter_article_Model.getAll()
		const parameters = await parameter_Model.getAll()
		const relationTagArticles = await relation_tag_article_Model.getAll()
		const tags = await TagModel.getAll()

		const transformedArticles = await Promise.all(
			articles.map(async article => {
				if (article.status === 'aprobado') {
					const managerName = await UserModel.findNameById({ id: article.manager })

					// Fetch magazine name and relation details
					const relationMagazineArticle = await relation_magazine_article_Scheme.findOne({
						where: { id_article_fk: article.id_article },
					})

					let magazineInfo = null
					if (relationMagazineArticle) {
						const magazine = await magazineModel.getById(relationMagazineArticle.id_magazine_fk)
						magazineInfo = {
							id_relation_magazine_article: relationMagazineArticle.id_relation_magazine_article,
							id_magazine_fk: relationMagazineArticle.id_magazine_fk,
							description: relationMagazineArticle.description,
						}
					}

					// Fetch line research name and relation details
					const relationLineResearchArticle = await relation_line_research_article_Scheme.findOne({
						where: { id_article_fk: article.id_article },
					})

					let lineResearchInfo = null
					if (relationLineResearchArticle) {
						const lineResearch = await lineResearchModel.getById(relationLineResearchArticle.id_line_research_fk)
						lineResearchInfo = {
							id_relation_line_research_article: relationLineResearchArticle.id_relation_line_research_article,
							id_line_research_fk: relationLineResearchArticle.id_line_research_fk,
							description: relationLineResearchArticle.description,
						}
					}

					// Fetch db index name and relation details
					const relationDBIndexArticle = await relation_db_index_article_Scheme.findOne({
						where: { id_article_fk: article.id_article },
					})

					let dbIndexInfo = null
					if (relationDBIndexArticle) {
						const dbIndex = await db_indexModel.getById(relationDBIndexArticle.id_db_index_fk)
						dbIndexInfo = {
							id_relation_db_index_article: relationDBIndexArticle.id_relation_db_index_article,
							id_db_index_fk: relationDBIndexArticle.id_db_index_fk,
							description: relationDBIndexArticle.description,
						}
					}

					// Fetch article parameters
					const articleParameters = parameterRelations
						.filter(relation => relation.id_article_fk === article.id_article)
						.map(relation => {
							const parameter = parameters.find(param => param.id_parameter === relation.id_parameter_fk)
							return {
								id_parameter: parameter.id_parameter,
								name_parameter: parameter.name,
								description_parameter: relation.description,
							}
						})

					// Fetch article tags
					const articleTags = relationTagArticles
						.filter(relation => relation.id_article_fk === article.id_article)
						.map(relation => {
							const tag = tags.find(tag => tag.id_tag === relation.id_tag_fk)
							return {
								id_tag: tag.id_tag,
								name_tag: tag.name,
								description_tag: relation.description,
							}
						})

					const category = await CategoryModel.getById({ id: article.id_category_fk })
					const categoryName = category ? category.name : null

					// Get comment count for the article
					const commentCount = await comments_Scheme.count({
						where: { id_article_fk: article.id_article },
					})

					// Get collection count for the article
					const collectionCount = await collection_article_Scheme.count({
						where: { id_article_fk: article.id_article },
					})

					// Get view count for the article
					const viewCount = await articleView.count({
						where: { id_article_fk: article.id_article },
					})

					return {
						id_article: article.id_article,
						status: article.status,
						manager: article.manager,
						manager_name: managerName,
						id_category: article.id_category_fk,
						category_name: categoryName,
						author: article.author,
						title: article.title,
						quartile: article.quartile,
						impact: article.impact,
						link_post: article.link_post,
						link_magazine: article.link_magazine,
						filiation: article.filiation,
						participation: article.participation,
						summary: article.summary,
						comment_count: commentCount,
						collection_count: collectionCount,
						view_count: viewCount,
						parameters: articleParameters,
						tags: articleTags,
						magazine_info: magazineInfo,
						lineResearch_info: lineResearchInfo,
						dbIndex_info: dbIndexInfo,
						createdAt: article.createdAt,
						updatedAt: article.updatedAt,
					}
				} else {
					// Return null or an empty object if article is not approved
					return null
				}
			})
		)

		// Filter out null entries
		const filteredArticles = transformedArticles.filter(article => article !== null)

		res.json(filteredArticles)
	} catch (error) {
		res.status(500).json({ message: '¡Ops! Ha ocurrido un error al obtener los artículos.' })
	}
}

async function getAllArticlesByUser(req, res) {
	const { id } = req.params

	try {
		const articles = await ArticleModel.findAllByUserId(id)
		const parameterRelations = await relation_parameter_article_Model.getAll()
		const parameters = await parameter_Model.getAll()
		const relationTagArticles = await relation_tag_article_Model.getAll()
		const tags = await TagModel.getAll()

		const transformedArticles = await Promise.all(
			articles.map(async article => {
				const managerName = await UserModel.findNameById({ id: article.manager })

				// Fetch line research name and relation details
				const relationLineResearchArticle = await relation_line_research_article_Scheme.findOne({
					where: { id_article_fk: article.id_article },
				})
				let lineResearchInfo = null
				if (relationLineResearchArticle) {
					const name = await lineResearchModel.getNameById(relationLineResearchArticle.id_line_research_fk)
					lineResearchInfo = {
						id_relation_line_research_article: relationLineResearchArticle.id_relation_line_research_article,
						id_line_research_fk: relationLineResearchArticle.id_line_research_fk,
						description: name,
					}
				}

				// Fetch dependence name and relation details
				const relationDependenceArticle = await relation_field_dependence_article_Scheme.findOne({
					where: { id_article_fk: article.id_article },
				})
				let dependenceInfo = null
				if (relationDependenceArticle) {
					const name = await field_dependence_Model.getNameById(relationDependenceArticle.id_field_dependence_fk)
					dependenceInfo = {
						id_relation_dependence_article: relationDependenceArticle.id_relation_dependence_article,
						id_field_dependence_fk: relationDependenceArticle.id_field_dependence_fk,
						description: name,
					}
				}

				// Fetch field detaileds name and relation details
				const relationDetailArticle = await relation_field_details_article_Scheme.findOne({
					where: { id_article_fk: article.id_article },
				})
				let detailInfo = null
				if (relationDetailArticle) {
					const name = await field_detailed_Model.getNameById(relationDetailArticle.id_field_detailed_fk)
					detailInfo = {
						id_relation_detailed_article: relationDetailArticle.id_relation_detailed_article,
						id_field_detailed_fk: relationDetailArticle.id_field_detailed_fk,
						description: name,
					}
				}

				// Fetch field specific name and relation details
				const relationSpecificArticle = await relation_field_specific_article_Scheme.findOne({
					where: { id_article_fk: article.id_article },
				})
				let specificInfo = null
				if (relationSpecificArticle) {
					const name = await field_specific_Model.getNameById(relationSpecificArticle.id_field_specific_fk)
					specificInfo = {
						id_relation_specific_article: relationSpecificArticle.id_relation_specific_article,
						id_field_specific_fk: relationSpecificArticle.id_field_specific_fk,
						description: name,
					}
				}

				// Fetch field wide name and relation details
				const relationWideArticle = await relation_field_wide_article_Scheme.findOne({
					where: { id_article_fk: article.id_article },
				})
				let wideInfo = null
				if (relationWideArticle) {
					const name = await field_wide_Model.getNameById(relationWideArticle.id_field_wide_fk)
					wideInfo = {
						id_relation_wide_article: relationWideArticle.id_relation_wide_article,
						id_field_wide_fk: relationWideArticle.id_field_wide_fk,
						description: name,
					}
				}

				// Fetch article parameters
				const articleParameters = parameterRelations
					.filter(relation => relation.id_article_fk === article.id_article)
					.map(relation => {
						const parameter = parameters.find(param => param.id_parameter === relation.id_parameter_fk)
						return {
							id_relation_parameter_article: relation.id_relation_parameter_article,
							id_parameter: parameter.id_parameter,
							name_parameter: parameter.name,
							description_parameter: relation.description,
							createdAt: relation.createdAt,
						}
					})

				// Fetch article tags
				const articleTags = relationTagArticles
					.filter(relation => relation.id_article_fk === article.id_article)
					.map(relation => {
						const tag = tags.find(tag => tag.id_tag === relation.id_tag_fk)
						return {
							id_relation_tag_article: relation.id_relation_tag_article,
							id_tag: tag.id_tag,
							name_tag: tag.name,
							description_tag: relation.description,
							createdAt: relation.createdAt,
						}
					})

				const category = await CategoryModel.getById({ id: article.id_category_fk })
				const categoryName = category.name

				// Get comment count for the article
				const commentCount = await comments_Scheme.count({
					where: { id_article_fk: article.id_article },
				})

				// Get collection count for the article
				const collectionCount = await collection_article_Scheme.count({
					where: { id_article_fk: article.id_article },
				})

				// Get view count for the article
				const viewCount = await articleView.count({
					where: { id_article_fk: article.id_article },
				})

				// Fetch reviews associated with the article
				const reviews = await review_model.getById({ id: article.id_article })
				const transformedReviews = reviews.map(review => ({
					id_review: review.id_review,
					task: review.task,
					status: review.status,
					createdAt: review.createdAt,
				}))

				return {
					id_article: article.id_article,
					id_template: article.id_template_fk,
					status: article.status,
					manager: article.manager,
					manager_name: managerName,
					id_category: article.id_category_fk,
					category_name: categoryName,
					author: article.author,
					title: article.title,
					filiation: article.filiation,
					participation: article.participation,
					summary: article.summary,
					comment_count: commentCount,
					collection_count: collectionCount,
					view_count: viewCount,
					parameters: articleParameters,
					tags: articleTags,
					lineResearch_info: lineResearchInfo,
					dependence_info: dependenceInfo,
					detail_info: detailInfo,
					specific_info: specificInfo,
					wide_info: wideInfo,
					reviews: transformedReviews,
					createdAt: article.createdAt,
					updatedAt: article.updatedAt,
				}
			})
		)

		res.json(transformedArticles)
	} catch (error) {
		console.log(error)
		res.status(500).json({ message: '¡Ops! Ha ocurrido un error al obtener los artículos del usuario.' })
	}
}

async function getArticleById(req, res) {
	const { id } = req.params
	const user_ip = req.ip // Mantenida la obtención de la IP del usuario
	const user_agent = req.headers['user-agent'] // Mantenido el uso del User-Agent del usuario

	try {
		// Buscar la última vista del artículo para este user_ip y id_article_fk
		const lastView = await articleView.findOne({
			where: {
				id_article_fk: id,
				user_ip,
			},
			order: [['view_date', 'DESC']], // Ordenar por fecha de vista descendente para obtener la última vista
		})

		if (!lastView) {
			// Si no hay vista previa, crear un nuevo registro de vista del artículo
			await articleView.create({ id_article_fk: id, user_ip, user_agent, view_date: new Date() })
			return
		}

		// Comparar la fecha de la última vista con hace 24 horas
		const twentyFourHoursAgo = moment().subtract(24, 'hours')
		const lastViewDate = moment(lastView.view_date)

		if (lastViewDate.isBefore(twentyFourHoursAgo)) {
			// Si la última vista fue hace más de 24 horas, registrar una nueva vista
			await articleView.create({ id_article_fk, user_ip, user_agent, view_date: new Date() })
		} else {
			// Si la última vista fue dentro de las últimas 24 horas, no registrar una nueva vista
			console.log('Ya se registró una vista del artículo para este usuario y artículo dentro de las últimas 24 horas.')
		}

		// Continuación del código existente para obtener y transformar el artículo
		const articles = await ArticleModel.getAll()
		const parameterRelations = await relation_parameter_article_Model.getAll()
		const parameters = await parameter_Model.getAll()
		const relationTagArticles = await relation_tag_article_Model.getAll()
		const tags = await TagModel.getAll()

		const transformedArticles = await Promise.all(
			articles.map(async article => {
				if (article.id_article === id && article.status === 'aprobado') {
					const managerName = await UserModel.findNameById({ id: article.manager })

					// Fetch magazine name and relation details
					const relationMagazineArticle = await relation_magazine_article_Scheme.findOne({
						where: { id_article_fk: article.id_article },
					})

					let magazineInfo = null
					if (relationMagazineArticle) {
						const magazine = await magazineModel.getById(relationMagazineArticle.id_magazine_fk)
						magazineInfo = {
							id_relation_magazine_article: relationMagazineArticle.id_relation_magazine_article,
							id_magazine_fk: relationMagazineArticle.id_magazine_fk,
							description: relationMagazineArticle.description,
						}
					}

					// Fetch line research name and relation details
					const relationLineResearchArticle = await relation_line_research_article_Scheme.findOne({
						where: { id_article_fk: article.id_article },
					})

					let lineResearchInfo = null
					if (relationLineResearchArticle) {
						const lineResearch = await lineResearchModel.getById(relationLineResearchArticle.id_line_research_fk)
						lineResearchInfo = {
							id_relation_line_research_article: relationLineResearchArticle.id_relation_line_research_article,
							id_line_research_fk: relationLineResearchArticle.id_line_research_fk,
							description: relationLineResearchArticle.description,
						}
					}

					// Fetch db index name and relation details
					const relationDBIndexArticle = await relation_db_index_article_Scheme.findOne({
						where: { id_article_fk: article.id_article },
					})

					let dbIndexInfo = null
					if (relationDBIndexArticle) {
						const dbIndex = await db_indexModel.getById(relationDBIndexArticle.id_db_index_fk)
						dbIndexInfo = {
							id_relation_db_index_article: relationDBIndexArticle.id_relation_db_index_article,
							id_db_index_fk: relationDBIndexArticle.id_db_index_fk,
							description: relationDBIndexArticle.description,
						}
					}

					// Fetch article parameters
					const articleParameters = parameterRelations
						.filter(relation => relation.id_article_fk === article.id_article)
						.map(relation => {
							const parameter = parameters.find(param => param.id_parameter === relation.id_parameter_fk)
							const name_parameter = parameter ? parameter.name : 'No establecido'
							const description_parameter = relation.description || 'No establecido'

							return {
								id_parameter: parameter ? parameter.id_parameter : null,
								name_parameter: name_parameter,
								description_parameter: description_parameter,
							}
						})

					// Fetch article tags
					const articleTags = relationTagArticles
						.filter(relation => relation.id_article_fk === article.id_article)
						.map(relation => {
							const tag = tags.find(tag => tag.id_tag === relation.id_tag_fk)
							return {
								id_tag: tag.id_tag,
								name_tag: tag.name,
								description_tag: relation.description,
							}
						})

					// Get comment count for the article
					const commentCount = await comments_Scheme.count({
						where: { id_article_fk: article.id_article },
					})

					// Get collection count for the article
					const collectionCount = await collection_article_Scheme.count({
						where: { id_article_fk: article.id_article },
					})

					// Get view count for the article
					const viewCount = await articleView.count({
						where: { id_article_fk: article.id_article },
					})

					const category = await CategoryModel.getById({ id: article.id_category_fk })
					const categoryName = category ? category.name : null

					return {
						id_article: article.id_article,
						status: article.status,
						manager: article.manager,
						manager_name: managerName,
						id_category: article.id_category_fk,
						category_name: categoryName,
						author: article.author,
						title: article.title,
						quartile: article.quartile,
						impact: article.impact,
						link_post: article.link_post,
						link_magazine: article.link_magazine,
						filiation: article.filiation,
						participation: article.participation,
						summary: article.summary,
						comment_count: commentCount,
						collection_count: collectionCount,
						view_count: viewCount,
						parameters: articleParameters,
						tags: articleTags,
						magazine_info: magazineInfo,
						lineResearch_info: lineResearchInfo,
						dbIndex_info: dbIndexInfo,
						createdAt: article.createdAt,
						updatedAt: article.updatedAt,
					}
				} else {
					return null
				}
			})
		)

		const approvedArticle = transformedArticles.find(article => article !== null)

		if (approvedArticle) {
			res.json(approvedArticle)
		} else {
			res.status(404).json({ message: '¡El artículo no fue encontrado o no está aprobado!' })
		}
	} catch (error) {
		res.status(500).json({ message: '¡Ops! Ha ocurrido un error al obtener el artículo.' })
	}
}

async function createArticle(req, res) {
	const { body, user } = req

	try {
		const {
			id_template_fk,
			id_category_fk,
			title,
			summary,
			participation,
			id_parameter_fk,
			id_tag_fk,
			descriptions,
			descriptions_parameter,
			id_career,
			id_line_research,
			id_field_dependence,
			id_field_detailed,
			id_field_specific,
			id_field_wide,
		} = body

		// Validate required fields
		if (
			!id_template_fk ||
			!id_category_fk ||
			!title ||
			!summary ||
			!participation ||
			!id_career ||
			!id_line_research ||
			!id_field_dependence ||
			!id_field_detailed ||
			!id_field_specific ||
			!id_field_wide
		) {
			return res.status(400).json({ message: 'Por favor completa los campos requeridos.' })
		}

		// Get category data by id
		const nameCategory = await CategoryModel.findNameCategoryById({ id: id_category_fk })
		if (!nameCategory) return res.status(404).json({ message: 'Categoría no encontrada.' })

		const newData = {
			id_template_fk,
			manager: user.id,
			id_category_fk,
			title,
			participation,
			summary,
		}

		const newArticle = await ArticleModel.create(newData)
		const idArticle = newArticle.id_article

		// Create the relationship in relation_parameter_article_Scheme
		for (const parameterId of id_parameter_fk) {
			const descriptionParameter = descriptions_parameter[parameterId]
			await relation_parameter_article_Model.create({
				id_article_fk: idArticle,
				id_parameter_fk: parameterId,
				description: descriptionParameter,
			})
		}

		// Create the relationship in relation_tag_article_Scheme if there are tags
		for (const tagId of id_tag_fk) {
			const descriptionTag = descriptions[tagId]
			await relation_tag_article_Model.create({
				id_article_fk: idArticle,
				id_tag_fk: tagId,
				description: descriptionTag,
			})
		}

		const nameCareer = await careerModel.getNameById(id_career)
		if (!nameCareer) return res.status(404).json({ message: 'Carrea no encontrada.' })
		await relation_career_article_Model.create({
			id_article_fk: idArticle,
			id_career_fk: id_career,
			description: nameCareer,
		})

		const nameLineResearch = await lineResearchModel.getNameById(id_line_research)
		if (!nameLineResearch) return res.status(404).json({ message: 'Línea de investigación no encontrada.' })
		// Create relationships in relation_line_research_article_Scheme
		await relation_line_research_article_Scheme.create({
			id_article_fk: idArticle,
			id_line_research_fk: id_line_research,
			description: nameLineResearch,
		})

		const nameFieldDependence = await field_dependence_Model.getNameById(id_field_dependence)
		if (!nameFieldDependence) return res.status(404).json({ message: 'Dependencia no encontrada.' })
		// Create relationships
		await relation_field_dependence_article_Scheme.create({
			id_article_fk: idArticle,
			id_field_dependence_fk: id_field_dependence,
			description: nameFieldDependence,
		})

		const nameFieldFieldDetails = await field_detailed_Model.getNameById(id_field_detailed)
		if (!nameFieldFieldDetails) return res.status(404).json({ message: 'Campo detallado no encontrado.' })
		// Create relationships
		await relation_field_details_article_Scheme.create({
			id_article_fk: idArticle,
			id_field_detailed_fk: id_field_detailed,
			description: nameFieldFieldDetails,
		})

		const nameFieldFieldSpecific = await field_specific_Model.getNameById(id_field_specific)
		if (!nameFieldFieldSpecific) return res.status(404).json({ message: 'Campo específico no encontrado.' })
		// Create relationships
		await relation_field_specific_article_Scheme.create({
			id_article_fk: idArticle,
			id_field_specific_fk: id_field_specific,
			description: nameFieldFieldSpecific,
		})

		const nameFieldFieldWide = await field_wide_Model.getNameById(id_field_wide)
		if (!nameFieldFieldWide) return res.status(404).json({ message: 'Campo amplio no encontrado.' })
		// Create relationships
		await relation_field_wide_article_Scheme.create({
			id_article_fk: idArticle,
			id_field_wide_fk: id_field_wide,
			description: nameFieldFieldWide,
		})

		await movementScheme.create({
			action: `El usuario ${user.username} publicó el artículo ${title} en la categoría ${nameCategory.name}`,
			targetType: 'articulos',
			targetId: idArticle,
			id_user_fk: user.id,
		})

		res.status(201).json({ message: 'Artículo creado exitosamente.' })
	} catch (error) {
		res.status(500).json({ message: '¡Ups! Se produjo un error al crear el artículo. Inténtalo de nuevo.' })
	}
}

async function updateArticle(req, res) {
	const { id } = req.params
	const { user, body } = req

	try {
		if (!id || !body.title || !body.summary)
			return res.status(404).json({ message: 'Por favor. Completa todos los campos.' })

		const article = await articleScheme.findByPk(id)
		if (!article) return res.status(404).json({ message: 'Artículo no encontrado.' })

		// Obtener el título actual del artículo
		const currentTitle = article.title

		// Verificar si el nuevo título ya está en uso por otro artículo, exceptuando el actual
		if (body.title !== currentTitle) {
			const titleExists = await articleScheme.findOne({ where: { title: body.title } })
			if (titleExists) return res.status(409).json({ message: 'El título ya está en uso.' })
		}

		await ArticleModel.update({ id, input: body })

		// Update parameters article
		await Promise.all(
			body.parameters.map(async parameter => {
				await relation_parameter_article_Model.update({
					id: parameter.id_relation_parameter_article,
					input: { description: parameter.description_parameter },
				})
			})
		)

		// Update tags article
		await Promise.all(
			body.tags.map(async tag => {
				await relation_tag_article_Model.update({
					id: tag.id_relation_tag_article,
					input: { description: tag.description_tag },
				})
			})
		)

		await movementScheme.create({
			action: `El usuario ${user.username} actualizo su artículo "${body.title}"`,
			targetType: 'articulos',
			targetId: id,
			id_user_fk: user.id,
		})

		res.status(200).json({ message: 'Artículo actualizado exitosamente.' })
	} catch (error) {
		res.status(500).json({ message: '¡Ops! Ha ocurrido un error al actualizar el artículo.' })
	}
}

async function deleteArticle(req, res) {
	const { id } = req.params
	try {
		const articleExists = await ArticleModel.getById({ id })
		if (!articleExists) res.status(400).json({ message: 'Artículo no encontrado.' })
		await ArticleModel.delete(id)

		res.status(201).json({ message: 'Artículo eliminado exitosamente.' })
	} catch (error) {
		console.log(error)
		res.status(500).json({ message: '¡Ops! Ha ocurrido un error al eliminar el artículo.' })
	}
}

async function check_article(req, res) {
	try {
		const { id } = req.params

		const status_actual = await ArticleModel.status_actual({ id })

		const article = await ArticleModel.getById({ id })

		let message = ''

		let newStatus
		if (status_actual !== 'aprobado') {
			await ArticleModel.update({ id, input: { status: 'aprobado' } })
			message = `Cambiaste el estado del artículo a aprobado.`
			newStatus = 'aprobado' // Establecer el nuevo estado
		} else {
			await ArticleModel.update({ id, input: { status: 'pendiente' } })
			message = `Cambiaste el estado del artículo a pendiente.`
			newStatus = 'pendiente' // Establecer el nuevo estado
		}

		// Send email to article owner
		const owner = await UserModel.getById({ id: article.manager })

		const owner_name = owner.username
		const owner_email = owner.email
		const articleTitle = article.title

		const emailSent = await sendEmailApprovedArticle(owner_email, owner_name, articleTitle, newStatus)

		return res.status(200).json({ message })
	} catch (error) {
		return res.status(500).json({ message: '¡Ops! Ha ocurrido un error. Por favor, inténtalo de nuevo.' })
	}
}

export {
	getArticlePopular,
	getAllArticles,
	getAllApprovedArticles,
	getAllArticlesByUser,
	getArticleById,
	check_article,
	createArticle,
	updateArticle,
	deleteArticle,
}
