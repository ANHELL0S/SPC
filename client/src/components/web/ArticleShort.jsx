import { Link } from 'react-router-dom'
import { formatDate } from '../../utils/dataFormater.utils'
import Avvvatars from 'avvvatars-react'
import { Tooltip as ReactTooltip } from 'react-tooltip'

const ArticleShort = ({ article }) => {
	return (
		<div className='max-w-5xl mx-auto bg-white text-slate-600 w-full'>
			<div className='grid grid-cols-4 md:grid-cols-4 gap-4 py-4 transition-all ease-in-out border-b'>
				{/* Primera columna (75%) */}
				<div className='col-span-3 flex flex-col'>
					<div className='flex flex-row items-center gap-4'>
						<a
							data-tooltip-id='my-tooltip'
							data-tooltip-content={article.manager_name}
							className='flex flex-row items-center gap-2 text-xs'>
							{<Avvvatars size={34} value={article.manager_name} />}
						</a>
						<ReactTooltip id='my-tooltip' />

						<div className='gap-y-1 flex flex-col'>
							<Link to={`/article/${article.id_article}`} className='text-md font-bold hover:underline'>
								{article.title}
							</Link>

							<div className='text-sm text-slate-400 flex flex-col items-start gap-1'>
								<span className='bg-slate-100 text-slate-500 font-medium border border-slate-200 px-3 py-0.5 rounded-md text-xs'>
									{article.category_name}
								</span>
							</div>

							<div>
								<span className='text-xs'>{formatDate(article.createdAt)}</span>
							</div>
						</div>
					</div>
				</div>

				{/* Segunda columna (25%) */}
				<div className='col-span-1 flex items-center justify-end gap-2 text-xs text-slate-500'>
					<div className='flex items-center gap-4'>
						<div className='flex flex-col items-center gap-1 bg-[#f9f9f9] border border-slate-100 p-2 rounded-md'>
							<span>{article.comment_count}</span>
							<span>comentarios</span>
						</div>

						<div className='flex flex-col items-center gap-1 bg-[#f9f9f9] border border-slate-100 p-2 rounded-md'>
							<span>{article.collection_count}</span>
							<span>colecciones</span>
						</div>

						<div className='flex flex-col items-center gap-1 bg-[#f9f9f9] border border-slate-100 p-2 rounded-md'>
							<span>{article.view_count}</span>
							<span>vistas</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export { ArticleShort }
