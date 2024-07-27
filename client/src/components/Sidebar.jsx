import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { fetch } from '../services/api/config.api'
import { useAuth } from '../context/AuthContext'
import {
	BiBookmarks,
	BiFoodMenu,
	BiArchive,
	BiUser,
	BiCog,
	BiCalendarCheck,
	BiMenu,
	BiChat,
	BiInfoCircle,
} from 'react-icons/bi'

const Sidebar = () => {
	const { user } = useAuth()
	const [config, setConfig] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch()
				setConfig(response)
				console.log('data', response)
			} catch (error) {
				console.error('Error fetching config:', error)
			}
		}

		fetchData()
	}, [])

	const [showMenu, setShowMenu] = useState(false)

	const toggleMenu = () => {
		setShowMenu(!showMenu)
	}

	return (
		<>
			<sidebar
				className={`bg-slate-50 fixed top-0 w-80 h-full overflow-y-scroll px-4 py-6 flex flex-col justify-between transition-all lg:left-0 z-50 ${
					showMenu ? 'left-0' : '-left-full'
				}`}>
				<div>
					<ul className='flex flex-col gap-y-8 text-sm font-medium'>
						<li>
							<Link to='/dashboard' className='mx-3 uppercase font-bold text-xl my-2 pb-4'>
								<span className='mr-3 text-slate-700'>SPC</span>
								{config.length ? (
									config.map(config => (
										<span key={config} className='bg-sky-800 rounded-lg px-3 text-slate-50'>
											{config ? config?.abbreviation : 'N/A'}
										</span>
									))
								) : (
									<span>N/A</span>
								)}
							</Link>
						</li>

						<li className='rounded-lg mx-2'>
							<Link
								to='/dashboard/profile'
								className='text-slate-600 bg-slate-50 border hover:bg-slate-100 flex items-center gap-4 py-3 px-4 rounded-xl transition-colors'>
								<img
									src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd8H0ORjKRGQ20TQosJrYTKz3b0N-VvPE8H8Mb4VDo09uzO3B55xmFGDmD0A3K0MV-sxY&usqp=CAU'
									className='rounded-full w-12 h-12 object-cover'
								/>

								<div className='flex flex-col gap-y-2'>
									<span className='text-slate-600 font-bold'>{user ? user?.username : 'N/A'}</span>
									<span className='text-slate-500 font-medium'>{user ? user?.email : 'N/A'}</span>
								</div>
							</Link>
						</li>
					</ul>
				</div>

				<div>
					<ul className='flex flex-col mb-1 text-sm font-medium'>
						<li>
							<span className='text-slate-600 font-bold items-center px-4 text-xs'>Administración</span>
						</li>
					</ul>

					<ul className='flex flex-col text-sm font-medium'>
						<li>
							<Link
								to='/dashboard/categorias'
								className='text-slate-600 hover:text-slate-800 flex items-center gap-4 py-3 px-4 transition-colors duration-200'>
								<BiFoodMenu className='text-lg' />
								Categorias
							</Link>
						</li>

						<li>
							<Link
								to='/dashboard/etiquetas'
								className='text-slate-600 hover:text-slate-800 flex items-center gap-4 py-3 px-4 transition-colors duration-200'>
								<BiBookmarks className='text-lg' />
								Etiquetas
							</Link>
						</li>
						<li>
							<Link
								to='/dashboard/articulos'
								className='text-slate-600 hover:text-slate-800 flex items-center gap-4 py-3 px-4 transition-colors duration-200'>
								<BiArchive className='text-lg' />
								Artículos
							</Link>
						</li>
					</ul>
				</div>

				<div>
					<ul className='flex flex-col mb-1 text-sm font-medium'>
						<li>
							<span className='text-slate-600 font-bold items-center px-4 text-xs'>Comunidad</span>
						</li>
					</ul>

					<ul className='flex flex-col text-sm font-medium'>
						<li>
							<Link
								to='/dashboard/usuarios'
								className='text-slate-600 hover:text-slate-800 flex items-center gap-4 py-3 px-4 transition-colors duration-200'>
								<BiUser className='text-lg' />
								Usuarios
							</Link>
						</li>

						<li>
							<Link
								to='/dashboard/chat'
								className='text-slate-600 hover:text-slate-800 flex items-center gap-4 py-3 px-4 transition-colors duration-200'>
								<BiChat className='text-lg' />
								Mensajes
							</Link>
						</li>
					</ul>
				</div>

				<div>
					<ul className='flex flex-col mb-1 text-sm font-medium'>
						<li>
							<span className='text-slate-600 font-bold items-center px-4 text-xs'>Sistema</span>
						</li>
					</ul>

					<ul className='flex flex-col text-sm font-medium'>
						<li>
							<Link
								to='/dashboard/configuraciones'
								className='text-slate-600 hover:text-slate-800 flex items-center gap-4 py-3 px-4 transition-colors duration-200'>
								<BiCog className='text-lg' />
								Configuracion
							</Link>
						</li>

						<li>
							<Link
								to='/dashboard/profile'
								className='text-slate-600 hover:text-slate-800 flex items-center gap-4 py-3 px-4 transition-colors duration-200'>
								<BiInfoCircle className='text-lg' />
								FAQ
							</Link>
						</li>
					</ul>
				</div>

				<button
					onClick={toggleMenu}
					className='lg:hidden bg-blue-600 text-white fixed bottom-8 right-6 p-2 text-lg rounded-full z-50'>
					{showMenu ? <BiCalendarCheck /> : <BiMenu />}
				</button>
			</sidebar>
		</>
	)
}

export default Sidebar
