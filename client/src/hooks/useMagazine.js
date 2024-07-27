import { useEffect, useState } from 'react'
import { getAllMagazineRequest } from '../services/api/magazine.api'

const useAllMagazine = () => {
	const [magazine, setMagazine] = useState([])
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await getAllMagazineRequest()
				setMagazine(data)
			} catch (error) {
				setError(error.message)
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [])

	return { magazine, loading, error, setMagazine }
}

export { useAllMagazine }
