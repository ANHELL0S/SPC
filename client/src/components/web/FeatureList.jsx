import { BiCheckCircle } from 'react-icons/bi'

const FeatureList = () => {
	return (
		<ul className='mt-6 space-y-4 text-sm font-medium text-[#263238]'>
			<li className='flex items-start space-x-2'>
				<BiCheckCircle className='mt-1' />
				<div>
					<h3>Diversidad de categorias</h3>
					<p className='text-slate-400 text-xs'>Explora desde arte hasta física cuántica.</p>
				</div>
			</li>

			<li className='flex items-start space-x-2'>
				<BiCheckCircle className='mt-1' />
				<div>
					<h3>Acceso ilimitado</h3>
					<p className='text-slate-400 text-xs'>
						Nuestra plataforma proporciona acceso completo a todos los artículos.
					</p>
				</div>
			</li>

			<li className='flex items-start space-x-2'>
				<BiCheckCircle className='mt-1' />
				<div>
					<h3>Crea tu propia colección</h3>
					<p className='text-slate-400 text-xs'>Guarda tus artículos de interés.</p>
				</div>
			</li>
		</ul>
	)
}

export { FeatureList }
