import { Link } from 'react-router-dom'
import { BiRightArrowAlt } from 'react-icons/bi'

const Stadistic = ({ title, link, total, icon }) => {
	return (
		<div className='flex flex-col bg-white lg:col-span-3 rounded-lg py-4 px-4 border border-neutral-300 text-neutral-600'>
			<div className='flex items-center justify-between gap-2 text-sm pb-4'>
				<span className='text-xs font-semibold uppercase block'>{title}</span>
				<Link
					to={link}
					className='flex flex-row gap-2 items-center text-neutral-500 bg-neutral-50 hover:bg-neutral-600 hover:text-neutral-50 px-3 py-1 rounded transition-colors duration-200'>
					<span className='text-xs font-medium'>Ver</span>
					<BiRightArrowAlt className='text-lg' />
				</Link>
			</div>

			<div className='flex grow items-center justify-between'>
				<span className='text-4xl font-semibold'>{total} </span>
				<div className='flex flex-row gap-3 items-center text-neutral-500'>
					<div className='flex items-center text-2xl p-2 rounded-lg border text-neutral-400'>{icon}</div>
				</div>
			</div>
		</div>
	)
}

export { Stadistic }
