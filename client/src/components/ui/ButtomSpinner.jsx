/* eslint-disable react/prop-types */
const ButtonLoadingSpinner = ({ loadingText, textColor }) => {
	return (
		<div className='flex items-center justify-center'>
			<div className='flex items-center justify-center'>
				<svg
					className={`mr-2 h-4 w-4 animate-spin ${textColor ? textColor : 'text-white'}`}
					fill='none'
					viewBox='0 0 24 24'
					xmlns='http://www.w3.org/2000/svg'>
					<circle className='opacity-65' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
					<path className='opacity-95' fill='currentColor' d='M4 12a8 8 0 018-8v8H4z'></path>
				</svg>
				<span className={`mr-2 ${textColor ? textColor : 'text-white'}`}>{loadingText ? loadingText : ''}</span>
			</div>
		</div>
	)
}

export { ButtonLoadingSpinner }
