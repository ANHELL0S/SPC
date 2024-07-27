const Spinner = ({ text, style }) => {
	return (
		<div className={`flex items-center justify-center ${style ? style : 'min-h-screen'} bg-white`}>
			<div className='flex flex-col'>
				<div className='flex space-x-24'>
					<div className='container space-y-10 relative'>
						<div className='flex flex-col items-center'>
							<div className='flex flex-row space-x-2 justify-center items-center pb-2'>
								<div className='h-5 w-5 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.3s]'></div>
								<div className='h-5 w-5 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.15s]'></div>
								<div className='h-5 w-5 bg-slate-300 rounded-full animate-bounce'></div>
							</div>

							<span className='text-sm font-medium text-slate-500'>
								{text ? text : 'Por favor, espera un momento.'}
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export { Spinner }
