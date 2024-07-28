import { useEffect, useState } from 'react'
import { getAll_field_dependence_Request } from '../services/api/field_dependence.api'

const useAllField_dependence = () => {
	const [error, setError] = useState(null)
	const [field_dependence, setField_dependence] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await getAll_field_dependence_Request()
				setField_dependence(data)
			} catch (error) {
				setError(error.message)
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [])

	return { field_dependence, loading, error, setField_dependence }
}

export { useAllField_dependence }
