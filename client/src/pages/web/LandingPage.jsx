import { Navbar } from '../../components/web/Navbar'
import { Footer } from '../../components/web/Footer'
import { HeroSection } from '../../components/web/HeroSection'

const LandingPage = () => {
	return (
		<div className=' max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
			<Navbar />
			<HeroSection />
			<Footer />
		</div>
	)
}

export { LandingPage }
