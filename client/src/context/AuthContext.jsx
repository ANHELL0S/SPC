import { toast } from 'sonner'
import Cookies from 'js-cookie'
import { createContext, useContext, useState, useEffect } from 'react'
import { loginRequest, registerRequest, closeRequest } from '../services/api/auth.api'

const AuthContext = createContext()

export const useAuth = () => {
	const context = useContext(AuthContext)
	if (!context) throw new Error('useAuth must be used within a AuthProvider')
	return context
}

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null)
	const [userRole, setUserRole] = useState(null)
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const storedUser = JSON.parse(localStorage.getItem('user'))

		if (storedUser) {
			setUser(storedUser)
			setUserRole(storedUser.role ? storedUser.role.type_rol : null)
			setIsAuthenticated(true)
		}

		setLoading(false)
	}, [])

	const signing = async (email, password) => {
		try {
			const res = await loginRequest({ email, password })

			if (res) {
				const { token, user } = res

				if (token && user) {
					localStorage.setItem('user', JSON.stringify(user))
					setUser(user)
					setUserRole(user.role ? user.role.type_rol : null)
					setIsAuthenticated(true)
					return { user, userRole: user.role ? user.role.type_rol : null }
				} else {
					toast.error('La respuesta de inicio de sesión no contiene el token o la información del usuario.')
				}
			} else {
				toast.error('La respuesta de inicio de sesión es undefined')
			}
		} catch (error) {
			toast.error(error.message)
		}
	}

	const signup = async (username, email, password) => {
		try {
			const res = await registerRequest({ username, email, password })
			setIsAuthenticated(true)
			return { user: res.data, userRole: res.data.role ? res.data.role.type_rol : null }
		} catch (error) {
			toast.error(error.message)
		}
	}

	const logout = async () => {
		Cookies.remove('token')
		localStorage.removeItem('user')
		await closeRequest()
		setUser(null)
		setUserRole(null)
		setIsAuthenticated(false)
	}

	return (
		<AuthContext.Provider
			value={{
				user,
				userRole,
				signing,
				signup,
				logout,
				isAuthenticated,
				loading,
			}}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthContext
