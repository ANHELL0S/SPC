import { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import { BiUser, BiLogInCircle, BiUserPlus, BiSave, BiExit, BiArchive, BiHomeAlt2, BiPlusCircle } from 'react-icons/bi'

const BottomBar = () => {
	const { isAuthenticated, userRole, logout } = useContext(AuthContext)

	const handleLogout = () => {
		logout()
	}

	return (
		<div className='fixed bottom-0 left-0 right-0 bg-white border-t border-slate-300 text-xs py-3 flex justify-between items-center md:hidden text-slate-500 px-4'>
			<Link to='/artículos' className='flex flex-col items-center justify-center'>
				<BiHomeAlt2 size={18} />
				<span>Inicio</span>
			</Link>

			{isAuthenticated && (
				<>
					<Link to='/profile' className='flex flex-col items-center justify-center flex-1'>
						<BiUser size={18} />
						<span>Perfil</span>
					</Link>

					{userRole === 'docente' && (
						<>
							<Link to='/crear-articulo' className='flex flex-col items-center justify-center flex-1'>
								<BiPlusCircle size={18} />
								<span>Nuevo</span>
							</Link>

							<Link to='/mis-articulos' className='flex flex-col items-center justify-center flex-1'>
								<BiArchive size={18} />
								<span>Artículos</span>
							</Link>
						</>
					)}

					<Link to='/collection-article' className='flex flex-col items-center justify-center flex-1'>
						<BiSave size={18} />
						<span>Colección</span>
					</Link>

					<button onClick={handleLogout} className='flex flex-col items-center justify-center flex-1'>
						<BiExit size={18} />
						<span>Salir</span>
					</button>
				</>
			)}

			{!isAuthenticated && (
				<>
					<Link to='/login' className='flex flex-col items-center justify-center'>
						<BiLogInCircle size={18} />
						<span>Iniciar sesión</span>
					</Link>

					<Link to='/register' className='flex flex-col items-center justify-center'>
						<BiUserPlus size={18} />
						<span>Registrarse</span>
					</Link>
				</>
			)}
		</div>
	)
}

export { BottomBar }
