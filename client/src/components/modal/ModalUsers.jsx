import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import { LuInfo, LuUser, LuX } from 'react-icons/lu'
import { zodResolver } from '@hookform/resolvers/zod'
import { ButtonLoadingSpinner } from '../ui/ButtomSpinner'
import { getAllFacultyRequest } from '../../services/api/faculty.api'
import { UsersCreateSchema } from '../../validators/createUsersValidator'
import {
	dedicationOptions,
	employmentRelationshipOptions,
	filiationOptions,
	genderOptions,
} from '../../constants/conts'

const ModalUsers = ({ text, onSubmit, onClose, loading, onChange, formData }) => {
	const [modalOpen, setModalOpen] = useState(false)
	const [submitting, setSubmitting] = useState(false)
	const [facultyOptions, setFacultyOptions] = useState([])
	const [loadingFaculty, setLoadingFaculty] = useState(false)

	useEffect(() => {
		setModalOpen(true)
		fetchFacultyOptions()
	}, [])

	const fetchFacultyOptions = async () => {
		try {
			const response = await getAllFacultyRequest()
			setFacultyOptions(response)
		} catch (error) {
			setLoadingFaculty(false)
		}
	}

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		watch,
	} = useForm({
		resolver: zodResolver(UsersCreateSchema),
		defaultValues: formData,
	})

	const onSubmitForm = async data => {
		setSubmitting(true)
		await onSubmit(data)
	}

	useEffect(() => {
		const subscription = watch((value, { name, type }) => {
			if (type === 'change') {
				onChange({
					target: {
						name,
						value,
					},
				})
			}
		})
		return () => subscription.unsubscribe()
	}, [watch, onChange])

	return (
		<>
			<div
				className={`fixed inset-0 z-50 flex items-start justify-start overflow-y-scroll bg-neutral-50/30 backdrop-blur-sm ${
					modalOpen ? 'opacity-100' : 'opacity-0'
				}`}>
				<div className='flex w-full max-w-md flex-col items-end justify-center px-4 text-center sm:block sm:p-0'>
					<div className='transform border-r border-neutral-300 bg-white text-left align-bottom text-neutral-600 transition-all sm:inline-block sm:w-full sm:max-w-md sm:align-middle'>
						<div className='flex items-center justify-between px-4 pt-4'>
							<div className='flex flex-row items-center gap-2 font-medium text-neutral-600'>
								<div className='rounded-md border p-2'>
									<LuUser />
								</div>
								<span>{text.title}</span>
							</div>

							<div
								onClick={onClose}
								className='cursor-pointer rounded-md p-1.5 text-lg text-neutral-400 transition-colors duration-150 hover:bg-neutral-100 hover:text-neutral-500'>
								<LuX />
							</div>
						</div>

						<div className='text-md flex flex-col gap-y-1 px-4 py-4 font-semibold text-neutral-600'>
							<div className='flex flex-col gap-y-2 bg-sky-50 px-3 py-2 text-xs font-normal text-sky-700'>
								<div className='flex flex-row items-center gap-1 font-semibold'>
									<LuInfo size={14} />
									<span>Información</span>
								</div>
								<span>{text.description}</span>
								<ol className='list-disc pl-4 gap-y-1 flex flex-col'>
									<li>
										<span>{text.info}</span>
									</li>
									<li>
										<span>
											<strong>{text.example}</strong>
										</span>
									</li>
								</ol>
							</div>
						</div>

						<form onSubmit={handleSubmit(onSubmitForm)} className='flex flex-col gap-y-2 px-4 text-xs text-neutral-600'>
							<div className='grid grid-cols-1 gap-x-4 gap-y-3 pt-2 font-medium'>
								<div className='flex flex-col gap-y-2'>
									<div>
										<label className={`text-neutral-600 ${errors.username ? 'text-red-600' : ''}`}>
											Nombres y Apellidos
										</label>
										<span className='text-red-600'>*</span>
									</div>
									<input
										type='text'
										name='username'
										{...register('username')}
										className={`rounded-md border border-neutral-300 p-2 font-medium text-neutral-700 outline-none placeholder:text-neutral-400 ${
											errors.username ? 'border-red-300' : ''
										}`}
										placeholder='Angelo David García Arteaga'
									/>
									{errors.username && <p className='text-red-400'>{errors.username.message}</p>}
								</div>
							</div>

							<div className='grid grid-cols-2 gap-x-4 gap-y-3 pt-2 font-medium'>
								<div className='flex flex-col gap-y-2'>
									<div>
										<label className={`text-neutral-600 ${errors.email ? 'text-red-600' : ''}`}>
											Correo electrónico
										</label>
										<span className='text-red-600'>*</span>
									</div>
									<input
										type='email'
										name='email'
										{...register('email')}
										className={`rounded-md border border-neutral-300 p-2 font-medium text-neutral-700 outline-none placeholder:text-neutral-400 ${
											errors.email ? 'border-red-300' : ''
										}`}
										placeholder='angelo@gmail.com'
									/>
									{errors.email && <p className='text-red-400'>{errors.email.message}</p>}
								</div>

								<div className='flex flex-col gap-y-2'>
									<div>
										<label className={`text-neutral-600 ${errors.phone ? 'text-red-600' : ''}`}>Teléfono</label>
										<span className='text-red-600'>*</span>
									</div>
									<input
										type='text'
										name='phone'
										{...register('phone')}
										className={`rounded-md border border-neutral-300 p-2 font-medium text-neutral-700 outline-none placeholder:text-neutral-400 ${
											errors.phone ? 'border-red-300' : ''
										}`}
										placeholder='0980868530'
									/>
									{errors.phone && <p className='text-red-400'>{errors.phone.message}</p>}
								</div>
							</div>

							<div className='grid grid-cols-3 gap-x-4 gap-y-3 pt-2 font-medium'>
								<div className='flex flex-col gap-y-2'>
									<div>
										<label className={`text-neutral-600 ${errors.identification_card ? 'text-red-600' : ''}`}>
											Cédula
										</label>
										<span className='text-red-600'>*</span>
									</div>
									<input
										type='text'
										name='identification_card'
										{...register('identification_card')}
										className={`rounded-md border border-neutral-300 p-2 font-medium text-neutral-700 outline-none placeholder:text-neutral-400 ${
											errors.identification_card ? 'border-red-300' : ''
										}`}
										placeholder='0202146234'
									/>
									{errors.identification_card && <p className='text-red-400'>{errors.identification_card.message}</p>}
								</div>

								<div className='flex flex-col gap-y-2'>
									<div>
										<label className={`text-neutral-600 ${errors.gender ? 'text-red-600' : ''}`}>Género</label>
										<span className='text-red-600'>*</span>
									</div>

									<select
										name='gender'
										{...register('gender')}
										className={`rounded-md border border-neutral-300 bg-white p-2 font-medium text-neutral-700 outline-none placeholder:text-neutral-400 ${
											errors.gender ? 'border-red-300' : ''
										}`}>
										<option hidden value=''>
											Seleccionar
										</option>
										{genderOptions.map(option => (
											<option key={option.value} value={option.value}>
												{option.label}
											</option>
										))}
									</select>
									{errors.gender && <p className='text-red-400'>{errors.gender.message}</p>}
								</div>

								<div className='flex flex-col gap-y-2'>
									<div>
										<label className={`text-neutral-600 ${errors.filiation ? 'text-red-600' : ''}`}>Afiliado</label>
										<span className='text-red-600'>*</span>
									</div>

									<select
										name='filiation'
										{...register('filiation')}
										className={`rounded-md border border-neutral-300 bg-white p-2 font-medium text-neutral-700 outline-none placeholder:text-neutral-400 ${
											errors.filiation ? 'border-red-300' : ''
										}`}>
										<option hidden value=''>
											Seleccionar
										</option>
										{filiationOptions.map(option => (
											<option key={option.value} value={option.value}>
												{option.label}
											</option>
										))}
									</select>
									{errors.filiation && <p className='text-red-400'>{errors.filiation.message}</p>}
								</div>
							</div>

							{facultyOptions.length !== 0 ? (
								<div className='grid grid-cols-1 gap-x-4 gap-y-3 pt-2 font-medium'>
									<div className='flex flex-col gap-y-2'>
										<div>
											<label className={`text-neutral-600 ${errors.faculty ? 'text-red-600' : ''}`}>Facultad</label>
											<span className='text-red-600'>*</span>
										</div>
										<select
											name='faculty'
											{...register('faculty')}
											className={`rounded-md border border-neutral-300 bg-white p-2 font-medium text-neutral-700 outline-none placeholder:text-neutral-400 ${
												errors.faculty ? 'border-red-300' : ''
											}`}>
											<option hidden value=''>
												Seleccione una opción
											</option>
											{facultyOptions.map(option => (
												<option key={option.id_faculty} value={option.id_faculty}>
													{option.name}
												</option>
											))}
										</select>
										{errors.faculty && <p className='text-red-400'>{errors.faculty.message}</p>}
									</div>
								</div>
							) : (
								<div className='flex items-center justify-center p-3 bg-orange-100 text-orange-600 mt-4'>
									<LuInfo size={18} className='mr-2' />
									<span>No has creado ninguna facultad :(</span>
								</div>
							)}

							<div className='grid grid-cols-2 gap-x-4 gap-y-3 pt-2 font-medium'>
								<div className='grid grid-cols-1 gap-x-4 gap-y-3 pt-2 font-medium'>
									<div className='flex flex-col gap-y-2'>
										<div>
											<label className={`text-neutral-600 ${errors.dedication ? 'text-red-600' : ''}`}>
												Dedicación
											</label>
											<span className='text-red-600'>*</span>
										</div>

										<select
											name='dedication'
											{...register('dedication')}
											className={`rounded-md border border-neutral-300 bg-white p-2 font-medium text-neutral-700 outline-none placeholder:text-neutral-400 ${
												errors.dedication ? 'border-red-300' : ''
											}`}>
											<option hidden value=''>
												Seleccione una opción
											</option>
											{dedicationOptions.map(option => (
												<option key={option.value} value={option.value}>
													{option.label}
												</option>
											))}
										</select>
										{errors.dedication && <p className='text-red-400'>{errors.dedication.message}</p>}
									</div>
								</div>

								<div className='grid grid-cols-1 gap-x-4 gap-y-3 pt-2 font-medium'>
									<div className='flex flex-col gap-y-2'>
										<div>
											<label className={`text-neutral-600 ${errors.employmentRelationship ? 'text-red-600' : ''}`}>
												Relación laboral
											</label>
											<span className='text-red-600'>*</span>
										</div>

										<select
											name='employmentRelationship'
											{...register('employmentRelationship')}
											className={`rounded-md border border-neutral-300 bg-white p-2 font-medium text-neutral-700 outline-none placeholder:text-neutral-400 ${
												errors.employmentRelationship ? 'border-red-300' : ''
											}`}>
											<option hidden value=''>
												Seleccione una opción
											</option>
											{employmentRelationshipOptions.map(option => (
												<option key={option.value} value={option.value}>
													{option.label}
												</option>
											))}
										</select>
										{errors.employmentRelationship && (
											<p className='text-red-400'>{errors.employmentRelationship.message}</p>
										)}
									</div>
								</div>
							</div>

							<div className='flex flex-col justify-between gap-4 py-4 text-xs font-semibold sm:flex-row'>
								<button
									type='button'
									onClick={onClose}
									className='mt-2 inline-flex w-full justify-center rounded-md border border-neutral-300 px-4 py-2 font-medium text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-600 focus:outline-none sm:mt-0'>
									{text.buttonCancel}
								</button>

								<button
									type='submit'
									disabled={loading}
									className={`mt-2 inline-flex w-full justify-center rounded-md border border-transparent bg-sky-800 px-4 py-2 font-medium text-neutral-50 hover:bg-sky-900 focus:outline-none sm:mt-0 ${
										loading ? 'cursor-not-allowed' : ''
									}`}>
									{loading ? <ButtonLoadingSpinner loadingText='Procesando...' /> : text.buttonSubmit}
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	)
}

export { ModalUsers }
