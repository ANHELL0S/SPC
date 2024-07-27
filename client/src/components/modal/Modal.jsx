/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import { BiX, BiListUl } from 'react-icons/bi'

const Modal = ({ initialValues, translations, colors, onSubmit, onClose, onChange }) => {
	const [modalOpen, setModalOpen] = useState(false)

	useEffect(() => {
		setModalOpen(true)
	}, [])

	const handleSubmit = async e => {
		e.preventDefault()
		try {
			await onSubmit(initialValues)
			setModalOpen(false)
			onClose()
		} catch (error) {
			console.error('Error submitting form:', error)
		}
	}

	return (
		<div
			className={`fixed inset-0 flex items-center justify-center z-50 bg-slate-50 transition-opacity ${
				modalOpen ? 'opacity-100' : 'opacity-0'
			}`}>
			<div className={`modal ${colors.bg[0]} bg-opacity-20 py-6 px-9 rounded-xl shadow-lg w-96 transition-opacity`}>
				<h2 className={`text-xl font-semibold mb-6 text-center ${colors.title}`}>{translations.title}</h2>

				<p className='text-slate-400 font-semibold text-sm text-center mb-6'>{translations.message}</p>

				<form onSubmit={handleSubmit} className='space-y-4 w-full'>
					{Object.keys(initialValues).map(key => (
						<div key={key} className='flex flex-col relative w-full'>
							<input
								type='text'
								name={key}
								value={initialValues[key]}
								onChange={onChange}
								placeholder={translations[key]}
								className='border border-slate-200 rounded-xl py-2 px-3 pl-10 focus:outline-none focus:border-slate-500 text-slate-600 bg-slate-50 w-full'
							/>

							<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
								<BiListUl className='text-gray-400' />
							</div>
						</div>
					))}

					<div className='flex justify-center w-full'>
						<button
							type='button'
							className='flex items-center text-slate-500 hover:underline hover:text-slate-800 p-3 rounded-3xl cursor-pointer transition-colors duration-200 mr-4'
							onClick={onClose}>
							<BiX className='mr-2 text-xl' />
							<span className='text-sm'>{translations.cancel}</span>
						</button>

						<button
							type='submit'
							className={`${colors.bg[1]} ${colors.bg[2]} text-sm text-slate-50 py-2 px-4 rounded-xl transition-colors duration-200 focus:outline-none `}>
							{translations.submit}
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export { Modal }
