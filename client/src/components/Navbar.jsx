import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import { fetch } from '../services/api/config.api'
import { useState, useEffect, useContext } from 'react'
import { BiBookmarks, BiFoodMenu, BiUser, BiCog, BiListUl, BiArch, BiFile, BiLabel, BiCollection } from 'react-icons/bi'
import Avvvatars from 'avvvatars-react'
import { LuGraduationCap } from 'react-icons/lu'

const Navbar = () => {
	const [config, setConfig] = useState([])
	const [loading, setLoading] = useState(true)
	const { user, logout } = useContext(AuthContext)
	const [adminMenuOpen, setAdminMenuOpen] = useState(false)
	const [profileMenuOpen, setProfileMenuOpen] = useState(false)
	const [parameterMenuOpen, setParameterMenuOpen] = useState(false)
	const [communityMenuOpen, setCommunityMenuOpen] = useState(false)

	const toggleAdminMenu = () => setAdminMenuOpen(!adminMenuOpen)

	const toggleParameterMenu = () => setParameterMenuOpen(!parameterMenuOpen)

	const toggleCommunityMenu = () => setCommunityMenuOpen(!communityMenuOpen)

	const toggleProfileMenu = () => setProfileMenuOpen(!profileMenuOpen)

	const handleLogout = () => logout()

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true) // Indica que se está cargando
				const response = await fetch()
				setConfig(response)
			} catch (error) {
			} finally {
				setLoading(false) // Indica que se ha completado la carga
			}
		}

		fetchData()
	}, [])

	return (
		<>
			{loading ? (
				<header className='flex flex-none items-center bg-white backdrop-blur-sm lg:fixed lg:end-0 lg:start-0 lg:top-0 lg:h-20'>
					<div className='container mx-auto px-4 lg:px-8 xl:max-w-7xl'>
						<div className='flex justify-between py-5 lg:py-'>
							<div className='flex animate-pulse items-center gap-2'>
								<div className='border border-gray-200 group inline-flex items-center font-bold bg-gray-200 animate-pulse'>
									<div className='bg-gray-300 px-3 py-1'></div>
									<div className='mx-3 h-5 bg-gray-300'></div>
									<div className='mx-3 h-5 bg-gray-300'></div>
								</div>
							</div>

							<div className='flex animate-pulse items-center gap-2'>
								<div className='relative'>
									<span className='group flex items-center gap-2 px-3 py-1.5 cursor-pointer text-xs font-semibold uppercase'>
										<div className='h-4 bg-gray-200 rounded w-32'></div>
									</span>
								</div>

								<div className='relative'>
									<span className='group flex items-center gap-2 px-3 py-1.5 cursor-pointer text-xs font-semibold uppercase'>
										<div className='h-4 bg-gray-200 rounded w-32'></div>
									</span>
								</div>
							</div>

							<div className='flex animate-pulse items-center gap-2'>
								<div className='relative'>
									<span className='group flex items-center gap-2 px-3 py-1.5 cursor-pointer text-xs font-semibold uppercase'>
										<div className='h-4 bg-neutral-200 rounded-full p-4'></div>
										<div className='h-4 bg-gray-200 rounded w-32'></div>
									</span>
								</div>
							</div>
						</div>
					</div>
				</header>
			) : (
				<header className='z-50 flex flex-none items-center bg-white backdrop-blur-sm lg:fixed lg:end-0 lg:start-0 lg:top-0 lg:h-20'>
					<div className='container mx-auto px-4 lg:px-8 xl:max-w-7xl'>
						<div className='flex justify-between py-5 lg:py-'>
							<div className='flex items-center gap-2'>
								<Link
									to='/dashboard'
									className='border border-neutral-700 group inline-flex items-center font-bold text-neutral-500'>
									{config.length ? (
										config.map(config => (
											<span key={config} className='bg-neutral-700 px-3 py-0.5 text-neutral-50'>
												{config ? config?.abbreviation : 'N/A'}
											</span>
										))
									) : (
										<span className='mx-3'>N/A</span>
									)}
									<span className='mx-3'>SPC</span>
								</Link>
							</div>

							<div className='flex text-neutral-500 items-center gap-2'>
								<div className='relative' onMouseEnter={toggleParameterMenu} onMouseLeave={toggleParameterMenu}>
									<span className='group flex items-center gap-2 px-3 py-1.5 hover:text-neutral-600 cursor-pointer transition-colors duration-200 text-xs font-semibold uppercase'>
										Parametros
									</span>

									{parameterMenuOpen && (
										<div className='absolute top-full left-3 bg-white text-xs pt-2'>
											<ul className='flex flex-col text-neutral-500 gap-y-1.5 w-48'>
												<li className='border border-neutral-300'>
													<Link
														to='/dashboard/categorias'
														className='hover:text-neutral-50 hover:bg-neutral-600 flex items-center gap-2 transition-colors duration-150'>
														<div className='bg-neutral-600 p-2 text-neutral-50'>
															<BiFoodMenu className='text-base' />
														</div>
														Categorias
													</Link>
												</li>

												<li className='border border-neutral-300'>
													<Link
														to='/dashboard/etiquetas'
														className='hover:text-neutral-50 hover:bg-neutral-600 flex items-center gap-2 transition-colors duration-150'>
														<div className='bg-neutral-600 p-2 text-neutral-50'>
															<BiBookmarks className='text-base' />
														</div>
														Etiquetas
													</Link>
												</li>

												<li className='border border-neutral-300'>
													<Link
														to='/dashboard/parametros'
														className='hover:text-neutral-50 hover:bg-neutral-600 flex items-center gap-2 transition-colors duration-150'>
														<div className='bg-neutral-600 p-2 text-neutral-50'>
															<BiListUl className='text-base' />
														</div>
														Parametros
													</Link>
												</li>

												<li className='border border-neutral-300'>
													<Link
														to='/dashboard/dependencias'
														className='hover:text-neutral-50 hover:bg-neutral-600 flex items-center gap-2 transition-colors duration-150'>
														<div className='bg-neutral-600 p-2 text-neutral-50'>
															<BiLabel className='text-base' />
														</div>
														Dependencia
													</Link>
												</li>

												<li className='border border-neutral-300'>
													<Link
														to='/dashboard/campos-detallados'
														className='hover:text-neutral-50 hover:bg-neutral-600 flex items-center gap-2 transition-colors duration-150'>
														<div className='bg-neutral-600 p-2 text-neutral-50'>
															<BiLabel className='text-base' />
														</div>
														Campo detallado
													</Link>
												</li>

												<li className='border border-neutral-300'>
													<Link
														to='/dashboard/campos-especificos'
														className='hover:text-neutral-50 hover:bg-neutral-600 flex items-center gap-2 transition-colors duration-150'>
														<div className='bg-neutral-600 p-2 text-neutral-50'>
															<BiLabel className='text-base' />
														</div>
														Campo específico
													</Link>
												</li>

												<li className='border border-neutral-300'>
													<Link
														to='/dashboard/campos-amplios'
														className='hover:text-neutral-50 hover:bg-neutral-600 flex items-center gap-2 transition-colors duration-150'>
														<div className='bg-neutral-600 p-2 text-neutral-50'>
															<BiLabel className='text-base' />
														</div>
														Campo amplio
													</Link>
												</li>
											</ul>
										</div>
									)}
								</div>

								<div className='relative' onMouseEnter={toggleCommunityMenu} onMouseLeave={toggleCommunityMenu}>
									<span className='group flex items-center gap-2 px-3 py-1.5 hover:text-neutral-600 cursor-pointer transition-colors duration-200 text-xs font-semibold uppercase'>
										Administración
									</span>

									{communityMenuOpen && (
										<div className='absolute top-full left-3 bg-white text-xs pt-2'>
											<ul className='flex flex-col text-neutral-500 gap-y-1.5 w-28'>
												<li className='border border-neutral-300'>
													<Link
														to='/dashboard/facultades'
														className='hover:text-neutral-50 hover:bg-neutral-600 flex items-center gap-2 transition-colors duration-150'>
														<div className='bg-neutral-600 p-2 text-neutral-50'>
															<BiArch className='text-base' />
														</div>
														Facultades
													</Link>
												</li>

												<li className='border border-neutral-300'>
													<Link
														to='/dashboard/carreras'
														className='hover:text-neutral-50 hover:bg-neutral-600 flex items-center gap-2 transition-colors duration-150'>
														<div className='bg-neutral-600 p-2 text-neutral-50'>
															<LuGraduationCap className='text-base' />
														</div>
														Carreras
													</Link>
												</li>

												<li className='border border-neutral-300'>
													<Link
														to='/dashboard/usuarios'
														className='hover:text-neutral-50 hover:bg-neutral-600 flex items-center gap-2 transition-colors duration-150'>
														<div className='bg-neutral-600 p-2 text-neutral-50'>
															<BiUser className='text-base' />
														</div>
														Usuarios
													</Link>
												</li>

												<li className='border border-neutral-300'>
													<Link
														to='/dashboard/formatos'
														className='hover:text-neutral-50 hover:bg-neutral-600 flex items-center gap-2 transition-colors duration-150'>
														<div className='bg-neutral-600 p-2 text-neutral-50'>
															<BiFile className='text-base' />
														</div>
														Formatos
													</Link>
												</li>

												<li className='border border-neutral-300'>
													<Link
														to='/dashboard/articulos'
														className='hover:text-neutral-50 hover:bg-neutral-600 flex items-center gap-2 transition-colors duration-150'>
														<div className='bg-neutral-600 p-2 text-neutral-50'>
															<BiCollection className='text-base' />
														</div>
														Articulos
													</Link>
												</li>
											</ul>
										</div>
									)}
								</div>
							</div>

							<div className='flex items-center gap-2 text-sm'>
								<div className='relative' onClick={toggleProfileMenu}>
									<div className='group flex flex-row font-semibold text-neutral-500 leading-5 cursor-pointer gap-2 pt-2 pb-2'>
										{user && user.username && <Avvvatars value={user.username} />}
										<span className='flex items-center gap-2 transition-colors duration-200'>{user.username} </span>
									</div>

									{profileMenuOpen && (
										<div className='bg-white absolute end-0 z-10 gapy-8 w-36 ltr:origin-top-right rtl:origin-top-left top-full text-xs pt-2'>
											<ul className='flex flex-col text-neutral-500 gap-y-1.5'>
												<li className='border border-neutral-300'>
													<Link
														to={`/dashboard/perfil/${user.id_user}`}
														className='hover:text-neutral-50 hover:bg-neutral-600 flex items-center gap-2 transition-colors duration-150'>
														<div className='bg-neutral-600 p-2 text-neutral-50'>
															<BiUser className='text-base' />
														</div>
														Cuenta
													</Link>
												</li>

												<li className='border border-neutral-300'>
													<Link
														to='/dashboard/configuraciones'
														className='hover:text-neutral-50 hover:bg-neutral-600 flex items-center gap-2 transition-colors duration-150'>
														<div className='bg-neutral-600 p-2 text-neutral-50'>
															<BiCog className='text-base' />
														</div>
														Ajustes
													</Link>
												</li>

												<li className='border border-neutral-300'>
													<span
														onClick={handleLogout}
														className='hover:text-neutral-50 hover:bg-[#cd664d] flex items-center gap-2 transition-colors duration-150 cursor-pointer'>
														<div className='bg-neutral-600 p-2 text-neutral-50'>
															<BiBookmarks className='text-base' />
														</div>
														Cerrar sesión
													</span>
												</li>
											</ul>
										</div>
									)}
								</div>

								<div className='lg:hidden'>
									<button
										type='button'
										className='inline-flex items-center justify-center gap-2 rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm font-semibold leading-5 text-neutral-800 hover:border-neutral-300 hover:text-neutral-950 active:border-neutral-200'>
										<svg
											fill='currentColor'
											viewBox='0 0 20 20'
											xmlns='http://www.w3.org/2000/svg'
											className='hi-solid hi-menu inline-block h-5 w-5'>
											<path d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'></path>
										</svg>
									</button>
								</div>
							</div>
						</div>
					</div>
				</header>
			)}
		</>
	)
}

export default Navbar
