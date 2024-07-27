import { useEffect, useState } from 'react'
import { fetch, count } from '../services/api/categories.api'

const useAllCategory = () => {
	const [category, setCategory] = useState([])
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await fetch()
				setCategory(data)
			} catch (error) {
				setError(error.message)
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [])

	return { category, loading, error, setCategory }
}

const useCategoryCount = () => {
	const [categoryCount, setCategoryCount] = useState(0)

	useEffect(() => {
		const fetchCategoryCount = async () => {
			try {
				const countData = await count()
				setCategoryCount(countData)
			} catch (error) {
				console.error(error)
			}
		}

		fetchCategoryCount()
	}, [])

	return categoryCount
}

export { useAllCategory, useCategoryCount }
