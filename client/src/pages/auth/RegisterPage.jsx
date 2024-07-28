import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Toaster, toast } from 'sonner'
import { BarLeft } from '../../components/BarLeft'
import { BarRight } from '../../components/BarRight'
import { BottomBar } from '../../components/BarDown'
import { useNavigate } from 'react-router-dom'
import { registerRequest } from '../../services/api/auth.api'
import { BiEnvelope, BiHide, BiKey, BiShow, BiUser } from 'react-icons/bi'
import { ButtonLoadingSpinner } from '../../components/ui/ButtomSpinner' // Asegúrate de importar el componente correcto

const RegisterPage = () => {
	const navigate = useNavigate()
	const [username, setUsername] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [showPassword, setShowPassword] = useState(false)
	const [loading, setLoading] = useState(false) // Estado de carga

	const handleSubmit = async e => {
		e.preventDefault()

		if (email.trim() === '' || password.trim() === '') {
			toast.error('Por favor, completa todos los campos.')
			return
		}

		setLoading(true) // Activar carga antes de la solicitud

		try {
			const response = await registerRequest({ username, email, password })
			toast.success('Cuenta creada exitosamente!')
			setTimeout(() => {
				navigate('/login')
			}, 1000)
			toast.success(`${response.message}`)
		} catch (error) {
			toast.error(`${error.message}`)
		} finally {
			setLoading(false) // Desactivar carga después de la solicitud (éxito o error)
		}
	}

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword)
	}

	return (
		<>
			<BarLeft />

			<BarRight />

			<BottomBar />

			<main className='bg-white flex justify-center items-center'>
				<div className='max-w-screen-xl m-0 sm:m-10 bg-white flex justify-center flex-1'>
					<div className='lg:w-1/3 xl:w-5/812 p-6 sm:p-4'>
						<div className='mt-14 flex flex-col items-center'>
							<h1 className='text-md xl:text-2xl text-2xl font-bold text-slate-500'>Crear cuenta</h1>

							<div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
								<div className='sm:px-10'>
									<form className='space-y-6' onSubmit={handleSubmit}>
										<div>
											<div className='mt-1 relative'>
												<span className='absolute inset-y-0 left-0 pl-4 flex items-center z-50'>
													<BiUser className='text-slate-400 text-md' />
												</span>

												<input
													type='text'
													name='username'
													value={username}
													onChange={e => setUsername(e.target.value)}
													className='appearance-none rounded-2xl relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-slate-400 placeholder:font-normal text-slate-400 font-bold focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
													placeholder='Nombre de usuario'
												/>
											</div>
										</div>

										<div>
											<div className='mt-1 relative'>
												<span className='absolute inset-y-0 left-0 pl-4 flex items-center z-50'>
													<BiEnvelope className='text-slate-400 text-md' />
												</span>

												<input
													type='email'
													name='email'
													value={email}
													onChange={e => setEmail(e.target.value)}
													className='appearance-none rounded-2xl relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-slate-400 placeholder:font-normal text-slate-400 font-bold focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
													placeholder='Correo electrónico'
												/>
											</div>
										</div>

										<div>
											<div className='mt-1 relative'>
												<span className='absolute inset-y-0 left-0 pl-4 flex items-center z-50'>
													<BiKey className='text-slate-400 text-md' />
												</span>

												<input
													type={showPassword ? 'text' : 'password'}
													name='password'
													value={password}
													onChange={e => setPassword(e.target.value)}
													minLength='6'
													className='appearance-none rounded-2xl relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-slate-400 placeholder:font-normal text-slate-400 font-bold focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
													placeholder='Contraseña'
												/>
												<span
													className='absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer'
													onClick={togglePasswordVisibility}>
													{showPassword ? (
														<BiHide className='text-slate-400 text-xl' onClick={togglePasswordVisibility} />
													) : (
														<BiShow className='text-slate-400 text-xl' onClick={togglePasswordVisibility} />
													)}
												</span>
											</div>
										</div>

										<div>
											<button
												type='submit'
												disabled={loading} // Deshabilitar botón cuando está cargando
												className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-md font-medium rounded-2xl text-white bg-sky-800 hover:bg-sky-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-900 ${
													loading ? 'cursor-not-allowed' : ''
												}`}>
												{loading ? <ButtonLoadingSpinner loadingText='Creando cuenta...' /> : 'Crear cuenta'}
											</button>
										</div>

										<div className='flex items-center justify-center'>
											<hr className='border-gray-300 flex-grow mx-3 text-slate-500' />
											<span className='text-slate-400'>o</span>
											<hr className='border-gray-300 flex-grow mx-3 text-slate-500' />
										</div>

										<div className='flex items-center justify-center'>
											<div className='text-sm'>
												<span className='text-slate-500 mr-2'>¿Ya tienes una cuenta?</span>
												<Link to='/login' className='text-slate-500 hover:text-slate-700 font-bold hover:underline'>
													<span>Ingresar</span>
												</Link>
											</div>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
				<Toaster richColors />
			</main>
		</>
	)
}

export { RegisterPage }
