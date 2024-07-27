import { useEffect, useState } from 'react'
import { getAllFacultyRequest } from '../services/api/faculty.api'

const useAllFaculty = () => {
	const [faculties, setFaculty] = useState([])
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await getAllFacultyRequest()
				setFaculty(data)
			} catch (error) {
				setError(error.message)
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [])

	return { faculties, loading, error, setFaculty }
}

export { useAllFaculty }
