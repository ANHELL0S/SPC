import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Toaster, toast } from 'sonner'
import { requestPasswordReset } from '../../services/api/auth.api'
import { ButtonLoadingSpinner } from '../../components/ui/ButtomSpinner'
import { BiCheckShield, BiEnvelopeOpen, BiLogoGmail } from 'react-icons/bi'

const PasswordResetRequestPage = () => {
	const [email, setEmail] = useState('')
	const [loading, setLoading] = useState(false)
	const [requestSent, setRequestSent] = useState(false)

	const handleSubmit = async e => {
		e.preventDefault()
		setLoading(true)

		try {
			const response = await requestPasswordReset(email)
			toast.success(`${response.message}`)
			setRequestSent(true)
		} catch (error) {
			toast.error(`${error.message}`)
		} finally {
			setLoading(false)
		}
	}

	if (requestSent) {
		return (
			<div className='min-h-screen flex items-center justify-center bg-slate-50'>
				<div className='max-w-md mx-auto bg-white p-6 rounded-lg border border-slate-200 flex flex-col gap-y-6'>
					<div className='flex items-center space-x-3 text-green-500'>
						<div className='flex items-center justify-center p-2 bg-green-100 rounded-full'>
							<BiCheckShield size={22} />
						</div>
						<h2 className='text-xl font-semibold'>Solicitud enviada</h2>
					</div>

					<p className='text-gray-600'>
						Por favor, <strong>revisa tu correo electrónico</strong>. Te hemos enviado instrucciones para restablecer tu
						contraseña.
					</p>

					<a
						href='https://mail.google.com/mail/u/0/?pli=1#inbox'
						className='px-4 py-2 text-slate-500 hover:text-slate-600 font-medium hover:bg-slate-100 rounded-lg flex items-center gap-2 justify-center border'>
						<BiLogoGmail className='text-red-500' size={18} />
						<span>Ir a Gmail</span>
					</a>
				</div>
			</div>
		)
	}

	return (
		<>
			<div className='min-h-screen flex items-center justify-center bg-slate-50'>
				<div className='max-w-md mx-auto bg-white p-5 rounded-lg border border-slate-200'>
					<h2 className='text-xl font-semibold mb-4 text-slate-500'>Solicitar restablecimiento de contraseña</h2>
					<form onSubmit={handleSubmit}>
						<label className='block mb-4'>
							<p className='font-medium text-slate-600 text-sm pb-2'>Correo electrónico</p>
							<input
								type='email'
								value={email}
								onChange={e => setEmail(e.target.value)}
								className='w-full py-2 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow text-slate-600'
								placeholder='Dirección de tu email actual'
							/>
						</label>

						<button
							type='submit'
							className='flex items-center justify-center gap-2 w-full bg-sky-700 text-white py-2 px-4 rounded-md hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50'
							disabled={loading}>
							{loading ? (
								<ButtonLoadingSpinner loadingText='Solicitando...' textColor='text-white' />
							) : (
								<>
									<BiEnvelopeOpen />
									<span>Enviar correo</span>
								</>
							)}
						</button>
					</form>

					<div className='flex flex-col gap-y-4'>
						<div className='flex items-center justify-center mt-4'>
							<hr className='border-gray-300 flex-grow mx-3 text-slate-500' />
							<span className='text-slate-400'>o</span>
							<hr className='border-gray-300 flex-grow mx-3 text-slate-500' />
						</div>

						<div className='flex items-center justify-center'>
							<div className='text-sm'>
								<span className='text-slate-500 mr-2'>¿Ya tienes una cuenta?</span>
								<Link to='/login' className='text-slate-500 hover:text-slate-700 font-bold hover:underline'>
									<span>Iniciar sesión</span>
								</Link>
							</div>
						</div>
					</div>
				</div>

				<Toaster richColors expand={true} />
			</div>
		</>
	)
}

export default PasswordResetRequestPage
