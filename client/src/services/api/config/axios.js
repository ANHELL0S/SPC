import axios from 'axios'
import {
	AUTH_API_URL,
	TAGS_API_URL,
	USERS_API_URL,
	CAREER_API_URL,
	REVIEW_API_URL,
	FACULTY_API_URL,
	CONFIGS_API_URL,
	ARTICLE_API_URL,
	DB_INDEX_API_URL,
	TEMPLATE_API_URL,
	MAGAZINE_API_URL,
	COMMENTS_API_URL,
	MOVEMENTS_API_URL,
	PARAMETER_API_URL,
	FIELD_WIDE_API_URL,
	CATEGORIES_API_URL,
	LINE_RESEARCH_API_URL,
	FIELD_DETAILED_API_URL,
	FIELD_SPECIFIC_API_URL,
	FIELD_DEPENDENCE_API_URL,
	COLLECTION_ARTICLE_API_URL,
} from './config'

const createInstance = baseURL => {
	return axios.create({
		baseURL,
		withCredentials: true,
	})
}

export const authInstance = createInstance(AUTH_API_URL)
export const tagsInstance = createInstance(TAGS_API_URL)
export const usersInstance = createInstance(USERS_API_URL)
export const reviewInstance = createInstance(REVIEW_API_URL)
export const career_Instance = createInstance(CAREER_API_URL)
export const articleInstance = createInstance(ARTICLE_API_URL)
export const configsInstance = createInstance(CONFIGS_API_URL)
export const faculty_Instance = createInstance(FACULTY_API_URL)
export const dbIndex_Instance = createInstance(DB_INDEX_API_URL)
export const comment_Instance = createInstance(COMMENTS_API_URL)
export const templateInstance = createInstance(TEMPLATE_API_URL)
export const magazine_Instance = createInstance(MAGAZINE_API_URL)
export const movementsInstance = createInstance(MOVEMENTS_API_URL)
export const parameter_Instance = createInstance(PARAMETER_API_URL)
export const categoriesInstance = createInstance(CATEGORIES_API_URL)
export const line_research_Instance = createInstance(LINE_RESEARCH_API_URL)
export const field_detailed_Instance = createInstance(FIELD_DETAILED_API_URL)
export const field_specific_Instance = createInstance(FIELD_SPECIFIC_API_URL)
export const field_dependence_Instance = createInstance(FIELD_DEPENDENCE_API_URL)
export const field_wide_Instance = createInstance(FIELD_WIDE_API_URL)
export const collection_article_Instance = createInstance(COLLECTION_ARTICLE_API_URL)
