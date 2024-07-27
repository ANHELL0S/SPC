import { z } from 'zod'

const UsersCreateSchema = z.object({
	username: z
		.string({
			required_error: 'Nombre de usuario es requerido.',
		})
		.min(6, 'Mínimo 6 caracteres')
		.max(50, 'Máximo 50 caracteres'),
	email: z
		.string({
			required_error: 'Email es requerido.',
		})
		.email('Correo electrónico no válido'),
	phone: z
		.string({
			required_error: 'Número de celular es requerido.',
		})
		.min(10, 'Mínimo 10 caracteres')
		.max(10, 'Máximo 10 caracteres'),
	identification_card: z
		.string({
			required_error: 'Cédula es requerida.',
		})
		.min(10, 'Mínimo 10 caracteres')
		.max(10, 'Máximo 10 caracteres'),
	dedication: z
		.string({
			required_error: 'Dedicación es requerida.',
		})
		.min(5, 'Selecciona una dedicación')
		.max(100, 'Selecciona una dedicación'),
	employmentRelationship: z
		.string({
			required_error: 'Relación laboral es requerida.',
		})
		.min(5, 'Selecciona una relación laboral')
		.max(100, 'Selecciona una relación laboral'),
	gender: z
		.string({
			required_error: 'El genero es requerido.',
		})
		.min(4, 'Selecciona un genero')
		.max(500, 'Selecciona un genero'),
	filiation: z
		.string({
			required_error: 'La filiación es requerido.',
		})
		.min(1, 'Selecciona una filiación')
		.max(5, 'Selecciona una filiación'),
	faculty: z
		.string({
			required_error: 'La facultad es requerido.',
		})
		.min(4, 'Selecciona una facultad')
		.max(500, 'Selecciona una facultad'),
})

const UsersUpdateSchema = z.object({
	username: z
		.string({
			required_error: 'Nombre de usuario es requerido.',
		})
		.min(6, 'Mínimo 6 caracteres')
		.max(50, 'Máximo 50 caracteres'),
	email: z
		.string({
			required_error: 'Email es requerido.',
		})
		.email('Correo electrónico no válido'),
	phone: z
		.string({
			required_error: 'Número de celular es requerido.',
		})
		.min(10, 'Mínimo 10 caracteres')
		.max(10, 'Máximo 10 caracteres'),
	identification_card: z
		.string({
			required_error: 'Cédula es requerida.',
		})
		.min(10, 'Mínimo 10 caracteres'),
	dedication: z
		.string({
			required_error: 'Dedicación es requerida.',
		})
		.min(5, 'Selecciona una dedicación')
		.max(100, 'Selecciona una dedicación'),
	employmentRelationship: z
		.string({
			required_error: 'Relación laboral es requerida.',
		})
		.min(5, 'Selecciona una relación laboral')
		.max(100, 'Selecciona una relación laboral'),
	gender: z
		.string({
			required_error: 'El genero es requerido.',
		})
		.min(4, 'Selecciona un genero')
		.max(500, 'Selecciona un genero'),
	filiation: z
		.string({
			required_error: 'La filiación es requerido.',
		})
		.min(1, 'Selecciona una filiación')
		.max(500, 'Selecciona una filiación'),
	faculty: z
		.string({
			required_error: 'La facultad es requerido.',
		})
		.min(1, 'Selecciona una facultad')
		.max(500, 'Selecciona una facultad'),
	role: z
		.string({
			required_error: 'El rol es requerido.',
		})
		.min(4, 'Selecciona un rol')
		.max(100, 'Selecciona un rol'),
})

export { UsersCreateSchema, UsersUpdateSchema }
