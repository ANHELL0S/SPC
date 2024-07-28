import { toast } from 'sonner'
import { useEffect, useState } from 'react'
import { fetch as fetchCollection } from '../services/api/collection_article.api'
import { fetch_for_public, getById, getPopular, fetch as getAll } from '../services/api/article.api'

const useArticle = (id_article, user) => {
	const [articles, setArticles] = useState([])
	const [articlePopular, setArticlePopular] = useState([])
	const [articleAll, setArticleAll] = useState([])
	const [loading, setLoading] = useState(true)
	const [article, setArticle] = useState(null)
	const [totalArticlesInCollection, setTotalArticlesInCollection] = useState(0)
	const [isInCollection, setIsInCollection] = useState(false)
	const [collectionId, setCollectionId] = useState(null)

	useEffect(() => {
		const fetchArticlesData = async () => {
			try {
				const articleData = await fetch_for_public()
				setArticles(articleData)
			} catch (error) {
				toast.error(`${error.message}`)
			} finally {
				setLoading(false)
			}
		}

		const fetchArticle = async () => {
			try {
				const fetchedArticle = await getById(id_article)
				setArticle(fetchedArticle)
				const response = await fetchCollection()
				const totalArticles = response.filter(item => item.id_article_fk === id_article).length
				setTotalArticlesInCollection(totalArticles)
				const collectionItem = response.find(
					item => item.id_article_fk === id_article && item.id_user_fk === user?.id_user
				)
				if (collectionItem) {
					setIsInCollection(true)
					setCollectionId(collectionItem.id_collection_article)
				}
			} catch (error) {
				//	toast.error(`${error.message}`)
			} finally {
				setLoading(false)
			}
		}

		const fetchArticlePopular = async () => {
			try {
				const articlePopular = await getPopular()
				setArticlePopular(articlePopular)
			} catch (error) {
				toast.error(`${error.message}`)
			} finally {
				setLoading(false)
			}
		}

		const fetchArticleAll = async () => {
			try {
				const articleAll = await getAll()
				setArticleAll(articleAll)
			} catch (error) {
				toast.error(`${error.message}`)
			} finally {
				setLoading(false)
			}
		}

		fetchArticle()
		fetchArticleAll()
		fetchArticlesData()
		fetchArticlePopular()
	}, [id_article, user])

	return {
		article,
		loading,
		articles,
		articleAll,
		collectionId,
		isInCollection,
		articlePopular,
		totalArticlesInCollection,
		setIsInCollection,
		setCollectionId,
	}
}

const useAllArticle = () => {
	const [article, setArticle] = useState([])
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await getAll()
				setArticle(data)
			} catch (error) {
				setError(error.message)
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [])

	return { article, loading, error, setArticle }
}

export { useArticle, useAllArticle }
