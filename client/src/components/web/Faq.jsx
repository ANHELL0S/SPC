import { BiArchive, BiFoodMenu, BiUser } from 'react-icons/bi'

const Faq = () => {
	return (
		<div>
			<div className='pb-10 flex justify-center flex-col items-center'>
				<h1 className='text-2xl font-bold tracking-tight text-[#263238]'>
					<span className='mr-2 text-2xl text-[#f68d7a] border-b-4 border-[#f68d7a]'>Preguntas frecuentes</span>
				</h1>
			</div>

			<div class='grid grid-cols-1 md:grid-cols-2 gap-4 xl:gap-12 mt-4'>
				<div class='flex space-x-8 mt-8'>
					<div>
						<h4 class='text-md font-bold text-slate-500'>¿Cómo puedo acceder a los artículos?</h4>
						<p class='text-slate-400 my-2 text-sm'>
							Puedes acceder a los artículos sin la necesidad de crear una cuenta en nuestro sitio web. Pero, te
							recomendamos que crees una cuenta para poder añladir tus artículos favoritos a tu colección.
						</p>
					</div>
				</div>

				<div class='flex space-x-8 mt-8'>
					<div>
						<h4 class='text-md font-bold text-slate-500'>¿Qué tipos de artículos están disponibles?</h4>
						<p class='text-slate-400 my-2 text-sm'>
							Nuestro repositorio incluye una amplia gama de artículos científicos en varias disciplinas, incluyendo
							biología, química, física, ingeniería y ciencias sociales.
						</p>
					</div>
				</div>

				<div class='flex space-x-8 mt-8'>
					<div>
						<h4 class='text-md font-bold text-slate-500'>¿Cómo puedo enviar mis propios artículos?</h4>
						<p class='text-slate-400 my-2 text-sm'>
							Puedes subir artóculos a nuestro portal simopre y cuando tengas uan cuenta registrada como docente. Por
							favor, asegúrate de llenar todos los campos requeridos del artículo a subir antes de enviarlo.
						</p>
					</div>
				</div>

				<div class='flex space-x-8 mt-8'>
					<div>
						<h4 class='text-md font-bold text-slate-500'>¿Hay artículos de acceso abierto?</h4>
						<p class='text-slate-400 my-2 text-sm'>
							Sí, todos los artículos son de acceso abierto que pueden ser consultados sin una suscripción. Estos
							artículos son revisados por pares y están disponibles gratuitamente para el público.
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export { Faq }
