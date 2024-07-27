import { BiErrorCircle, BiSolidError } from 'react-icons/bi'
import { useState, useEffect } from 'react'
import { ButtonLoadingSpinner } from '../ui/ButtomSpinner'

const ModalActionRD = ({ text, colors, loading, onClose, onSubmit }) => {
	const [modalOpen, setModalOpen] = useState(false)

	useEffect(() => {
		setModalOpen(true)
	}, [])

	return (
		<div
			className={`fixed inset-0 z-50 flex items-center justify-center overflow-y-scroll bg-neutral-50/30 backdrop-blur-sm ${
				modalOpen ? 'opacity-100' : 'opacity-0'
			}`}>
			<div className='flex w-full max-w-6xl flex-col items-center justify-center p-4'>
				<div className='transform rounded-lg border border-neutral-300 bg-white text-left align-bottom text-neutral-600 transition-all sm:inline-block sm:w-full sm:max-w-md sm:align-middle'>
					<div className='flex items-center justify-center pt-4'>
						<div className={`rounded-full p-2 ${colors.icon_bg_2} text-neutral-50`}>
							<div className={`rounded-full p-1.5 ${colors.icon_bg_1} text-neutral-50`}>
								<BiErrorCircle size={36} />
							</div>
						</div>
					</div>

					<div className='flex flex-col items-center justify-center gap-y-2 px-4 py-4 text-center text-lg font-semibold text-neutral-600'>
						<h1>{text.title}</h1>
						<p className='text-sm font-medium text-neutral-500'>
							{text.description_a} <strong>{text.description_b}</strong> {text.description_c}
						</p>
					</div>

					<div className='flex flex-col p-4 px-4 sm:flex-row sm:justify-between sm:gap-3'>
						<button
							type='button'
							onClick={onClose}
							className='mt-2 inline-flex w-full justify-center rounded-md border px-4 text-neutral-500 py-2 text-sm font-medium hover:text-neutral-600 transition-colors hover:bg-neutral-100 focus:outline-none sm:mt-0'>
							{text.buttonCancel}
						</button>

						<button
							type='button'
							onClick={onSubmit}
							disabled={loading}
							className={`mt-2 inline-flex w-full justify-center rounded-md border border-transparent ${
								colors.bg
							} px-4 py-2 text-sm font-medium text-neutral-50 transition-colors ${
								colors.hoverBg
							} focus:outline-none sm:mt-0 ${loading ? 'cursor-not-allowed' : ''}`}>
							{loading ? <ButtonLoadingSpinner loadingText='Procesando...' /> : text.buttonSubmit}
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export { ModalActionRD }
