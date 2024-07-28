import { useEffect, useState } from 'react'
import { getAllCareerRequest } from '../services/api/career.api'

const useAllCareer = () => {
	const [error, setError] = useState(null)
	const [career, setCareer] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await getAllCareerRequest()
				setCareer(data)
			} catch (error) {
				setError(error.message)
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [])

	return { career, loading, error, setCareer }
}

export { useAllCareer }
