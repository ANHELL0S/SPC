import { useEffect, useState } from 'react'
import { fetch } from '../services/api/parameter.api'

const useAllParameter = () => {
	const [parameter, setParameter] = useState([])
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await fetch()
				setParameter(data)
			} catch (error) {
				setError(error.message)
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [])

	return { parameter, loading, error, setParameter }
}

export { useAllParameter }
