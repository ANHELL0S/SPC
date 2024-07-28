import { useArticle } from '../../hooks/useArticle'
import { ArticleShort } from '../../components/web/ArticleShort'
import { Spinner } from '../ui/spinner'

const PopularArticle = () => {
	const { articlePopular, loadingPopularArticles } = useArticle()

	return (
		<section className='text-[#263238]'>
			<div className='pt-16'>
				<div className='pb-10 flex justify-center flex-col items-center'>
					<h1 className='text-2xl font-bold tracking-tight text-[#263238]'>
						<span className='mr-2 text-2xl text-[#f68d7a] border-b-4 border-[#f68d7a]'>Articulos populares</span>
					</h1>

					<p className='mt-6 text-sm font-medium text-slate-400'>
						Consulta los artículos más populares de nuestra comunidad científica.
					</p>
				</div>

				<div className='space-y-8 md:grid md:grid-cols-2 lg:grid-cols-2 md:gap-12 md:space-y-0 text-slate-600'>
					{loadingPopularArticles ? (
						<div className='flex items-center justify-center col-span-2'>
							<Spinner />
						</div>
					) : articlePopular.length > 0 ? (
						articlePopular.map(article => <ArticleShort key={article.id_article} article={article} />)
					) : (
						<div className='flex items-center justify-center col-span-2'>
							<Spinner text='Buscando los artículos mas populares.' style='none' />
						</div>
					)}
				</div>
			</div>
		</section>
	)
}

export { PopularArticle }
