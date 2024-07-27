import { Link } from 'react-router-dom'
import pathimg from '../../assets/404_error.svg'

const _404 = () => {
	const goBack = () => {
		window.history.back()
	}

	return (
		<section className='flex h-screen w-screen items-center bg-neutral-50'>
			<div className='container mx-auto min-h-screen px-6 py-12 lg:flex lg:items-center lg:gap-12'>
				<div className='wf-ull lg:w-1/2'>
					<p className='text-md font-bold text-[#959b9f]'>Error 404</p>
					<h1 className='mt-3 text-2xl font-semibold text-[#455a64] md:text-3xl'>Página no encontrada</h1>

					<p className='mt-4 font-medium text-neutral-400'>
						Lo sentimos, la página que estás buscando no existe. Aquí hay algunos enlaces útiles:
					</p>

					<div className='mt-6 flex items-center gap-x-3'>
						<Link
							to='/'
							className='w-1/2 shrink-0 rounded-md bg-[#455a64] px-5 py-2 text-sm font-medium tracking-wide text-white transition-colors duration-200 hover:bg-gray-700 sm:w-auto'>
							Llevar al inicio
						</Link>

						<button
							onClick={goBack}
							className='w-1/2 shrink-0 rounded-md border border-slate-300 px-5 py-2 text-sm font-medium tracking-wide text-slate-500 hover:text-slate-700 transition-colors duration-200 hover:bg-slate-100 sm:w-auto'>
							Volver atrás
						</button>
					</div>
				</div>

				<div className='relative mt-12 w-full lg:mt-0 lg:w-1/2'>
					<img className='w-full max-w-lg lg:mx-auto' src={pathimg} alt='' />
				</div>
			</div>
		</section>
	)
}

export { _404 }
