import { Pie } from 'react-chartjs-2'
import { useEffect, useState } from 'react'
import { getAllCareerRequest } from '../../services/api/career.api'
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js'
import { SpinnerLoading } from '../ui/SpinnerLoading'
import { BiMeh } from 'react-icons/bi'

Chart.register(ArcElement, Tooltip, Legend)

const CareerChart = () => {
	const [articles, setArticles] = useState([])
	const [loading, setLoading] = useState(true)
	const [chartData, setChartData] = useState(null)

	useEffect(() => {
		const fetchArticles = async () => {
			try {
				const articlesData = await getAllCareerRequest()
				setArticles(articlesData)
			} catch (error) {
			} finally {
				setLoading(false)
			}
		}

		fetchArticles()
	}, [])

	useEffect(() => {
		if (!loading && articles.length > 0) {
			const careerData = {}
			articles.forEach(article => {
				const careerName = article.name
				if (!careerData[careerName]) {
					careerData[careerName] = 0
				}
				careerData[careerName] += article.totalArticles
			})

			const labels = Object.keys(careerData)
			const data = Object.values(careerData)

			const newChartData = {
				labels: labels,
				datasets: [
					{
						label: 'Total de publicaciones',
						data: data,
						backgroundColor: labels.map(() => getRandomColor()),
					},
				],
			}

			setChartData(newChartData)
		}
	}, [articles, loading])

	const options = {
		responsive: true,
		plugins: {
			legend: {
				display: false,
				position: 'top',
				labels: {
					boxWidth: 12,
					font: {
						size: 14,
						weight: 'bold',
					},
				},
			},
			title: {
				display: true,
				text: 'Publicaciones por carrera',
				font: {
					size: 16,
					weight: 'bold',
				},
			},
		},
		layout: {
			padding: {
				top: 20,
				bottom: 20,
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

	if (!loading && articles.length === 0) {
		return (
			<div className='border border-neutral-300 p-11 rounded-lg h-72 flex justify-center items-center'>
				<div className='flex flex-col gap-4 items-center text-sm font-medium text-neutral-500'>
					<BiMeh size={26} />
					<p>No hay artículos disponibles :(</p>
				</div>
			</div>
		)
	}

	return (
		<div className='border border-neutral-300 p-0 rounded-lg w-64 h-72'>
			{chartData ? (
				<Pie data={chartData} options={options} />
			) : (
				<p>No hay datos disponibles para mostrar el gráfico.</p>
			)}
		</div>
	)
}

export { CareerChart }

function getRandomColor() {
	const h = Math.floor(Math.random() * 360)
	const s = Math.floor(Math.random() * 30) + 50
	const l = Math.floor(Math.random() * 30) + 70
	return `hsl(${h}, ${s}%, ${l}%)`
}
