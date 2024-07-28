import { useEffect, useState } from 'react'
import { getAll_field_wide_Request } from '../services/api/field_wide.api'

const useAllField_wide = () => {
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(true)
	const [field_wide, setField_wide] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await getAll_field_wide_Request()
				setField_wide(data)
			} catch (error) {
				setError(error.message)
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [])

	return { field_wide, loading, error, setField_wide }
}

export { useAllField_wide }
