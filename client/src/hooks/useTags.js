import { useEffect, useState } from 'react'
import { fetch } from '../services/api/tags.api'

const useAllTags = () => {
	const [tag, setTags] = useState([])
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await fetch()
				setTags(data)
			} catch (error) {
				setError(error.message)
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [])

	return { tag, loading, error, setTags }
}

export { useAllTags }
