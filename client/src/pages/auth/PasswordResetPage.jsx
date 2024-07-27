import { useState } from 'react'
import { Toaster, toast } from 'sonner'
import { useNavigate, useParams } from 'react-router-dom'
import { resetPassword } from '../../services/api/auth.api'
import { BiKey } from 'react-icons/bi'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ButtonLoadingSpinner } from '../../components/ui/ButtomSpinner'

const schema = z.object({
	newPassword: z
		.string({ required_error: 'Contraseña es requerida.' })
		.min(6, 'Mínimo 6 caracteres')
		.max(20, 'Máximo 20 caracteres')
		.regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
			message: 'La contraseña debe contener al menos una letra mayúscula, un número y un carácter especial.',
		}),
	confirmPassword: z
		.string()
		.min(6, 'Mínimo 6 caracteres')
		.max(20, 'Máximo 20 caracteres')
		.regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
			message: 'La contraseña debe contener al menos una letra mayúscula, un número y un carácter especial.',
		}),
})
const PasswordResetPage = () => {
	const navigate = useNavigate()
	const { token } = useParams()
	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(schema),
		defaultValues: {
			newPassword: '',
			confirmPassword: '',
		},
	})
	const [loading, setLoading] = useState(false)

	// Extraer el id del token decodificado
	const decodedToken = JSON.parse(atob(token.split('.')[1]))
	const userId = decodedToken.id

	const onSubmit = async data => {
		setLoading(true)

		try {
			const response = await resetPassword(userId, token, data.newPassword, data.confirmPassword)
			toast.success(`${response.message}`)
			navigate('/login')
		} catch (error) {
			toast.error(`${error.message}`)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='password-reset-page h-screen flex items-center justify-center'>
			<div className='bg-white p-6 max-w-md w-full text-slate-600 border border-slate-200 rounded-xl'>
				<div className='flex items-center gap-3'>
					<div className='border border-slate-200 p-2 rounded-md'>
						<BiKey />
					</div>
					<h1 className='text-xl font-semibold'>Restablecer Contraseña</h1>
				</div>
				<form onSubmit={handleSubmit(onSubmit)} className='space-y-5 mt-5 text-sm'>
					<div className=''>
						<label
							htmlFor='newPassword'
							className={`block font-medium pb-2 ${errors.newPassword ? 'text-red-600' : 'text-slate-600'}`}>
							Nueva contraseña
						</label>
						<Controller
							name='newPassword'
							control={control}
							render={({ field }) => (
								<input
									{...field}
									id='newPassword'
									type='password'
									className={`w-full py-1.5 border border-slate-300 rounded-lg px-3 ${
										errors.newPassword ? 'border-red-500' : 'border-slate-300'
									}`}
									placeholder='Nueva contraseña'
								/>
							)}
						/>
						{errors.newPassword && <span className='text-red-400 text-xs'>{errors.newPassword.message}</span>}
					</div>

					<div className=''>
						<label
							htmlFor='confirmPassword'
							className={`block font-medium pb-2 ${errors.confirmPassword ? 'text-red-600' : 'text-slate-600'}`}>
							Confirmar contraseña
						</label>
						<Controller
							name='confirmPassword'
							control={control}
							render={({ field }) => (
								<input
									{...field}
									id='confirmPassword'
									type='password'
									className={`w-full py-1.5 border border-slate-300 rounded-lg px-3 ${
										errors.confirmPassword ? 'border-red-500' : 'border-slate-300'
									}`}
									placeholder='Confirmar contraseña'
								/>
							)}
						/>
						{errors.confirmPassword && <span className='text-red-400 text-xs'>{errors.confirmPassword.message}</span>}
					</div>

					<button
						type='submit'
						className='flex items-center justify-center gap-2 w-full bg-sky-700 text-white py-2 px-4 rounded-md hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50'
						disabled={loading}>
						{loading ? (
							<ButtonLoadingSpinner loadingText='Procesando...' textColor='text-white' />
						) : (
							<>
								<BiKey />
								<span>Cambiar contraseña</span>
							</>
						)}
					</button>
				</form>
			</div>

			<Toaster richColors expand={true} />
		</div>
	)
}

export default PasswordResetPage
