import { Link } from 'react-router-dom'
import { useConfigData } from '../../hooks/useConfig'
import { BiLogoFacebookCircle, BiLogoInstagram, BiLogoTwitter, BiLogoYoutube } from 'react-icons/bi'

const Footer = () => {
	const config = useConfigData()

	return (
		<footer className='w-full text-center text-slate-400'>
			<div className='flex flex-col sm:flex-row justify-between'>
				<div className='text-left sm:py-4'>
					<span className='block text-xs font-bold text-center'>
						&copy; {new Date().getFullYear()} | {config.abbreviation ? config.abbreviation : ''} - SPC . Todos los
						derechos reservados
					</span>
				</div>

				<div className='text-center'>
					<ul className='flex justify-center space-x-5 py-4 items-center'>
						<li>
							<Link to={config.link_ig ? config.link_ig : ''}>
								<BiLogoInstagram className='text-lg hover:text-slate-600 transition-colors duration-200' />
							</Link>
						</li>

						<li>
							<Link to={config.link_fb ? config.link_fb : ''}>
								<BiLogoFacebookCircle className='text-lg hover:text-slate-600 transition-colors duration-200' />
							</Link>
						</li>

						<li>
							<Link to={config.link_x ? config.link_x : ''}>
								<BiLogoTwitter className='text-lg hover:text-slate-600 transition-colors duration-200' />
							</Link>
						</li>

						<li>
							<Link to={config.link_yt ? config.link_yt : ''}>
								<BiLogoYoutube className='text-lg hover:text-slate-600 transition-colors duration-200' />
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</footer>
	)
}

export { Footer }
