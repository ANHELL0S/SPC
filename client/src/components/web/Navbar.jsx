import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useConfigData } from '../../hooks/useConfig'

const Navbar = () => {
	const config = useConfigData()
	const { isAuthenticated, user, logout } = useAuth()
	const [isDropdownOpen, setIsDropdownOpen] = useState(false)

	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen)
	}

	const handleLogout = () => {
		logout()
	}

	return (
		<nav className='z-10 bg-transparent text-neutral-500 lg:px-0 h-16 flex items-center justify-between'>
			<div className='flex items-center'>
				<Link to='/'>
					<div className='flex flex-row items-center bg-slate-700 rounded-sm'>
						<h1 className='text-slate-50 font-bold text-lg px-2 rounded-md'>SPC</h1>
						<span className='bg-slate-100 text-slate-700 px-2 font-semibold text-lg'>
							{config.abbreviation ? config.abbreviation : ''}
						</span>
					</div>
				</Link>
			</div>

			{isAuthenticated ? (
				<div className='relative'>
					<button
						onClick={toggleDropdown}
						className='lg:flex space-x-6 text-slate-500 text-sm font-medium hover:text-[#f68d7a] border-b-2 hover:border-[#f68d7a] transition duration-150 ease-in-out'>
						{user.username}
					</button>

					{isDropdownOpen && (
						<div className='text-slate-500 absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-md'>
							<Link to='/profile' className='block px-4 py-2 text-sm hover:bg-slate-100'>
								Mi cuenta
							</Link>

							<button
								onClick={handleLogout}
								className='block w-full text-left px-4 py-2 text-sm rounded-b-md hover:text-slate-50 hover:bg-[#f68d7a]'>
								Cerrar sesión
							</button>
						</div>
					)}
				</div>
			) : (
				<Link
					to='/login'
					className='lg:flex space-x-6 text-slate-500 text-sm font-medium hover:text-[#f68d7a] border-b-2 hover:border-[#f68d7a] transition duration-150 ease-in-out'>
					Iniciar sesión
				</Link>
			)}
		</nav>
	)
}

export { Navbar }
