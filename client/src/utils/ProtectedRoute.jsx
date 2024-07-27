/* eslint-disable react/prop-types */
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Spinner } from '../components/ui/spinner'

export const ProtectedRoute = ({ adminOnly = false, onlyTeacher = false, onlyGeneral = false }) => {
	const { isAuthenticated, userRole, loading } = useAuth()

	if (loading) return <Spinner />

	if (!isAuthenticated && !loading) return <Navigate to='/login' replace />

	if (adminOnly && userRole !== 'admin') return <Navigate to='/' replace />
	if (onlyTeacher && userRole !== 'docente') return <Navigate to='/' replace />
	if (onlyGeneral && userRole !== 'general') return <Navigate to='/' replace />

	return <Outlet />
}
