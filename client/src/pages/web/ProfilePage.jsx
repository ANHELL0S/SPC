import { Toaster, toast } from 'sonner'
import AuthContext from '../../context/AuthContext'
import { BarLeft } from '../../components/BarLeft'
import { BarRight } from '../../components/BarRight'
import { BottomBar } from '../../components/BarDown'
import { Spinner } from '../../components/ui/spinner'
import { BiEditAlt, BiKey, BiX } from 'react-icons/bi'
import { useState, useEffect, useContext } from 'react'
import { ButtonLoadingSpinner } from '../../components/ui/ButtomSpinner'
import { getByIdUsersRequest, updateUsersRequest, updatePasswordRequest } from '../../services/api/users.api'

const ProfilePage = () => {
	const currentDate = new Date()
	let greeting = ''

	if (currentDate.getHours() < 12) {
		greeting = 'Buenos días'
	} else if (currentDate.getHours() >= 12 && currentDate.getHours() < 18) {
		greeting = 'Buenas tardes'
	} else {
		greeting = 'Buenas noches'
	}

	const { user, userRole } = useContext(AuthContext)
	const id = user.id_user

	const [userData, setUserData] = useState(null)
	const [formData, setFormData] = useState({ username: '', email: '' })
	const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' })
	const [loading, setLoading] = useState(false)
	const [modalIsOpen, setModalIsOpen] = useState(false)
	const [passwordModalIsOpen, setPasswordModalIsOpen] = useState(false)
	const [showPassword, setShowPassword] = useState(false)

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const getUser = await getByIdUsersRequest(id)
				setUserData(getUser)
				setFormData({ username: getUser.username, email: getUser.email })
			} catch (error) {
				console.error('Error al obtener los datos del usuario:', error.message)
			}
		}

		fetchUserData()
	}, [id])

	const toggleShowPassword = () => {
		setShowPassword(!showPassword)
	}

	const openModal = () => {
		setModalIsOpen(true)
	}

	const closeModal = () => {
		setModalIsOpen(false)
	}

	const openPasswordModal = () => {
		setPasswordModalIsOpen(true)
	}

	const closePasswordModal = () => {
		setPasswordModalIsOpen(false)
	}

	const handleChange = e => {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value })
	}

	const handlePasswordChange = e => {
		const { name, value } = e.target
		setPasswordData({ ...passwordData, [name]: value })
	}

	const handleUpdate = async e => {
		e.preventDefault()
		setLoading(true)
		try {
			const response = await updateUsersRequest(id, formData)
			toast.success(`${response.message}`)
			closeModal()
			const getUser = await getByIdUsersRequest(id)
			setUserData(getUser)
		} catch (error) {
			toast.error(`${error.message}`)
		} finally {
			setLoading(false)
		}
	}
	const handlePasswordUpdate = async e => {
		e.preventDefault()
		setLoading(true)
		try {
			const { currentPassword, newPassword, confirmPassword } = passwordData
			const response = await updatePasswordRequest(id, { currentPassword, newPassword, confirmPassword })
			toast.success(`${response.message}`)
			closePasswordModal()
			setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
		} catch (error) {
			toast.error(`${error.message}`)
		} finally {
			setLoading(false)
		}
	}

	return (
		<>
			<BarLeft />
			<BarRight />
			<BottomBar />

			{!userData ? (
				<Spinner />
			) : (
				<>
					<div className='bg-white w-full flex flex-col items-center justify-center max-w-5xl mx-auto mt-4 px-4 sm:px-0'>
						<div className='flex flex-col w-full'>
							<div className='flex gap-x-6 flex-row'>
								<h2 className='text-lg font-semibold text-slate-700'>
									{greeting}, {userData ? userData.username : 'Usuario'} 👋
								</h2>
							</div>

							<hr className='my-6' />

							<div className='flex gap-x-6 flex-row'>
								<h2 className='text-lg font-semibold text-slate-500'>Datos de la cuenta</h2>
								{userRole !== 'docente' && (
									<button
										onClick={openModal}
										className='flex items-center gap-2 ml-auto text-slate-500 hover:text-slate-600 py-2 px-4 rounded-md hover:bg-slate-100 border transition-colors duration-150'>
										<BiEditAlt />
										Editar
									</button>
								)}
							</div>

							<div className='w-full flex flex-col space-y-4'>
								<div className='bg-white overflow-hidden w-full'>
									<div className='text-slate-500'>
										<div className='py-3 sm:py-5 sm:grid sm:grid-cols-5 sm:gap-4 flex flex-row items-center justify-between px-4 sm:px-6'>
											<span className='text-sm font-medium'>Nombre de usuario</span>
											<span className='mt-1 text-sm sm:mt-0 sm:col-span-2 text-slate-600'>{userData.username}</span>
										</div>

										<div className='py-3 sm:py-5 sm:grid sm:grid-cols-5 sm:gap-4 flex flex-row items-center justify-between px-4 sm:px-6'>
											<span className='text-sm font-medium'>Correo electrónico</span>
											<span className='mt-1 text-sm sm:mt-0 sm:col-span-2 text-slate-600'>{userData.email}</span>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className='mt-4 ml-4'>
							<button
								onClick={openPasswordModal}
								className='flex items-center gap-2 ml-auto text-slate-500 hover:text-slate-600 py-2 px-4 rounded-md hover:bg-slate-100 border transition-colors duration-150'>
								<BiKey />
								Cambiar contraseña
							</button>
						</div>
					</div>

					{modalIsOpen && (
						<>
							<div className='fixed z-50 inset-0 bg-neutral-50 py-4 overflow-y-scroll'>
								<div className='flex items-end justify-center px-4 text-center sm:block sm:p-0'>
									<div className='sm:inline-block align-bottom bg-white text-left transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full border border-slate-300 rounded-lg text-slate-600'>
										<div className='flex justify-between items-center px-4 pt-4'>
											<div className='border rounded-lg p-2'>
												<BiEditAlt />
											</div>

											<div
												onClick={closeModal}
												className='hover:bg-slate-100 hover:text-slate-800 text-slate-500 p-2 text-xl rounded-full cursor-pointer transition-colors duration-150'>
												<BiX />
											</div>
										</div>

										<div className='px-4 py-4 text-slate-600 text-md font-semibold flex flex-col gap-y-1'>
											<span>Editar mis datos</span>
										</div>

										<form onSubmit={handleUpdate} className='w-full flex flex-col space-y-4'>
											<div className='flex flex-col gap-y-2 text-xs text-slate-600 px-4'>
												<div className='grid grid-cols-1 gap-x-4 gap-y-3 pt-2'>
													<div className='flex flex-col gap-y-2'>
														<label className='text-slate-600'>Nombre de usuario</label>
														<input
															type='text'
															name='username'
															value={formData.username}
															onChange={handleChange}
															className='border rounded-lg p-2 text-slate-500'
															placeholder='Descripción de la etiqueta'
														/>
													</div>
												</div>

												<div className='grid grid-cols-1 gap-x-4 gap-y-3 pt-2'>
													<div className='flex flex-col gap-y-2'>
														<label className='text-slate-600'>Correo electrónico</label>
														<input
															type='email'
															name='email'
															value={formData.email}
															onChange={handleChange}
															className='border rounded-lg p-2 text-slate-500'
															placeholder='Descripción de la etiqueta'
														/>
													</div>
												</div>

												<div className='flex justify-between py-4 font-semibold gap-4 flex-col sm:flex-row'>
													<button
														onClick={closeModal}
														className='flex-1 px-4 py-3 border border-slate-300 text-slate-600 rounded-lg hover:bg-slate-100 transition-colors duration-150'>
														Cancelar
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
					)}

					{passwordModalIsOpen && (
						<>
							<div className='fixed z-50 inset-0 bg-neutral-50 py-4 overflow-y-scroll'>
								<div className='flex items-end justify-center px-4 text-center sm:block sm:p-0'>
									<div className='sm:inline-block align-bottom bg-white text-left transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full border border-slate-300 rounded-lg text-slate-600'>
										<div className='flex justify-between items-center px-4 pt-4'>
											<div className='border rounded-lg p-2'>
												<BiKey />
											</div>

											<div
												onClick={closePasswordModal}
												className='hover:bg-slate-100 hover:text-slate-800 text-slate-500 p-2 text-xl rounded-full cursor-pointer transition-colors duration-150'>
												<BiX />
											</div>
										</div>

										<div className='px-4 py-4 text-slate-600 text-md font-semibold flex flex-col gap-y-1'>
											<span>Cambiar contraseña</span>
											<div className='text-md flex flex-col gap-y-1 py-4 font-semibold text-neutral-600'>
												<div className='flex flex-col gap-y-2 rounded-md border border-sky-200 bg-sky-50 p-4 text-xs font-normal text-sky-700'>
													<ol className='flex list-disc flex-col gap-y-2 pl-2'>
														<li>
															<span>
																La contraseña debe tener al menos <strong>8 caracteres</strong>.
															</span>
														</li>

														<li>
															<span>
																La contraseña debe contener al menos{' '}
																<strong>una letra mayúscula, un número y un carácter especial</strong>.
															</span>
														</li>
													</ol>
												</div>
											</div>
										</div>

										<form onSubmit={handlePasswordUpdate} className='w-full flex flex-col space-y-4'>
											<div className='flex flex-col gap-y-2 text-xs text-slate-600 px-4'>
												<div className='grid grid-cols-1 gap-x-4 gap-y-3 pt-2'>
													<div className='flex flex-col gap-y-2'>
														<label className='text-slate-600'>Contraseña actual</label>
														<input
															type={showPassword ? 'text' : 'password'}
															name='currentPassword'
															value={passwordData.currentPassword}
															onChange={handlePasswordChange}
															className='border rounded-lg p-2 text-slate-500'
															placeholder='Contraseña Actual'
														/>
													</div>
												</div>

												<div className='grid grid-cols-1 gap-x-4 gap-y-3 pt-2'>
													<div className='flex flex-col gap-y-2'>
														<label className='text-slate-600'>Nueva contraseña</label>
														<input
															type={showPassword ? 'text' : 'password'}
															name='newPassword'
															value={passwordData.newPassword}
															onChange={handlePasswordChange}
															className='border rounded-lg p-2 text-slate-500'
															placeholder='Nueva Contraseña'
														/>
													</div>
												</div>

												<div className='grid grid-cols-1 gap-x-4 gap-y-3 pt-2'>
													<div className='flex flex-col gap-y-2'>
														<label className='text-slate-600'>Confirmar contraseña</label>
														<input
															type={showPassword ? 'text' : 'password'}
															name='confirmPassword'
															value={passwordData.confirmPassword}
															onChange={handlePasswordChange}
															className='border rounded-lg p-2 text-slate-500'
															placeholder='Confirmar Contraseña'
														/>
													</div>
												</div>

												<div
													onClick={toggleShowPassword}
													className='cursor-pointer hover:bg-slate-700 hover:text-slate-50 border p-2 items-center justify-center flex rounded-lg mt-4 transition-colors duration-150'>
													<span>{showPassword ? 'Ocultar contraseñas' : 'Mostrar contraseñas'}</span>
												</div>

												<div className='flex justify-between py-4 font-semibold gap-4 flex-col sm:flex-row'>
													<button
														onClick={closePasswordModal}
														className='flex-1 px-4 py-3 border border-slate-300 text-slate-600 rounded-lg hover:bg-slate-100 transition-colors duration-150'>
														Cancelar
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
					)}
				</>
			)}

			<Toaster richColors expand={true} />
		</>
	)
}

export { ProfilePage }
