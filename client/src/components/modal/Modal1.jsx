import { useState, useEffect } from 'react'
import { ButtonLoadingSpinner } from '../ui/ButtomSpinner'
import { LuInfo, LuUser, LuX } from 'react-icons/lu'

const Modal1 = ({ initialValues, text, colors, onSubmit, onClose, onChange, translation, loading, icon }) => {
	const [modalOpen, setModalOpen] = useState(false)
	const [errors, setErrors] = useState({})
	const [inputValidity, setInputValidity] = useState({})

	useEffect(() => {
		setModalOpen(true)
	}, [])

	useEffect(() => {
		const timer = setTimeout(clearErrors, 3000)
		return () => clearTimeout(timer)
	}, [errors])

	const handleChange = e => {
		const { name, value } = e.target
		onChange(e)
		const fieldErrors = validateField(name, value)
		setErrors(prevErrors => ({
			...prevErrors,
			[name]: fieldErrors,
		}))
		setInputValidity(prevInputValidity => ({
			...prevInputValidity,
			[name]: !fieldErrors,
		}))
	}

	const validateField = (name, value) => {
		let fieldErrors = ''
		if (!value.trim()) {
			fieldErrors = 'Este campo es requerido'
		}
		return fieldErrors
	}

	const handleSubmit = async e => {
		e.preventDefault()
		const formErrors = validateForm(initialValues)
		if (Object.keys(formErrors).length > 0) {
			setErrors(formErrors)
		} else {
			setErrors({})
			onSubmit(e)
		}
	}

	const validateForm = values => {
		const errors = {}
		for (const [key, value] of Object.entries(values)) {
			const fieldErrors = validateField(key, value)
			if (fieldErrors) {
				errors[key] = fieldErrors
			}
		}
		return errors
	}

	const clearErrors = () => {
		setErrors({})
	}

	return (
		<div
			className={`fixed inset-0 z-50 flex items-center justify-center overflow-y-scroll bg-neutral-50/30 backdrop-blur-sm ${
				modalOpen ? 'opacity-100' : 'opacity-0'
			}`}>
			<div className='flex w-full max-w-md flex-col items-end justify-center px-4 text-center sm:block sm:p-0'>
				<div className='transform border border-neutral-300 bg-white text-left align-bottom text-neutral-600 transition-all sm:inline-block sm:w-full sm:max-w-md sm:align-middle rounded-lg'>
					<div className='flex items-center justify-between px-4 pt-4'>
						<div className='flex flex-row items-center gap-2 font-medium text-neutral-600'>
							<div className='rounded-md border p-2'>{icon}</div>
							<span>{text.title}</span>
						</div>

						<div
							onClick={onClose}
							className='cursor-pointer rounded-md p-1.5 text-lg text-neutral-400 transition-colors duration-150 hover:bg-neutral-100 hover:text-neutral-500'>
							<LuX />
						</div>
					</div>

					<div className='text-md flex flex-col gap-y-1 px-4 pt-4 font-semibold text-neutral-600'>
						<div className='flex flex-col gap-y-2 bg-sky-50 px-3 py-2 text-xs font-normal text-sky-700'>
							<div className='flex flex-row items-center gap-1 font-semibold'>
								<LuInfo size={15} />
								<span>Información</span>
							</div>
							<span>{text.info_1}</span>
						</div>
					</div>

					<form onSubmit={handleSubmit} className='space-y-2 px-4 p-6'>
						{Object.keys(initialValues).map(key => (
							<div key={key} className='flex flex-col'>
								<label className={`text-sm font-medium text-neutral-500 ${errors[key] ? 'text-red-500' : ''}`}>
									{translation[key]}
								</label>
								<input
									type='text'
									name={key}
									value={initialValues[key]}
									onChange={handleChange}
									className={`text-neutral-600 mt-1 block w-full text-sm px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring ${
										errors[key] ? 'border-red-500 focus:ring-red-300' : 'focus:ring-blue-300'
									}`}
								/>
								{errors[key] && <p className='mt-1 text-xs text-red-500'>{errors[key]}</p>}
							</div>
						))}

						<div className='flex flex-col justify-between gap-4 pt-4 text-xs font-semibold sm:flex-row'>
							<button
								type='button'
								onClick={onClose}
								className='mt-2 inline-flex w-full justify-center rounded-md border border-neutral-300 px-4 py-2 font-medium text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-600 focus:outline-none sm:mt-0'>
								{text.cancel}
							</button>

							<button
								type='submit'
								disabled={loading}
								className={`mt-2 inline-flex w-full justify-center rounded-md border border-transparent bg-sky-800 px-4 py-2 font-medium text-neutral-50 hover:bg-sky-900 focus:outline-none sm:mt-0 ${
									loading ? 'cursor-not-allowed' : ''
								}`}>
								{loading ? <ButtonLoadingSpinner loadingText='Procesando...' /> : text.submit}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export { Modal1 }
