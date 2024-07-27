import { Link } from 'react-router-dom'
const goBack = () => {
	window.history.back()
}

const NotFound = ({ title, description, linkText, linkTo }) => (
	<section className='bg-white'>
		<div className='container min-h-screen px-6 py-12 mx-auto lg:flex lg:items-center lg:gap-12'>
			<div className='wf-ull lg:w-2/3'>
				<p className='text-md font-bold text-sky-600'>Error 404</p>

				<h1 className='mt-3 text-2xl font-semibold text-slate-600 md:text-3xl'>{title}</h1>

				<p className='mt-4 text-slate-500'>{description}</p>

				<div className='mt-6 flex items-center gap-x-3'>
					<Link
						to={linkTo}
						className='w-1/2 shrink-0 rounded-md bg-sky-700 ] px-5 py-2 text-sm font-medium tracking-wide text-white transition-colors duration-200 hover:bg-sky-800 sm:w-auto'>
						{linkText}
					</Link>

					<button
						onClick={goBack}
						className='w-1/2 shrink-0 rounded-md border border-slate-300 px-5 py-2 text-sm font-medium tracking-wide text-slate-500 hover:text-slate-700 transition-colors duration-200 hover:bg-slate-100 sm:w-auto'>
						Volver atrás
					</button>
				</div>
			</div>
		</div>
	</section>
)

export { NotFound }
