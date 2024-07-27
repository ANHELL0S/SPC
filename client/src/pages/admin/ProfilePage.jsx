import { Toaster, toast } from 'sonner'
import { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import { useParams } from 'react-router-dom'
import { BiEditAlt, BiCheck, BiX, BiShow, BiHide } from 'react-icons/bi'
import {
	getByIdUsersRequest,
	updateUsernameRequest,
	updateEmailRequest,
	updatePasswordRequest,
} from '../../services/api/users.api'

const ProfilePage = () => {
	const { id } = useParams()
	const [userData, setUserData] = useState({})
	const [isEditing, setIsEditing] = useState(false)
	const [editField, setEditField] = useState('')
	const [passwordData, setPasswordData] = useState({
		currentPassword: '',
		newPassword: '',
		confirmPassword: '',
	})
	const [showCurrentPassword, setShowCurrentPassword] = useState(false)
	const [showNewPassword, setShowNewPassword] = useState(false)
	const [showConfirmPassword, setShowConfirmPassword] = useState(false)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const user = await getByIdUsersRequest(id)
				setUserData(user)
			} catch (error) {
				console.error('Error fetching user:', error)
			}
		}

		fetchData()
	}, [id])

	const handleEditClick = field => {
		setIsEditing(true)
		setEditField(field)
	}

	const handleCheckClick = async () => {
		try {
			switch (editField) {
				case 'username':
					if (userData.username) {
						await updateUsernameRequest(id, { username: userData.username })
						toast.success('Nombre de usuario actualizado correctamente.')
					} else {
						toast.error('El nombre de usuario no puede estar vacío.')
					}
					break
				case 'email':
					if (userData.email) {
						await updateEmailRequest(id, { email: userData.email })
						toast.success('Correo electrónico actualizado correctamente.')
					} else {
						toast.error('El correo electrónico no puede estar vacío.')
					}
					break
				case 'password':
					if (passwordData.currentPassword && passwordData.newPassword && passwordData.confirmPassword) {
						if (passwordData.newPassword !== passwordData.confirmPassword) {
							toast.error('La nueva contraseña y la confirmación no coinciden.')
							return
						}

						await updatePasswordRequest(id, {
							currentPassword: passwordData.currentPassword,
							newPassword: passwordData.newPassword,
							confirmPassword: passwordData.confirmPassword,
						})
						toast.success('Contraseña actualizada correctamente.')
					} else {
						toast.error('Por favor completa todos los campos de contraseña.')
					}
					break
				default:
					break
			}
		} catch (error) {
			console.error(`Error updating ${editField}:`, error)
			toast.error(`Error al actualizar el ${editField}.`)
		}
		setIsEditing(false)
	}

	const handleCancelClick = () => {
		setPasswordData({
			currentPassword: '',
			newPassword: '',
			confirmPassword: '',
		})
		toast.warning(`Se concelo el cambio de datos de la cuenta`)
		setIsEditing(false)
	}

	const handleChange = e => {
		const { name, value } = e.target
		setUserData({ ...userData, [name]: value })
	}

	return (
		<>
			<Navbar />
			<div className='h-screen lg:end-0 lg:start-0 lg:top-0 lg:h-20'>
				<main className='container mx-auto px-4 lg:px-8 xl:max-w-7xl'>
					<div className='lg:pt-20 sm:pt-10'>
						<div className='flex flex-col bg-white active:border-neutral-300 lg:col-span-3'>
							<div className='flex items-center justify-between gap-2 text-md bg-white border border-neutral-300 text-neutral-500 pl-6 py-1.5 my-2'>
								<div className='flex flex-row items-center gap-2 font-semibold'>
									<span>Datos personales</span>
								</div>
							</div>
						</div>

						<div className='bg-white border border-neutral-300 p-6'>
							<div>
								<form>
									<div className='grid grid-cols-1 md:grid-cols-1 gap-6'>
										<div className='md:col-span-2'>
											<div className='mb-4'>
												<label className='block text-neutral-500 text-sm font-medium mb-2'>Nombre de usuario</label>
												<div className='relative'>
													<input
														className='text-neutral-500 text-sm font-medium appearance-none border border-neutral-300 w-full py-2 px-3 focus:outline-none focus:border-neutral-400 pr-10'
														readOnly={!isEditing || editField !== 'username'}
														value={userData.username || ''}
														onChange={handleChange}
														name='username'
													/>
													{!isEditing || editField !== 'username' ? (
														<button
															type='button'
															onClick={() => handleEditClick('username')}
															className='absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-500 hover:text-neutral-700'>
															<BiEditAlt />
														</button>
													) : (
														<button
															type='button'
															onClick={handleCheckClick}
															className='absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-500 hover:text-neutral-700'>
															<BiCheck />
														</button>
													)}
												</div>
											</div>

											<div className='mb-4'>
												<label className='block text-neutral-500 text-sm font-medium mb-2'>Correo electrónico</label>
												<div className='relative'>
													<input
														className='text-neutral-500 text-sm font-medium appearance-none border border-neutral-300 w-full py-2 px-3 focus:outline-none focus:border-neutral-400 pr-10'
														readOnly={!isEditing || editField !== 'email'}
														value={userData.email || ''}
														onChange={handleChange}
														name='email'
													/>
													{!isEditing || editField !== 'email' ? (
														<button
															type='button'
															onClick={() => handleEditClick('email')}
															className='absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-500 hover:text-neutral-700'>
															<BiEditAlt />
														</button>
													) : (
														<button
															type='button'
															onClick={handleCheckClick}
															className='absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-500 hover:text-neutral-700'>
															<BiCheck />
														</button>
													)}
												</div>
											</div>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>

					<div className='flex flex-col bg-white active:border-neutral-300 lg:col-span-3'>
						<div className='flex items-center justify-between gap-2 text-md bg-white border border-neutral-300 text-neutral-500 pl-6 my-2'>
							<div className='flex flex-row items-center gap-2 font-semibold'>
								<span>Contraseña</span>
							</div>

							{isEditing ? (
								<div>
									<button
										type='button'
										onClick={handleCancelClick}
										className='py-2 bg-[#cd664d] hover:bg-[#ac4a33] px-2 text-neutral-50 transition-colors duration-200'>
										<BiX />
									</button>

									<button
										type='button'
										onClick={handleCheckClick}
										className='py-2 bg-neutral-600 hover:bg-neutral-700 px-2 text-neutral-50 transition-colors duration-200'>
										<BiCheck />
									</button>
								</div>
							) : (
								<div className='flex '>
									<button
										type='button'
										onClick={() => handleEditClick('password')}
										className='py-2 bg-neutral-600 px-2 text-neutral-50'>
										<BiEditAlt />
									</button>
								</div>
							)}
						</div>
					</div>

					{isEditing && editField === 'password' && (
						<div className='bg-white border border-neutral-300 p-6'>
							<div>
								<form>
									<div className='grid grid-cols-1 md:grid-cols-1 gap-6'>
										<div className='md:col-span-2 sm:flex-col md:flex-row flex flex-row gap-8 justify-between'>
											<div className='mb-4 w-full'>
												<label className='block text-neutral-500 text-sm font-medium mb-2'>Contraseña Actual</label>
												<div className='relative'>
													<input
														type={showCurrentPassword ? 'text' : 'password'}
														className='text-neutral-500 text-sm font-medium appearance-none border border-neutral-300 w-full py-2 px-3 focus:outline-none focus:border-neutral-400 pr-10'
														value={passwordData.currentPassword}
														onChange={e => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
														name='currentPassword'
													/>
													<button
														type='button'
														onClick={() => setShowCurrentPassword(!showCurrentPassword)}
														className='absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-500 hover:text-neutral-700'>
														{showCurrentPassword ? <BiHide /> : <BiShow />}
													</button>
												</div>
											</div>

											<div className='mb-4 w-full'>
												<label className='block text-neutral-500 text-sm font-medium mb-2'>Nueva Contraseña</label>
												<div className='relative'>
													<input
														type={showNewPassword ? 'text' : 'password'}
														className='text-neutral-500 text-sm font-medium appearance-none border border-neutral-300 w-full py-2 px-3 focus:outline-none focus:border-neutral-400 pr-10'
														value={passwordData.newPassword}
														onChange={e => setPasswordData({ ...passwordData, newPassword: e.target.value })}
														name='newPassword'
													/>
													<button
														type='button'
														onClick={() => setShowNewPassword(!showNewPassword)}
														className='absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-500 hover:text-neutral-700'>
														{showCurrentPassword ? <BiHide /> : <BiShow />}
													</button>
												</div>
											</div>

											<div className='mb-4 w-full'>
												<label className='block text-neutral-500 text-sm font-medium mb-2'>Confirmar Contraseña</label>
												<div className='relative'>
													<input
														type={showConfirmPassword ? 'text' : 'password'}
														className='text-neutral-500 text-sm font-medium appearance-none border border-neutral-300 w-full py-2 px-3 focus:outline-none focus:border-neutral-400 pr-10'
														value={passwordData.confirmPassword}
														onChange={e => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
														name='confirmPassword'
													/>
													<button
														type='button'
														onClick={() => setShowConfirmPassword(!showConfirmPassword)}
														className='absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-500 hover:text-neutral-700'>
														{showCurrentPassword ? <BiHide /> : <BiShow />}
													</button>
												</div>
											</div>
										</div>
									</div>
								</form>
							</div>
						</div>
					)}

					<Toaster richColors expand={true} />
				</main>
			</div>
		</>
	)
}

export { ProfilePage }
