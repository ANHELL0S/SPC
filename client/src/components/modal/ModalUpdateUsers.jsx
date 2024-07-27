import { useState, useEffect } from 'react'
import { HiXMark } from 'react-icons/hi2'
import { ButtonLoadingSpinner } from '../ui/ButtomSpinner'

const ModalUpdateUsers = ({ initialValues, text, onSubmit, onClose, onChange, translation, loading }) => {
	const [modalOpen, setModalOpen] = useState(false)
	const [errors, setErrors] = useState({})

	useEffect(() => {
		setModalOpen(true)
	}, [])

	useEffect(() => {
		const timer = setTimeout(() => clearErrors(), 3000)
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
		<>
			<div
				className={`fixed inset-0 flex items-center justify-center z-50 bg-neutral-50 transition-opacity ${
					modalOpen ? 'opacity-100' : 'opacity-0'
				}`}>
				<div className='flex items-end justify-center px-4 text-center sm:block sm:p-0 w-full max-w-lg mx-auto'>
					<div className='sm:inline-block align-bottom bg-neutral-50 text-left transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full text-slate-600'>
						<div className='flex items-center justify-between gap-2 text-md text-neutral-500 font-medium px-4 py-2 rounded-t-lg'>
							<span>{text.title}</span>
							<button
								type='button'
								onClick={onClose}
								className='flex items-center p-2 rounded-full text-neutral-500 hover:text-neutral-700 hover:bg-neutral-200 transition-colors bg-neutral-100'>
								<HiXMark className='w-5 h-5' />
							</button>
						</div>

						<form onSubmit={handleSubmit} className='w-full flex flex-col space-y-4'>
							<div className='flex flex-col gap-y-4 text-sm text-slate-600 px-4'>
								{Object.keys(initialValues).map(key => (
									<div key={key} className='flex flex-col'>
										<label className={`text-xs font-medium text-neutral-600 ${errors[key] ? 'text-red-500' : ''}`}>
											{translation[key]}
										</label>
										{key === 'rol' ? (
											<select
												name='rol'
												value={initialValues['rol']}
												onChange={handleChange}
												className={`text-neutral-600 mt-1 block w-full px-3 py-1.5 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring ${
													errors[key] ? 'border-red-500 focus:ring-red-300' : 'focus:ring-blue-300'
												}`}>
												<option value=''>Seleccionar rol</option>
												<option value='admin'>Admin</option>
												<option value='docente'>Docente</option>
												<option value='general'>General</option>
											</select>
										) : (
											<input
												type='text'
												name={key}
												value={initialValues[key]}
												onChange={handleChange}
												className={`text-neutral-600 mt-1 block w-full px-3 py-1.5 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring ${
													errors[key] ? 'border-red-500 focus:ring-red-300' : 'focus:ring-blue-300'
												}`}
											/>
										)}
										{errors[key] && <p className='mt-1 text-xs text-red-500'>{errors[key]}</p>}
									</div>
								))}

								<div className='flex justify-between py-4 font-semibold gap-4 flex-col sm:flex-row'>
									<button
										onClick={onClose}
										className='flex-1 px-4 border border-slate-300 text-slate-600 rounded-lg hover:bg-slate-100 transition-colors duration-150'>
										{text.cancel}
									</button>

									<button
										type='submit'
										className={`flex-1 px-4 py-3 bg-sky-700 text-white rounded-lg hover:bg-sky-800 transition-colors duration-150 disabled:opacity-50' inline-flex h-10 items-center justify-center hover:text-white hover:ring hover:ring-white disabled:pointer-events-none ${
											loading ? 'cursor-not-allowed' : ''
										}`}>
										{loading ? <ButtonLoadingSpinner loadingText='Guardando cambios...' /> : 'Guardar cambios'}
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	)
}

export { ModalUpdateUsers }
