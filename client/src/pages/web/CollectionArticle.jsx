import { BarLeft } from '../../components/BarLeft'
import AuthContext from '../../context/AuthContext'
import { BarRight } from '../../components/BarRight'
import { BottomBar } from '../../components/BarDown'
import { Spinner } from '../../components/ui/spinner'
import { useState, useEffect, useContext } from 'react'
import { ArticleShort } from '../../components/web/ArticleShort'
import { getById } from '../../services/api/collection_article.api'
import { Banner } from '../../components/banner/Banner'
import imagePath from '../../assets/Not_Result.svg'

const CollectionArticle = () => {
	const { user } = useContext(AuthContext)
	const [articles, setArticles] = useState([])
	const id = user.id_user
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchArticles = async () => {
			try {
				const fetchedArticles = await getById(id)
				setArticles(fetchedArticles)
			} catch (error) {
				console.error('Error al obtener los artículos de la colección:', error.message)
			} finally {
				setLoading(false)
			}
		}

		fetchArticles()
	}, [id])

	return (
		<>
			<BarLeft />
			<BarRight />
			<BottomBar />

			{loading ? (
				<Spinner />
			) : (
				<main className='px-4'>
					<div className='bg-white w-full flex justify-between items-center max-w-5xl mx-auto mt-4'>
						<div className='flex flex-col'>
							<div className='flex gap-x-6 flex-row'>
								<h2 className='text-lg font-semibold text-slate-700'>Tu colección de artículos ({articles.length})</h2>
							</div>
						</div>
					</div>

					<div className='max-w-5xl mx-auto bg-white text-slate-600 w-full border-t my-4'>
						{articles.length > 0 ? (
							<div className='flex flex-col'>
								<div className='max-w-5xl mx-auto bg-white text-slate-600 w-full'>
									{articles.map(article => (
										<ArticleShort key={article.id_article} article={article} />
									))}
								</div>
							</div>
						) : (
							<div className='flex items-center justify-center'>
								<Banner
									image={imagePath}
									alt_text='img login'
									description='No tienes artículos en tu colección.'
									size='w-1/2'
									padding='pt-0'
								/>
							</div>
						)}
					</div>
				</main>
			)}
		</>
	)
}

export { CollectionArticle }
