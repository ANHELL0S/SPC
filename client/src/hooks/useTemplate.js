import { useEffect, useState } from 'react'
import { fetch } from '../services/api/template.api'

const useAllTemplate = () => {
	const [template, setTemplate] = useState([])
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await fetch()
				setTemplate(data)
			} catch (error) {
				setError(error.message)
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [])

	return { template, loading, error, setTemplate }
}

export { useAllTemplate }
