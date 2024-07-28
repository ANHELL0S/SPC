import { useEffect, useState } from 'react'
import { getAllDBIndexRequest } from '../services/api/dbIndex.api'

const useAllDBIndex = () => {
	const [error, setError] = useState(null)
	const [dbIndex, setDBIndex] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await getAllDBIndexRequest()
				setDBIndex(data)
			} catch (error) {
				setError(error.message)
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [])

	return { dbIndex, loading, error, setDBIndex }
}

export { useAllDBIndex }
