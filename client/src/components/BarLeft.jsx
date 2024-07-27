import { Link } from 'react-router-dom'
import { BiCollection, BiHomeAlt2 } from 'react-icons/bi'

const BarLeft = () => {
	return (
		<>
			<div className='fixed left-0 top-0 h-full flex flex-col justify-between bg-slate-50 p-2 border hidden md:flex'>
				<div>
					<ul className='mt-2 space-y-6'>
						<li>
							<Link to='/' className='text-slate-700 hover:text-slate-900 hover:bg-slate-200 p-2 rounded-lg'>
								<BiHomeAlt2 className='inline-block text-xl' />
							</Link>
						</li>

						<li>
							<Link to='/artículos' className='text-slate-700 hover:text-slate-900 hover:bg-slate-200 p-2 rounded-lg'>
								<BiCollection className='inline-block text-xl' />
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</>
	)
}

export { BarLeft }
