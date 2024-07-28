import { Link } from 'react-router-dom'
import { BiArrowFromLeft } from 'react-icons/bi'

const ExploreButton = ({ text }) => {
	return (
		<div className='flex justify-start mt-12'>
			<Link
				to='/artículos'
				className='font-semibold flex items-center gap-2 px-4 py-2 bg-[#f68d7a] text-slate-50 rounded-md hover:bg-[#d76b60] transition duration-200 ease-in-out'>
				<span>{text}</span>
				<BiArrowFromLeft />
			</Link>
		</div>
	)
}

export { ExploreButton }
