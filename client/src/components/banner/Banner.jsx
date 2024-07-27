import React from 'react'

function Banner({ image, alt_text, description, size, padding }) {
	return (
		<div className='flex flex-col items-center justify-center text-sm font-medium text-slate-500 my-20'>
			<img
				src={image}
				alt={alt_text}
				className={` h-auto ${size} ${padding} w-full object-cover object-center md:block`}
			/>
			<span className='-mt-5'>{description ? description : ''}</span>
		</div>
	)
}

export { Banner }
