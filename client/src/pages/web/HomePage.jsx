import { Toaster } from 'sonner'
import { useState, useEffect } from 'react'
import { BarLeft } from '../../components/BarLeft'
import { useArticle } from '../../hooks/useArticle'
import { BarRight } from '../../components/BarRight'
import { BottomBar } from '../../components/BarDown'
import { Spinner } from '../../components/ui/spinner'
import { useConfigData } from '../../hooks/useConfig'
import { HeaderInfo } from '../../components/web/HeaderInfo'
import { ArticleShort } from '../../components/web/ArticleShort'
import { FilterSearchBar } from '../../components/web/FilterSearchBar'
import { useAllCategory, useCategoryCount } from '../../hooks/useCategories'
import { Banner } from '../../components/banner/Banner'
import imagePath from '../../assets/Not_Result.svg'
import { Footer } from '../../components/web/Footer'

const HomePage = () => {
	const config = useConfigData()
	const { category } = useAllCategory()
	const categoryCount = useCategoryCount()
	const { articles, loading: articlesLoading } = useArticle()
	const [searchTerm, setSearchTerm] = useState('')
	const [selectedCategory, setSelectedCategory] = useState('')
	const [startDate, setStartDate] = useState('')
	const [endDate, setEndDate] = useState('')
	const [rendering, setRendering] = useState(false)

	const handleCategoryChange = event => {
		setSelectedCategory(event.target.value)
	}

	const handleStartDateChange = event => {
		setStartDate(event.target.value)
	}

	const handleEndDateChange = event => {
		setEndDate(event.target.value)
	}

	const handleResetFilters = () => {
		setSelectedCategory('')
		setStartDate('')
		setEndDate('')
		setSearchTerm('')
	}

	const filteredArticles = articles.filter(article => {
		const matchesSearchTerm = article.title.toLowerCase().includes(searchTerm.toLowerCase())
		const matchesCategory = selectedCategory ? article.category_name === selectedCategory : true
		const matchesStartDate = startDate ? new Date(article.createdAt) >= new Date(startDate) : true
		const matchesEndDate = endDate ? new Date(article.createdAt) <= new Date(endDate) : true
		return matchesSearchTerm && matchesCategory && matchesStartDate && matchesEndDate
	})

	useEffect(() => {
		if (articlesLoading) {
			setRendering(true)
		} else {
			setRendering(false)
		}
	}, [articlesLoading, filteredArticles])

	return (
		<>
			<BarLeft />
			<BarRight />
			<BottomBar />

			{rendering ? (
				<Spinner />
			) : (
				<>
					<div className='max-w-5xl mx-auto text-slate-600 gap-y-4 flex flex-col px-4 sm:px-6 md:px-8 pt-8'>
						<HeaderInfo slogan={config.slogan} categoryCount={categoryCount} articlesLength={articles.length} />

						<FilterSearchBar
							handleCategoryChange={handleCategoryChange}
							handleStartDateChange={handleStartDateChange}
							handleEndDateChange={handleEndDateChange}
							handleResetFilters={handleResetFilters}
							selectedCategory={selectedCategory}
							startDate={startDate}
							endDate={endDate}
							categories={category}
							setSearchTerm={setSearchTerm}
						/>
					</div>

					<div className='max-w-5xl mx-auto text-slate-600 gap-y-4 flex flex-col px-4 sm:px-6 md:px-8 pt-8'>
						<div className='max-w-5xl mx-auto bg-white text-slate-600 w-full pb-16'>
							<div className='flex flex-col'>
								{filteredArticles.length > 0 ? (
									filteredArticles.map(article => <ArticleShort key={article.id_article} article={article} />)
								) : (
									<div className='flex items-center justify-center'>
										<Banner
											image={imagePath}
											alt_text='img login'
											description='Lo sentimos. No se encontró ningún artículo.'
											size='w-1/2'
											padding='pt-0'
										/>
									</div>
								)}
							</div>
						</div>

						<Footer />

						<Toaster richColors expand={true} />
					</div>
				</>
			)}
		</>
	)
}

export { HomePage }
