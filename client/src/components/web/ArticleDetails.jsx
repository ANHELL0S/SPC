import { useState } from 'react'
import { Link } from 'react-router-dom'
import { formatDate } from '../../utils/dataFormater.utils'
import {
	BiCalendarAlt,
	BiMessageSquareDetail,
	BiBookmark,
	BiPlus,
	BiX,
	BiGroup,
	BiLink,
	BiFoodMenu,
	BiShow,
} from 'react-icons/bi'
import { ButtonLoadingSpinner } from '../ui/ButtomSpinner'

const ArticleDetails = ({
	article,
	comments,
	isAuthenticated,
	isInCollection,
	handleAddCollectionArticle,
	handleRemoveCollectionArticle,
	totalArticlesInCollection,
}) => {
	const [isLoading, setIsLoading] = useState(false)

	const handleClick = async () => {
		setIsLoading(true)
		if (isInCollection) {
			await handleRemoveCollectionArticle()
		} else {
			await handleAddCollectionArticle()
		}
		setIsLoading(false)
	}

	return (
		<div className='max-w-5xl mx-auto bg-white text-slate-600 w-full'>
			<div className='flex flex-col'>
				<div className='max-w-5xl mx-auto bg-white text-slate-600 w-full'>
					<div className='border-b py-4 px-4 my-6 rounded-lg border border-slate-300'>
						<div className='flex items-center justify-between mb-2'>
							<div className='flex items-center text-xs gap-1 text-slate-500'>
								<BiFoodMenu className='text-lg' />
								<span>{article.category_name}</span>
							</div>
							<div className='text-xs text-slate-500'>{formatDate(article.createdAt)}</div>
						</div>

						<div>
							<Link to={`/article/${article.id_article}`} className='text-md font-bold hover:underline'>
								{article.title}
							</Link>
						</div>

						<div className='text-sm text-slate-400 flex items-center gap-1 mt-1'>
							<BiGroup className='text-lg' />
							<span>{article.manager_name}</span>
						</div>

						<div className='text-sm text-slate-500 mt-3'>
							<p>{article.summary}</p>
						</div>

						<hr className='border-1 border-neutral-300 my-4' />

						<div className='flex flex-col gap-y-2 text-xs my-4 font-medium'>
							<h2 className='font-semibold text-slate-600'>Datos del artículo</h2>
							{article.tags.map(tag => (
								<span key={tag.id_relation_tag_article} className='font-normal'>
									{tag.name_tag}: {tag.description_tag ? tag.description_tag : 'No establecido'}
								</span>
							))}

							{article.parameters.map(parameter => (
								<span key={parameter.id_relation_parameter_article} className='font-normal'>
									{parameter.name_parameter}:{' '}
									{parameter.description_parameter ? parameter.description_parameter : 'No establecido'}
								</span>
							))}
						</div>

						<div className='flex items-center justify-between'>
							<div className='flex items-center space-x-4 text-xs font-medium text-slate-500'>
								<div className='flex flex-row items-center justify-center gap-1'>
									<BiMessageSquareDetail size={14} />
									<span>{article.comment_count}</span>
								</div>

								<div className='flex flex-row items-center justify-center gap-1'>
									<BiBookmark size={14} />
									<span>{article.collection_count}</span>
								</div>

								<div className='flex flex-row items-center justify-center gap-1'>
									<BiShow size={15} />
									<span>{article.view_count}</span>
								</div>
							</div>

							{isAuthenticated && (
								<button
									onClick={handleClick}
									disabled={isLoading}
									className={`text-xs font-semibold ${
										isInCollection
											? 'text-red-500 bg-red-50 border border-red-300 hover:bg-red-100'
											: 'text-slate-500 bg-slate-50 border border-slate-300 hover:bg-slate-100'
									} rounded-full px-4 py-1.5 focus:outline-none transition-colors duration-150`}>
									{isInCollection ? (
										<div className='flex flex-row gap-1 items-center'>
											{isLoading ? (
												<ButtonLoadingSpinner loadingText='Eliminando...' textColor='text-red-400' />
											) : (
												<>
													<BiX className='text-lg' />
													<span>Eliminar de colección</span>
												</>
											)}
										</div>
									) : (
										<div className='flex flex-row gap-1 items-center'>
											{isLoading ? (
												<ButtonLoadingSpinner loadingText='Añadiendo...' textColor='text-slate-400' />
											) : (
												<>
													<BiPlus className='text-lg' />
													<span>Añadir a colección</span>
												</>
											)}
										</div>
									)}
								</button>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export { ArticleDetails }
