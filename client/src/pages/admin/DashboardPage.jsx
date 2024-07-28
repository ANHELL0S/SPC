import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import { useAuth } from '../../context/AuthContext'
import { formatDate } from '../../utils/dataFormater.utils'
import { fetch as fetchTags } from '../../services/api/tags.api'
import { getALlUsersRequest } from '../../services/api/users.api'
import { fetch as fetchMovements } from '../../services/api/movements.api'
import { fetch as fetchCategories } from '../../services/api/categories.api'
import { BiArch, BiArchive, BiFoodMenu, BiMeh, BiRightArrowAlt, BiUser } from 'react-icons/bi'
import { useArticle } from '../../hooks/useArticle'
import { Stadistic } from '../../components/card/Stadistic'
import { ArticleChart } from '../../components/chart/ArticleChart'
import { CareerChart } from '../../components/chart/CareerChart'
import { FacultyChart } from '../../components/chart/FacultyChart'
import { useAllFaculty } from '../../hooks/useFaculty'
import { SpinnerLoading } from '../../components/ui/SpinnerLoading'

const DashboardPage = () => {
	const { user } = useAuth()
	const [loading, setLoading] = useState(true)
	const [loadingMovements, setLoadingMovements] = useState(true)
	const { articleAll, articles } = useArticle()
	const [movements, setMovements] = useState([])
	const [totalUsers, setTotalUsers] = useState(0)
	const [totalCategories, setTotalCategories] = useState(0)
	const [totalTags, setTotalTags] = useState(0)
	const [inactiveUsersCount, setInactiveUsersCount] = useState(0)
	const [inactiveCategoryCount, setInactiveCategoryCount] = useState(0)
	const [inactiveTagsCount, setInactiveTagsCount] = useState(0)
	const { faculties } = useAllFaculty()

	useEffect(() => {
		fetchData()
		fetchGlobalInfo()
	}, [])

	const fetchData = async () => {
		try {
			setLoadingMovements(true) // Indica que se está cargando los movimientos
			const movementsData = await fetchMovements()
			movementsData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
			setMovements(movementsData)
		} catch (error) {
			console.error('Error fetching movements:', error)
		} finally {
			setLoadingMovements(false) // Indica que se ha completado la carga de los movimientos
		}
	}

	const fetchGlobalInfo = async () => {
		try {
			setLoading(true) // Indica que se está cargando la información global
			const usersData = await getALlUsersRequest()
			const inactiveUsers = usersData.filter(user => !user.active)
			setTotalUsers(usersData.length)
			setInactiveUsersCount(inactiveUsers.length)

			const categoriesData = await fetchCategories()
			const inactiveCategory = categoriesData.filter(category => !category.active)
			setTotalCategories(categoriesData.length)
			setInactiveCategoryCount(inactiveCategory.length)

			const tagsData = await fetchTags()
			const inactiveTags = tagsData.filter(tags => !tags.active)
			setTotalTags(tagsData.length)
			setInactiveTagsCount(inactiveTags.length)
		} catch (error) {
			console.error('Error fetching global info:', error)
		} finally {
			setLoading(false) // Indica que se ha completado la carga de la información global
		}
	}

	const groupMovementsByTargetType = () => {
		const groupedMovements = {}
		movements.forEach(movement => {
			if (!groupedMovements[movement.targetType]) {
				groupedMovements[movement.targetType] = []
			}
			if (groupedMovements[movement.targetType].length < 1) {
				groupedMovements[movement.targetType].push(movement)
			}
		})
		return groupedMovements
	}

	return (
		<>
			<Navbar />

			<div className='h-screen lg:end-0 lg:start-0 lg:top-0 lg:h-20'>
				<main className='container mx-auto px-4 lg:px-8 xl:max-w-7xl'>
					<div className='sm:py-0 lg:py-16'>
						<div className='flex flex-col gap-2 text-center sm:flex-row sm:items-center sm:justify-between sm:text-start'>
							<div className='grow py-8'>
								<h1 className='mb-1 text-xl font-semibold text-neutral-600'>Bienvenido, {user.username} 👋</h1>
							</div>
						</div>

						<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8'>
							<Stadistic title='Usuarios' link='/dashboard/usuarios' total={totalUsers - 1} icon={<BiUser />} />

							<Stadistic
								title='Categorias'
								link='/dashboard/categorias'
								total={totalCategories}
								icon={<BiFoodMenu />}
							/>

							<Stadistic title='Facultades' link='/dashboard/facultades' total={faculties.length} icon={<BiArch />} />

							<Stadistic title='Articulos' link='/dashboard/articulos' total={articleAll.length} icon={<BiArchive />} />
						</div>

						<div className='mt-6 grid grid-cols-2 gap-4 sm:grid-cols-1 lg:grid-cols-12 lg:gap-8'>
							<div className='col-span-12 md:col-span-6 xl:col-span-6 space-y-6'>
								<ArticleChart />
							</div>

							<div className='flex flex-row gap-4 md:grid-cols-1'>
								<CareerChart />
								<FacultyChart />
							</div>
						</div>

						<div className='bg-white text-neutral-600 grid lg:grid-cols-2 gap-8 pt-6'>
							<div className='border border-neutral-300 rounded-xl px-4 py-2'>
								<div className='flex items-center justify-between gap-2 text-sm bg-white'>
									<div className='flex flex-row items-center gap-2 font-medium'>
										<span className='text-xs font-semibold uppercase text-neutral-600'>Actividad reciente</span>
									</div>

									<Link
										to='/dashboard/historial'
										className='flex flex-row gap-2 items-center text-neutral-500 bg-neutral-50 hover:bg-neutral-600 hover:text-neutral-50 px-3 py-1 rounded transition-colors duration-200'>
										<span className='text-xs font-medium'>Ver</span>
										<BiRightArrowAlt className='text-lg' />
									</Link>
								</div>

								<div className='bg-white text-neutral-600 gap-4'>
									<div className='grid grid-cols-1 gap-6 py-4'>
										{loadingMovements ? (
											<div className='m-24'>
												<SpinnerLoading textColor='bg-neutral-400' text='Cargando registro de movimientos.' />
											</div>
										) : (
											<>
												{Object.entries(groupMovementsByTargetType()).length === 0 ? (
													<div className='m-24 text-center'>
														<div className='flex flex-col gap-4 items-center text-sm font-medium text-neutral-500'>
															<BiMeh size={26} />
															<p>No hay actividades recientes :(</p>
														</div>
													</div>
												) : (
													Object.entries(groupMovementsByTargetType()).map(([date, groupedMovements]) => (
														<div key={date}>
															<div className='my-2'>
																<h3 className='text-xs font-semibold uppercase text-neutral-400'>{date}</h3>
															</div>

															{groupedMovements.map((movement, index) => (
																<div key={index} className='flex gap-x-1'>
																	<div className='relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-neutral-400 '>
																		<div className='relative z-10 size-7 flex justify-center items-center'>
																			<div className='size-2 bg-neutral-400'></div>
																		</div>
																	</div>

																	<div className='flex-1 pt-0.5 pb-4 mt-1'>
																		<h1 className='text-neutral-500 text-xs mb-1'>{formatDate(movement.createdAt)}</h1>
																		<h3 className='text-neutral-600 text-sm'>
																			{movement.action} {movement.targetName}
																		</h3>
																	</div>
																</div>
															))}
														</div>
													))
												)}
											</>
										)}
									</div>
								</div>
							</div>

							<div className='border border-neutral-300 rounded-xl px-4 py-2'>
								<div className='flex items-center justify-between gap-2 text-sm bg-white'>
									<div className='flex flex-row items-center gap-2 font-medium'>
										<span className='text-xs font-semibold uppercase text-neutral-600'>Solicitudes de vetificados</span>
									</div>

									<Link
										to='/dashboard/historial'
										className='flex flex-row gap-2 items-center text-neutral-500 bg-neutral-50 hover:bg-neutral-600 hover:text-neutral-50 px-3 py-1 rounded transition-colors duration-200'>
										<span className='text-xs font-medium'>Ver</span>
										<BiRightArrowAlt className='text-lg' />
									</Link>
								</div>

								<div className='bg-white text-neutral-600 grid lg:grid-cols-2 gap-4'>
									<div className='grid grid-cols-1 gap-6 py-4'>
										{loadingMovements ? (
											<div className='m-24'>
												<SpinnerLoading textColor='bg-neutral-400' text='Cargando registro de movimientos.' />
											</div>
										) : (
											<>
												{Object.entries(groupMovementsByTargetType()).length === 0 ? (
													<div className='m-24 text-center'>
														<div className='flex flex-col gap-4 items-center text-sm font-medium text-neutral-500'>
															<BiMeh size={26} />
															<p>No hay actividades recientes :(</p>
														</div>
													</div>
												) : (
													Object.entries(groupMovementsByTargetType()).map(([date, groupedMovements]) => (
														<div key={date}>
															<div className='my-2'>
																<h3 className='text-xs font-semibold uppercase text-neutral-400'>{date}</h3>
															</div>

															{groupedMovements.map((movement, index) => (
																<div key={index} className='flex gap-x-1'>
																	<div className='relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-neutral-400 '>
																		<div className='relative z-10 size-7 flex justify-center items-center'>
																			<div className='size-2 bg-neutral-400'></div>
																		</div>
																	</div>

																	<div className='flex-1 pt-0.5 pb-4 mt-1'>
																		<h1 className='text-neutral-500 text-xs mb-1'>{formatDate(movement.createdAt)}</h1>
																		<h3 className='text-neutral-600 text-sm'>
																			{movement.action} {movement.targetName}
																		</h3>
																	</div>
																</div>
															))}
														</div>
													))
												)}
											</>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				</main>
			</div>
		</>
	)
}

export { DashboardPage }
