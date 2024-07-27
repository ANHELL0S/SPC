/* eslint-disable react/prop-types */
const SpinnerLoading = ({ textColor, text }) => {
	return (
		<div className='flex flex-col items-center'>
			<div className='relative flex flex-col items-center gap-y-4'>
				<div className={`w-6 h-6 ${textColor ? textColor : 'bg-white'} rounded-full`}></div>
				<div
					className={`w-6 h-6 ${
						textColor ? textColor : 'bg-white'
					} rounded-full absolute top-0 left-0 animate-ping`}></div>
				<div
					className={`w-6 h-6 ${
						textColor ? textColor : 'bg-white'
					} rounded-full absolute top-0 left-0 animate-pulse`}></div>
			</div>
			{text && <span className='mt-4 text-sm font-medium text-neutral-500'>{text}</span>}
		</div>
	)
}

export { SpinnerLoading }
