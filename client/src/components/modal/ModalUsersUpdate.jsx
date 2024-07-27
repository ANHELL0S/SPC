import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { LuInfo, LuUser, LuX } from 'react-icons/lu'
import { ButtonLoadingSpinner } from '../ui/ButtomSpinner'
import { UsersUpdateSchema } from '../../validators/createUsersValidator'
import { getAllFacultyRequest } from '../../services/api/faculty.api'
import {
	dedicationOptions,
	employmentRelationshipOptions,
	filiationOptions,
	genderOptions,
	roleOptions,
} from '../../constants/conts'

const ModalUsersUpdate = ({ text, onSubmit, onClose, loading, onChange, formData }) => {
	const [modalOpen, setModalOpen] = useState(false)
	const [submitting, setSubmitting] = useState(false)
	const [facultyOptions, setFacultyOptions] = useState([])

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		watch,
		setValue,
	} = useForm({
		resolver: zodResolver(UsersUpdateSchema),
		defaultValues: formData,
	})

	useEffect(() => {
		setModalOpen(true)
		fetchFacultyOptions()
	}, [])

	const fetchFacultyOptions = async () => {
		try {
			const response = await getAllFacultyRequest()
			setFacultyOptions(response)
		} catch (error) {
			console.error('Error fetching faculty options:', error)
		}
	}

	useEffect(() => {
		if (formData.faculty) {
			setValue('faculty', formData.faculty)
		}
	}, [formData.faculty, setValue])

	const onSubmitForm = async data => {
		console.log('Data to submit:', data)
		setSubmitting(true)
		await onSubmit(data)
		setSubmitting(false)
	}

	const handleModalClose = () => {
		setModalOpen(false)
		onClose()
	}

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
								<div className='rounded-lg border p-2'>
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
								<ol className='list-disc pl-4'>
									<li>
										<span>{text.info}</span>
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
										className={`rounded-lg border border-neutral-300 p-2 font-medium text-neutral-700 outline-none placeholder:text-neutral-400 ${
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
										className={`rounded-lg border border-neutral-300 p-2 font-medium text-neutral-700 outline-none placeholder:text-neutral-400 ${
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
										className={`rounded-lg border border-neutral-300 p-2 font-medium text-neutral-700 outline-none placeholder:text-neutral-400 ${
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
										className={`rounded-lg border border-neutral-300 p-2 font-medium text-neutral-700 outline-none placeholder:text-neutral-400 ${
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
										{genderOptions.map(option => (
											<option key={option.value} value={option.value} selected={formData.gender === option.value}>
												{option.label}
											</option>
										))}
									</select>
									{errors.gender && <p className='text-red-400'>{errors.gender.message}</p>}
								</div>

								<div className='flex flex-col gap-y-2'>
									<div>
										<label className={`text-neutral-600 ${errors.gender ? 'text-red-600' : ''}`}>Filiación</label>
										<span className='text-red-600'>*</span>
									</div>

									<select
										name='filiation'
										{...register('filiation')}
										className={`rounded-md border border-neutral-300 bg-white p-2 font-medium text-neutral-700 outline-none placeholder:text-neutral-400 ${
											errors.filiation ? 'border-red-300' : ''
										}`}>
										{filiationOptions.map(option => (
											<option key={option.value} value={option.value} selected={formData.filiation === option.value}>
												{option.label}
											</option>
										))}
									</select>
									{errors.filiation && <p className='text-red-400'>{errors.filiation.message}</p>}
								</div>
							</div>

							<div className='grid grid-cols-1 gap-x-4 gap-y-3 pt-2 font-medium'>
								<div className='flex flex-col gap-y-2'>
									<div>
										<label className={`text-neutral-600 ${errors.faculty ? 'text-red-600' : ''}`}>Facultad</label>
										<span className='text-red-600'>*</span>
									</div>
									<select
										{...register('faculty')}
										className={`rounded-lg border border-neutral-300 bg-neutral-50 p-2 font-medium text-neutral-700 outline-none placeholder:text-neutral-400 ${
											errors.faculty ? 'border-red-300' : 'border-neutral-300'
										}`}>
										<option value=''>Selecciona la facultad</option>
										{facultyOptions.map(option => (
											<option
												key={option.id}
												value={option.id_faculty}
												selected={formData.faculty === option.id_faculty}>
												{option.name}
											</option>
										))}
									</select>

									{errors.faculty && <p className='text-red-400'>{errors.faculty.message}</p>}
								</div>
							</div>

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
											{dedicationOptions.map(option => (
												<option key={option.value} value={option.value} selected={formData.dedication === option.value}>
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
											{employmentRelationshipOptions.map(option => (
												<option
													key={option.value}
													value={option.value}
													selected={formData.employmentRelationship === option.value}>
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

							<div className='grid grid-cols-1 gap-x-4 gap-y-3 pt-2 font-medium'>
								<div className='flex flex-col gap-y-2'>
									<div>
										<label className={`text-neutral-600 ${errors.rol ? 'text-red-600' : ''}`}>Rol</label>
										<span className='text-red-600'>*</span>
									</div>
									<select
										name='role'
										{...register('role')}
										className={`rounded-lg border border-neutral-300 bg-neutral-50 p-2 font-medium text-neutral-700 outline-none placeholder:text-neutral-400 ${
											errors.rol ? 'border-red-300' : ''
										}`}>
										{roleOptions.map((role, index) => (
											<option key={index} value={role}>
												{role}
											</option>
										))}
									</select>
									{errors.rol && <p className='text-red-400'>{errors.rol.message}</p>}
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

export { ModalUsersUpdate }
