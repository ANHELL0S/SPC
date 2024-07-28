import { useEffect, useState } from 'react'
import { getAllLineResearchRequest } from '../services/api/line_research.api'

const useAllLineResearch = () => {
	const [lineResearch, setLineResearch] = useState([])
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await getAllLineResearchRequest()
				setLineResearch(data)
			} catch (error) {
				setError(error.message)
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [])

	return { lineResearch, loading, error, setLineResearch }
}

export { useAllLineResearch }
