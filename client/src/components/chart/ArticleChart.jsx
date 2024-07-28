import { Bar } from 'react-chartjs-2'
import { useEffect, useState } from 'react'
import { fetch as getAllArticle } from '../../services/api/article.api'
import { Chart, LinearScale, CategoryScale, BarElement, Title, Tooltip } from 'chart.js'
import { SpinnerLoading } from '../ui/SpinnerLoading'
import { BiMeh } from 'react-icons/bi'

Chart.register(LinearScale, CategoryScale, BarElement, Title, Tooltip)

const ArticleChart = () => {
	const [articles, setArticles] = useState([])
	const [loading, setLoading] = useState(true)
	const [chartData, setChartData] = useState(null)
	const [key, setKey] = useState(0)

	useEffect(() => {
		const fetchArticles = async () => {
			try {
				const articlesData = await getAllArticle()
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
			const articleDataByCategoryAndMonth = {}

			articles.forEach(article => {
				const createdAt = new Date(article.createdAt)
				const monthYear = `${createdAt.getMonth() + 1}/${createdAt.getFullYear()}`
				const categoryName = article.category_name

				if (!articleDataByCategoryAndMonth[categoryName]) {
					articleDataByCategoryAndMonth[categoryName] = {}
				}

				if (!articleDataByCategoryAndMonth[categoryName][monthYear]) {
					articleDataByCategoryAndMonth[categoryName][monthYear] = 0
				}

				articleDataByCategoryAndMonth[categoryName][monthYear]++
			})

			const sortedCategories = Object.keys(articleDataByCategoryAndMonth).sort()
			const lastFourMonths = getLastFourMonths()
			const labels = lastFourMonths
			const datasets = []

			sortedCategories.forEach(categoryName => {
				const data = lastFourMonths.map(month => {
					return articleDataByCategoryAndMonth[categoryName][month] || 0
				})

				datasets.push({
					label: categoryName,
					data: data,
					backgroundColor: getRandomColor(),
					borderWidth: 1,
				})
			})

			const newChartData = {
				labels: labels,
				datasets: datasets,
			}

			setChartData(newChartData)

			// Incrementar el key para forzar la actualización del componente
			setKey(prevKey => prevKey + 1)
		}
	}, [articles, loading])

	const options = {
		scales: {
			y: {
				beginAtZero: true,
				ticks: {
					stepSize: 1,
				},
			},
		},
		plugins: {
			legend: {
				display: true,
				position: 'top',
				labels: {
					boxWidth: 12, // Ancho de la caja de la leyenda
					font: {
						size: 14, // Tamaño de la fuente de la leyenda
						weight: 'bold', // Peso de la fuente de la leyenda
					},
				},
			},
			title: {
				display: true,
				text: 'Publicaciones',
				font: {
					size: 16, // Tamaño de la fuente del título
					weight: 'bold', // Peso de la fuente del título
				},
			},
		},
	}

	if (loading) {
		return (
			<div className='border border-neutral-300 p-11 rounded-lg h-72 flex justify-center items-center'>
				<SpinnerLoading textColor='bg-neutral-400' text='Cargando datos de las publicaciones.' />
			</div>
		)
	}

	if (!loading && articles.length === 0) {
		return (
			<div className='border border-neutral-300 p-11 rounded-lg text-center'>
				<div className='flex flex-col gap-4 items-center text-sm font-medium text-neutral-500'>
					<BiMeh size={26} />
					<p>No hay artículos disponibles :(</p>
				</div>
			</div>
		)
	}

	return (
		<div className='border border-neutral-300 p-4 rounded-lg'>
			{chartData ? (
				<Bar data={chartData} options={options} key={key} />
			) : (
				<p>No hay datos disponibles para mostrar el gráfico.</p>
			)}
		</div>
	)
}

export { ArticleChart }

// Función para obtener los últimos 4 meses (mes/año)
function getLastFourMonths() {
	const today = new Date()
	const months = []
	for (let i = 3; i >= 0; i--) {
		// Cambiar a 3 para obtener cuatro meses
		const month = new Date(today.getFullYear(), today.getMonth() - i, 1)
		months.push(`${month.getMonth() + 1}/${month.getFullYear()}`)
	}
	return months
}

// Función para generar colores aleatorios
function getRandomColor() {
	const pastelColors = [
		'#b19cd9',
		'#f3c4f5',
		'#a1c9f3',
		'#f9cb9c',
		'#f2c4d5',
		'#b2d8b8',
		'#f3c6a8',
		'#c9c9a3',
		'#e4b7e4',
		'#d6e2ef',
	]
	return pastelColors[Math.floor(Math.random() * pastelColors.length)]
}
