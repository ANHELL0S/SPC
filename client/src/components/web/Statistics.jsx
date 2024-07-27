import { BiArchive, BiFoodMenu, BiUser } from 'react-icons/bi'
import { useArticle } from '../../hooks/useArticle'
import { useCategoryCount } from '../../hooks/useCategories'
import { useUsers } from '../../hooks/useUsers'

const Statistics = () => {
	const { articles, loading: articlesLoading } = useArticle()
	const { userCount, loading: usersLoading } = useUsers()
	const categoryCount = useCategoryCount()

	return (
		<section className='text-[#263238]'>
			<div className='pb-14'>
				<div className='md:flex md:justify-between'>
					<div className='pb-10 flex flex-col md:w-1/2 items-start justify-start'>
						<h1 className='text-2xl font-bold tracking-tight'>
							<span className='text-2xl text-[#f68d7a] border-b-4 border-[#f68d7a]'>Estadísticas</span>
						</h1>

						<p className='mt-6 text-sm font-medium text-slate-400 text-left'>
							Consulta el total de usuarios, artículos y otras métricas clave de nuestra comunidad científica.
						</p>
					</div>

					<div className='md:w-1/2'>
						<div className='space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0 text-slate-600'>
							<div className='flex flex-col items-center justify-center'>
								<div className='flex flex-col pb-2'>
									<div className='bg-slate-100 text-slate-400 p-3 rounded-full'>
										<BiUser className='size-6' />
									</div>
								</div>

								<span className='text-2xl font-semibold mb-1 text-slate-400'>{userCount}</span>
								<span className='text-sm font-medium text-slate-500'>Usuarios</span>
							</div>

							<div className='flex flex-col items-center justify-center'>
								<div className='flex flex-col pb-2'>
									<div className='bg-slate-100 text-slate-400 p-3 rounded-full'>
										<BiFoodMenu className='size-6' />
									</div>
								</div>

								<span className='text-2xl font-semibold mb-1 text-slate-400'>{categoryCount}</span>
								<span className='text-sm font-medium text-slate-500'>Categorías</span>
							</div>

							<div className='flex flex-col items-center justify-center'>
								<div className='flex flex-col pb-2'>
									<div className='bg-slate-100 text-slate-400 p-3 rounded-full'>
										<BiArchive className='size-6' />
									</div>
								</div>

								<span className='text-2xl font-semibold mb-1 text-slate-400'>{articles.length}</span>
								<span className='text-sm font-medium text-slate-500'>Artículos</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export { Statistics }
