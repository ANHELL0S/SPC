const HeaderInfo = ({ slogan, categoryCount, articlesLength }) => {
	return (
		<div className='text-center flex flex-col gap-y-1'>
			<h2 className='text-2xl sm:text-3xl font-bold'>Repositorio de artículos científicos</h2>

			{slogan !== 'vacio' ? <p className='text-slate-500 text-sm'>{slogan}</p> : null}

			<div className='flex flex-wrap justify-center gap-5 my-5'>
				<span className='text-xs border border-slate-300 bg-slate-50 py-1 px-3 rounded-full'>
					<span className='font-bold mr-1'>{categoryCount}</span>Categorías
				</span>

				<span className='text-xs border border-slate-300 bg-slate-50 py-1 px-3 rounded-full'>
					<span className='font-bold mr-1'>{articlesLength}</span>Publicaciones
				</span>
			</div>
		</div>
	)
}

export { HeaderInfo }
