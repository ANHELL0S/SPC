import { toast } from 'sonner'
import { useEffect, useState } from 'react'
import { getALlUsersRequest, getCountUsersRequest } from '../services/api/users.api'

const useUsers = id_user => {
	const [users, setUsers] = useState([])
	const [loading, setLoading] = useState(true)
	const [userCount, setUserCount] = useState(0)

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const usersData = await getALlUsersRequest()
				setUsers(usersData)
			} catch (error) {
				toast.error(`Error fetching users: ${error.message}`)
			} finally {
				setLoading(false)
			}
		}

		const fetchUserCount = async () => {
			try {
				const countData = await getCountUsersRequest()
				setUserCount(countData)
			} catch (error) {
				toast.error(`Error fetching user count: ${error.message}`)
			}
		}

		fetchUsers()
		fetchUserCount()
	}, [id_user])

	return {
		users,
		loading,
		userCount,
	}
}

const useUsersAll = () => {
	const [users, setUsers] = useState([])
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const usersData = await getALlUsersRequest()
				setUsers(usersData)
			} catch (error) {
				setError(error.message)
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [])

	return { users, loading, error, setUsers }
}

export { useUsers, useUsersAll }
