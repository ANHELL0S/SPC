import { Bar } from 'react-chartjs-2'
import { useEffect, useState } from 'react'
import { getAllFacultyRequest } from '../../services/api/faculty.api'
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js'
import { SpinnerLoading } from '../ui/SpinnerLoading'
import { BiMeh } from 'react-icons/bi'

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

const FacultyChart = () => {
	const [faculties, setFaculties] = useState([])
	const [loading, setLoading] = useState(true)
	const [chartData, setChartData] = useState(null)

	useEffect(() => {
		const fetchFaculties = async () => {
			try {
				const facultiesData = await getAllFacultyRequest()
				setFaculties(facultiesData)
			} catch (error) {
			} finally {
				setLoading(false)
			}
		}

		fetchFaculties()
	}, [])

	useEffect(() => {
		if (!loading && faculties.length > 0) {
			const labels = faculties.map(faculty => faculty.name)
			const totalArticlesData = faculties.map(faculty => faculty.totalArticles)

			const newChartData = {
				labels: labels,
				datasets: [
					{
						label: 'Número de Artículos',
						data: totalArticlesData,
						backgroundColor: 'rgba(75, 192, 192, 0.2)',
						borderColor: 'rgba(75, 192, 192, 1)',
						borderWidth: 1,
					},
				],
			}

			setChartData(newChartData)
		}
	}, [faculties, loading])

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				display: false,
				position: 'top',
			},
			title: {
				display: true,
				text: 'Publicaciones por facultad',
				font: {
					size: 16,
					weight: 'bold',
				},
			},
		},
		scales: {
			x: {
				stacked: false,
				ticks: {
					display: false, // Ocultar etiquetas en el eje X
				},
				grid: {
					display: false, // Opcional: Ocultar la línea de la cuadrícula del eje X
				},
			},
			y: {
				stacked: false,
				beginAtZero: true,
			},
		},
	}

	if (loading) {
		return (
			<div className='border border-neutral-300 p-11 rounded-lg'>
				<SpinnerLoading textColor='bg-neutral-400' text='Cargando datos de las publicaciones.' />
			</div>
		)
	}

	if (!loading && faculties.length === 0) {
		return (
			<div className='border border-neutral-300 p-11 rounded-lg h-72 w-72 flex justify-center items-center'>
				<div className='flex flex-col gap-4 items-center text-sm font-medium text-neutral-500'>
					<BiMeh size={26} />
					<p>No hay datos disponibles :(</p>
				</div>
			</div>
		)
	}

	return (
		<div className='border border-neutral-300 p-4 rounded-lg w-80 h-72'>
			{chartData ? (
				<Bar data={chartData} options={options} />
			) : (
				<p>No hay datos disponibles para mostrar el gráfico.</p>
			)}
		</div>
	)
}

export { FacultyChart }
