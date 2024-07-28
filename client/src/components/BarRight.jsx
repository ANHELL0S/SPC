import { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import { BiUser, BiLogInCircle, BiUserPlus, BiSave, BiAddToQueue, BiExit, BiArchive } from 'react-icons/bi'

const BarRight = () => {
	const { isAuthenticated, userRole, logout } = useContext(AuthContext)
	const location = useLocation()

	const handleLogout = () => {
		logout()
	}

	const isActiveRoute = route => {
		return location.pathname === route
	}

	return (
		<>
			{isAuthenticated && userRole === 'docente' ? (
				<div className='fixed right-0 bottom-0 h-full flex flex-col justify-between bg-slate-50 p-2 border hidden md:flex'>
					<div>
						<ul className='mt-2 space-y-6'>
							<li>
								<Link
									to='/profile'
									className={`${
										isActiveRoute('/profile') ? 'bg-slate-200 text-slate-700' : 'hover:bg-slate-200 text-slate-600'
									} p-2 rounded-md`}>
									<BiUser className='inline-block text-xl' />
								</Link>
							</li>

							<hr />

							<li>
								<Link
									to='/crear-articulo'
									className={`${
										isActiveRoute('/crear-articulo')
											? 'bg-slate-200 text-slate-700'
											: 'hover:bg-slate-200 text-slate-600'
									} p-2 rounded-md`}>
									<BiAddToQueue className='inline-block text-xl' />
								</Link>
							</li>

							<li>
								<Link
									to='/mis-articulos'
									className={`${
										isActiveRoute('/mis-articulos')
											? 'bg-slate-200 text-slate-700'
											: 'hover:bg-slate-200 text-slate-600'
									} p-2 rounded-md`}>
									<BiArchive className='inline-block text-xl' />
								</Link>
							</li>

							<li>
								<Link
									to='/collection-article'
									className={`${
										isActiveRoute('/collection-article')
											? 'bg-slate-200 text-slate-700'
											: 'hover:bg-slate-200 text-slate-600'
									} p-2 rounded-md`}>
									<BiSave className='inline-block text-xl' />
								</Link>
							</li>
						</ul>
					</div>

					<ul>
						<li>
							<button
								onClick={handleLogout}
								className='text-slate-700 hover:text-slate-50 hover:bg-red-400 p-2 rounded-lg transition-colors duration-150'>
								<BiExit className='inline-block text-xl' />
							</button>
						</li>
					</ul>
				</div>
			) : isAuthenticated ? (
				<div className='fixed right-0 bottom-0 h-full flex flex-col justify-between bg-slate-50 p-2 border hidden md:flex'>
					<div>
						<ul className='mt-2 space-y-6'>
							<li>
								<Link
									to='/profile'
									className={`${
										isActiveRoute('/profile') ? 'bg-slate-200 text-slate-700' : 'hover:bg-slate-200 text-slate-600'
									} p-2 rounded-md`}>
									<BiUser className='inline-block text-xl' />
								</Link>
							</li>

							<hr />

							<li>
								<Link
									to='/collection-article'
									className={`${
										isActiveRoute('/collection-article')
											? 'bg-slate-200 text-slate-700'
											: 'hover:bg-slate-200 text-slate-600'
									} p-2 rounded-md`}>
									<BiSave className='inline-block text-xl' />
								</Link>
							</li>
						</ul>
					</div>

					<ul>
						<li>
							<button
								onClick={handleLogout}
								className='text-slate-700 hover:text-slate-50 hover:bg-red-400 p-2 rounded-lg transition-colors duration-150'>
								<BiExit className='inline-block text-xl' />
							</button>
						</li>
					</ul>
				</div>
			) : (
				<div className='fixed right-0 top-0 h-full flex flex-col justify-between bg-slate-50 p-2 border hidden md:flex'>
					<div>
						<ul className='mt-2 space-y-6'>
							<li>
								<Link
									to='/login'
									className={`${
										isActiveRoute('/login') ? 'bg-slate-200 text-slate-700' : 'hover:bg-slate-200 text-slate-600'
									} p-2 rounded-md`}>
									<BiLogInCircle className='inline-block text-xl' />
								</Link>
							</li>

							<li>
								<Link
									to='/register'
									className={`${
										isActiveRoute('/register') ? 'bg-slate-200 text-slate-700' : 'hover:bg-slate-200 text-slate-600'
									} p-2 rounded-md`}>
									<BiUserPlus className='inline-block text-xl' />
								</Link>
							</li>
						</ul>
					</div>
				</div>
			)}
		</>
	)
}

export { BarRight }
