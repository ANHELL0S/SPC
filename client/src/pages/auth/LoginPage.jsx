import { useState } from 'react'
import { Toaster, toast } from 'sonner'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { BiEnvelope, BiHide, BiKey, BiShow } from 'react-icons/bi'
import { ButtonLoadingSpinner } from '../../components/ui/ButtomSpinner'
import { BarLeft } from '../../components/BarLeft'
import { BarRight } from '../../components/BarRight'
import { BottomBar } from '../../components/BarDown'

const LoginPage = () => {
	const navigate = useNavigate()
	const [loading, setLoading] = useState(false)
	const { signing } = useAuth()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [showPassword, setShowPassword] = useState(false)

	const handleSubmit = async e => {
		e.preventDefault()

		setLoading(true)

		try {
			const { userRole } = await signing(email, password)
			toast.success('Inicio de sesión exitoso!')
			if (userRole === 'admin') {
				navigate('/dashboard')
			} else {
				navigate('/artículos')
			}
		} catch (error) {
			//toast.error(`${error.message}`)
		} finally {
			setLoading(false)
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
							<h1 className='text-md xl:text-2xl text-2xl font-bold text-slate-500'>¡Hola de nuevo! 👋</h1>
							<div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
								<div className='sm:px-10'>
									<form className='space-y-6' onSubmit={handleSubmit}>
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
														<BiHide className='text-slate-400 text-xl' />
													) : (
														<BiShow className='text-slate-400 text-xl' />
													)}
												</span>
											</div>
										</div>

										<div>
											<button
												type='submit'
												disabled={loading}
												className={`disabled:opacity-50 group relative w-full flex justify-center py-3 px-4 border border-transparent text-md font-medium rounded-2xl text-white bg-sky-800 hover:bg-sky-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
                                                disabled:pointer-events-none ${loading ? 'cursor-not-allowed' : ''}`}>
												{loading ? <ButtonLoadingSpinner loadingText='Iniciando sesión...' /> : 'Iniciar sesión'}
											</button>
										</div>

										<div className='flex items-center text-sm justify-end'>
											<Link
												to='/request-password-reset'
												className='text-slate-500 hover:text-slate-600 font-medium hover:underline'>
												<span>¿Olvidaste tu contraseña?</span>
											</Link>
										</div>

										<div className='flex items-center justify-center'>
											<hr className='border-gray-300 flex-grow mx-3 text-slate-500' />
											<span className='text-slate-400'>o</span>
											<hr className='border-gray-300 flex-grow mx-3 text-slate-500' />
										</div>

										<div className='flex items-center justify-center'>
											<div className='text-sm'>
												<span className='text-slate-500 mr-2'>¿No tienes una cuenta?</span>
												<Link to='/register' className='text-slate-500 hover:text-slate-700 font-bold hover:underline'>
													<span>Registrar</span>
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

export { LoginPage }
