const Sub_header = ({ title, itemCount }) => {
	return (
		<div className='flex flex-col active:border-neutral-300 lg:col-span-3'>
			<div className='border-b border-neutral-300 flex items-center justify-between gap-2 text-md bg-white text-neutral-500 py-2'>
				<div className='flex flex-row items-center gap-2 font-semibold text-neutral-600 uppercase text-sm'>
					<span>
						{title} ({itemCount})
					</span>
				</div>
			</div>
		</div>
	)
}

export { Sub_header }
