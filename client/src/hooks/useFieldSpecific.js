import { useEffect, useState } from 'react'
import { getAll_field_specific_Request } from '../services/api/field_specific.api'

const useAllField_specific = () => {
	const [error, setError] = useState(null)
	const [field_specific, setField_specific] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await getAll_field_specific_Request()
				setField_specific(data)
			} catch (error) {
				setError(error.message)
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [])

	return { field_specific, loading, error, setField_specific }
}

export { useAllField_specific }
