import { Header } from './Header'
import { Statistics } from './Statistics'
import { FeatureList } from './FeatureList'
import { ExploreButton } from './ExploreButton'
import imagePath from '../../assets/12781046_5062539.svg'
import { Faq } from './Faq'
import { PopularArticle } from './PopularArticle'

const HeroSection = () => {
	return (
		<section className='w-full py-28 bg-white'>
			<div className='container mx-auto'>
				<div className='grid gap-8 md:grid-cols-2'>
					<div>
						<Header />
						<FeatureList />
						<ExploreButton text='Explorar ahora' />
					</div>

					<div className='flex justify-center -mt-20'>
						<img
							src={imagePath}
							alt='Repositorio Científico'
							className='w-5/6 h-auto object-cover object-center hidden md:block'
						/>
					</div>
				</div>

				<div className='grid gap-8 md:grid-cols-1'>
					<PopularArticle />
					<Statistics />
					<Faq />
				</div>
			</div>
		</section>
	)
}

export { HeroSection }
