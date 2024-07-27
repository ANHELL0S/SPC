import { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import { BiUser, BiLogInCircle, BiUserPlus, BiSave, BiAddToQueue, BiHomeAlt2, BiExit, BiArchive } from 'react-icons/bi'

function Bars() {
	const { isAuthenticated, userRole, logout } = useContext(AuthContext)
	const handleLogout = () => {
		logout()
	}

	return (
		<>
			<div className='fixed left-0 top-0 h-full flex flex-col justify-between bg-slate-50 p-2 border'>
				<div>
					<ul className='mt-2 space-y-6'>
						<li>
							<Link to='/' className='text-slate-700 hover:text-slate-900 hover:bg-slate-200 p-2 rounded-lg'>
								<BiHomeAlt2 className='inline-block text-xl' />
							</Link>
						</li>
					</ul>
				</div>
			</div>

			{isAuthenticated && userRole === 'docente' ? (
				<div className='fixed right-0 bottom-0 h-full flex flex-col justify-between bg-slate-50 p-2 border'>
					<div>
						<ul className='mt-2 space-y-6'>
							<li>
								<Link to='/profile' className='text-slate-700 hover:text-slate-900 hover:bg-slate-200 p-2 rounded-lg'>
									<BiUser className='inline-block text-xl' />
								</Link>
							</li>

							<hr />

							<li>
								<Link
									to='/crear-articulo'
									className='text-slate-700 hover:text-slate-900 hover:bg-slate-200 p-2 rounded-lg'>
									<BiAddToQueue className='inline-block text-xl' />
								</Link>
							</li>

							<li>
								<Link
									to='/mis-articulos'
									className='text-slate-700 hover:text-slate-900 hover:bg-slate-200 p-2 rounded-lg'>
									<BiArchive className='inline-block text-xl' />
								</Link>
							</li>

							<li>
								<Link
									to='/collection-article'
									className='text-slate-700 hover:text-slate-900 hover:bg-slate-200 p-2 rounded-lg'>
									<BiSave className='inline-block text-xl' />
								</Link>
							</li>
						</ul>
					</div>

					<ul>
						<li>
							<button
								onClick={handleLogout}
								className='text-slate-700 hover:text-slate-900 hover:bg-red-400 p-2 rounded-lg transition-colors duration-150'>
								<BiExit className='inline-block text-xl' />
							</button>
						</li>
					</ul>
				</div>
			) : isAuthenticated ? (
				<div className='fixed right-0 bottom-0 h-full flex flex-col justify-between bg-slate-50 p-2 border'>
					<div>
						<ul className='mt-2 space-y-6'>
							<li>
								<Link to='/profile' className='text-slate-700 hover:text-slate-900 hover:bg-slate-200 p-2 rounded-lg'>
									<BiUser className='inline-block text-xl' />
								</Link>
							</li>

							<hr />

							<li>
								<Link
									to='/collection-article'
									className='text-slate-700 hover:text-slate-900 hover:bg-slate-200 p-2 rounded-lg'>
									<BiSave className='inline-block text-xl' />
								</Link>
							</li>
						</ul>
					</div>

					<ul>
						<li>
							<button
								onClick={handleLogout}
								className='text-slate-700 hover:text-slate-900 hover:bg-red-400 p-2 rounded-lg transition-colors duration-150'>
								<BiExit className='inline-block text-xl' />
							</button>
						</li>
					</ul>
				</div>
			) : (
				<div className='fixed right-0 top-0 h-full flex flex-col justify-between bg-slate-50 p-2 border'>
					<div>
						<ul className='mt-2 space-y-6'>
							<li>
								<Link to='/login' className='text-slate-700 hover:text-slate-900 hover:bg-slate-200 p-2 rounded-lg'>
									<BiLogInCircle className='inline-block text-xl' />
								</Link>
							</li>

							<li>
								<Link to='/register' className='text-slate-700 hover:text-slate-900 hover:bg-slate-200 p-2 rounded-lg'>
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

export default Bars
