import { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import { BiMenuAltLeft } from 'react-icons/bi'
import { formatDate } from '../../utils/dataFormater.utils'
import { fetch as fetchMovements } from '../../services/api/movements.api'

const HistoryPage = () => {
	const [movements, setMovements] = useState([])
	const [selectedTargetType, setSelectedTargetType] = useState('')
	const [sortBy, setSortBy] = useState('desc')

	useEffect(() => {
		fetchData()
	}, [selectedTargetType, sortBy])

	const fetchData = async () => {
		try {
			const movementsData = await fetchMovements()
			movementsData.sort((a, b) => {
				if (sortBy === 'desc') {
					return new Date(b.createdAt) - new Date(a.createdAt)
				} else {
					return new Date(a.createdAt) - new Date(b.createdAt)
				}
			})
			setMovements(movementsData)
		} catch (error) {
			console.error('Error fetching movements:', error)
		}
	}

	const uniqueTargetTypes = [...new Set(movements.map(movement => movement.targetType))]

	const handleTargetTypeChange = event => {
		setSelectedTargetType(event.target.value)
	}

	const handleSortByChange = event => {
		setSortBy(event.target.value)
	}

	const groupMovementsByTargetType = () => {
		return movements.filter(movement => {
			if (selectedTargetType === '') {
				return true
			}
			return movement.targetType === selectedTargetType
		})
	}

	// Función para categorizar las fechas de los movimientos
	const categorizeMovementsByDate = () => {
		const today = new Date()
		const yesterday = new Date(today)
		yesterday.setDate(yesterday.getDate() - 1)
		const lastWeek = new Date(today)
		lastWeek.setDate(lastWeek.getDate() - 7)
		const lastMonth = new Date(today)
		lastMonth.setMonth(lastMonth.getMonth() - 1)

		const categorizedMovements = {
			Hoy: [],
			Ayer: [],
			'La semana pasada': [],
			'El mes pasado': [],
		}

		groupMovementsByTargetType().forEach(movement => {
			const movementDate = new Date(movement.createdAt)
			if (isSameDay(movementDate, today)) {
				categorizedMovements['Hoy'].push(movement)
			} else if (isSameDay(movementDate, yesterday)) {
				categorizedMovements['Ayer'].push(movement)
			} else if (isSameWeek(movementDate, lastWeek)) {
				categorizedMovements['La semana pasada'].push(movement)
			} else if (isSameMonth(movementDate, lastMonth)) {
				categorizedMovements['El mes pasado'].push(movement)
			} else {
				const monthNames = [
					'Enero',
					'Febrero',
					'Marzo',
					'Abril',
					'Mayo',
					'Junio',
					'Julio',
					'Agosto',
					'Septiembre',
					'Octubre',
					'Noviembre',
					'Diciembre',
				]
				const month = monthNames[movementDate.getMonth()]
				const year = movementDate.getFullYear()
				const fullDate = `${month} del ${year}`
				if (!categorizedMovements[fullDate]) {
					categorizedMovements[fullDate] = []
				}
				categorizedMovements[fullDate].push(movement)
			}
		})

		// Eliminar categorías vacías
		Object.keys(categorizedMovements).forEach(category => {
			if (categorizedMovements[category].length === 0) {
				delete categorizedMovements[category]
			}
		})

		return categorizedMovements
	}

	// Función auxiliar para verificar si dos fechas son del mismo día
	const isSameDay = (date1, date2) => {
		return (
			date1.getFullYear() === date2.getFullYear() &&
			date1.getMonth() === date2.getMonth() &&
			date1.getDate() === date2.getDate()
		)
	}

	// Función auxiliar para verificar si dos fechas están en la misma semana
	const isSameWeek = (date1, date2) => {
		const firstDayOfWeek = new Date(date1)
		const lastDayOfWeek = new Date(date1)
		firstDayOfWeek.setDate(firstDayOfWeek.getDate() - date1.getDay())
		lastDayOfWeek.setDate(lastDayOfWeek.getDate() + (6 - date1.getDay()))

		return date2 >= firstDayOfWeek && date2 <= lastDayOfWeek
	}

	// Función auxiliar para verificar si dos fechas están en el mismo mes
	const isSameMonth = (date1, date2) => {
		return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth()
	}

	return (
		<>
			<Navbar />

			<div className='h-screen lg:end-0 lg:start-0 lg:top-0 lg:h-20'>
				<main className='container mx-auto px-4 lg:px-8 xl:max-w-7xl'>
					<div className='lg:py-20 sm:py-0 '>
						<div className='rounded-lg text-neutral-600 bg-white'>
							<div className='flex flex-col lg:col-span-3'>
								<div className='flex items-center justify-between gap-2 text-md my-2 py-2'>
									<div className='flex flex-row items-center gap-2 font-semibold uppercase text-sm'>
										<span>
											{selectedTargetType ? `Actividades recientes - ${selectedTargetType}` : 'Actividades recientes'}
										</span>
									</div>
								</div>
							</div>

							<div>
								<div className='flex gap-x-4 text-neutral-500 font-medium text-xs mb-4'>
									<div className='flex items-center px-3 border border-neutral-300 rounded-lg'>
										<BiMenuAltLeft className='text-neutral-500' />
										<select
											value={selectedTargetType}
											onChange={handleTargetTypeChange}
											className='rounded-xl p-2 bg-transparent cursor-pointer outline-none'>
											<option value=''>Todos</option>
											{uniqueTargetTypes.map(type => (
												<option key={type} value={type}>
													{type}
												</option>
											))}
										</select>
									</div>

									<div className='flex items-center px-3 border border-neutral-300 rounded-lg'>
										<BiMenuAltLeft className='text-neutral-500' />
										<select
											value={sortBy}
											onChange={handleSortByChange}
											className='rounded-xl p-2 bg-transparent cursor-pointer outline-none'>
											<option value='desc'>Reciente</option>
											<option value='asc'>Antiguo</option>
										</select>
									</div>
								</div>

								<div className='pb-4'>
									{Object.entries(categorizeMovementsByDate()).map(([category, categoryMovements]) => (
										<div key={category}>
											<div className='my-2'>
												<h3 className='text-xs font-bold uppercase text-neutral-500'>{category}</h3>
											</div>

											{categoryMovements.map((movement, index) => (
												<div key={index} className='flex gap-x-2'>
													<div className='relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-neutral-400'>
														<div className='relative z-10 size-7 flex justify-center items-center'>
															<div className='size-2 bg-neutral-400'></div>
														</div>
													</div>

													<div className='grow pt-0.5 pb-4 mt-1'>
														<h1 className='text-neutral-500 text-xs mb-1'>{formatDate(movement.createdAt)}</h1>
														<h3 className='text-neutral-600 text-sm'>
															{movement.action} {movement.targetName}
														</h3>
													</div>
												</div>
											))}
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</main>
			</div>
		</>
	)
}

export { HistoryPage }
