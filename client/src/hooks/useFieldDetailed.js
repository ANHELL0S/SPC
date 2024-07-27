import { useEffect, useState } from 'react'
import { getAll_field_detailed_Request } from '../services/api/field_detailed.api'

const useAllField_detailed = () => {
	const [error, setError] = useState(null)
	const [field_detailed, setField_detailed] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await getAll_field_detailed_Request()
				setField_detailed(data)
			} catch (error) {
				setError(error.message)
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [])

	return { field_detailed, loading, error, setField_detailed }
}

export { useAllField_detailed }
