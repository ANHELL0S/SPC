/* eslint-disable react/prop-types */
import { toast } from 'sonner'
import { useState } from 'react'
import { ModalUsers } from '../modal/ModalUsers'
import { ModalUsersUpdate } from '../modal/ModalUsersUpdate'
import { ModalActionRD } from '../modal/ModalActionRD'
import {
	createUsersRequest,
	updateUserWithRoleRequest,
	removeUsersRequest,
	reactiveUsersRequest,
} from '../../services/api/users.api'

const ModalCreate = ({ onClose, onCreate }) => {
	const [loading, setLoading] = useState(false)
	const [formData, setFormData] = useState({
		username: '',
		email: '',
		phone: '',
		identification_card: '',
		dedication: '',
		faculty: '',
		gender: '',
		filiation: '',
		employmentRelationship: '',
	})

	const handleChange = e => {
		const { name, value } = e.target
		setFormData(prevData => ({
			...prevData,
			[name]: value,
		}))
	}

	const handleSubmit = async data => {
		try {
			setLoading(true)
			const response = await createUsersRequest(data)
			toast.success(`${response.message}`)
			onCreate()
			onClose()
		} catch (error) {
			toast.error(`${error.message}`)
		} finally {
			setLoading(false)
		}
	}

	const modalProps = {
		text: {
			title: 'Crear empleado',
			description: 'Por favor, asegúrate de ingresar los datos correctos para la creación del nuevo empleado.',
			info: 'Para la genración de la contraseña se tomar el primer nombre seguido de @ y los ultimos 5 digitos de la cédula.',
			example: 'Modelo de contraseña nombre@12345',
			buttonCancel: 'No, cancelar',
			buttonSubmit: 'Ok, crear!',
		},
		loading,
		onClose,
		onSubmit: handleSubmit,
		onChange: handleChange,
		formData,
	}

	return <ModalUsers {...modalProps} />
}

const ModalUpdate = ({ user, onClose, onUpdate }) => {
	const [loading, setLoading] = useState(false)

	const [formData, setFormData] = useState({
		username: user.username || '',
		email: user.email || '',
		phone: user.phone || '',
		identification_card: user.identification_card || '',
		dedication: user.dedication || '',
		faculty: user.faculty.name || '',
		role: user.role.type_rol || '',
		gender: user.gender || '',
		filiation: user.filiation || '',
		employmentRelationship: user.employmentRelationship || '',
	})

	const handleChange = e => {
		const { name, value } = e.target
		setFormData(prevState => ({
			...prevState,
			[name]: value,
		}))
	}

	const handleSubmit = async data => {
		setLoading(true)
		try {
			const response = await updateUserWithRoleRequest(user.id_user, data)
			toast.success(`${response.message}`)
			onClose()
			onUpdate()
		} catch (error) {
			toast.error(`${error.message}`)
		} finally {
			setLoading(false)
		}
	}

	const modalProps = {
		text: {
			title: 'Actualizar usuario',
			description: 'Por favor, asegúrate de ingresar los datos correctos para la actualización del empleado.',
			info: 'Ten en cuenta que el email que registres se asigna como contraseña.',
			buttonCancel: 'No, cancelar',
			buttonSubmit: 'Ok, actualizar!',
		},
		loading,
		onClose,
		onSubmit: handleSubmit,
		onChange: handleChange,
		formData,
	}

	return <ModalUsersUpdate {...modalProps} />
}

const ModalRemove = ({ user, onClose, onDelete }) => {
	const [loading, setLoading] = useState(false)

	const handleSubmit = async e => {
		e.preventDefault()
		setLoading(true)
		try {
			const response = await removeUsersRequest(user.id_user)
			toast.success(`${response.message}`)
			onClose()
			onDelete()
		} catch (error) {
			toast.success(`${error.message}`)
		} finally {
			setLoading(false)
		}
	}

	const modalProps = {
		text: {
			title: 'Inhabilitar usuario',
			description_a: `Estás a punto de inhabilitar al usuario `,
			description_b: `${user.username}`,
			description_c: '¿Está seguro?',
			buttonCancel: 'No, mantenlo',
			buttonSubmit: 'Ok, inhabilitar!',
		},
		colors: {
			bg: 'bg-[#fe5266]',
			hoverBg: 'hover:bg-[#fe3f56]',
			icon_bg_1: 'bg-[#fe5266]',
			icon_bg_2: 'bg-[#fedce0]',
		},
		loading,
		onClose,
		onSubmit: handleSubmit,
	}

	return <ModalActionRD {...modalProps} />
}

const ModalReactive = ({ user, onClose, onActive }) => {
	const [loading, setLoading] = useState(false)

	const handleSubmit = async e => {
		e.preventDefault()
		setLoading(true)
		try {
			const response = await reactiveUsersRequest(user.id_user)
			toast.success(`${response.message}`)
			onClose()
			onActive()
		} catch (error) {
			toast.success(`${error.message}`)
		} finally {
			setLoading(false)
		}
	}

	const modalProps = {
		text: {
			title: 'Habilitar usuario',
			description_a: `Estás a punto de habilitar al usuario `,
			description_b: `${user.username}`,
			description_c: '¿Está seguro?',
			buttonCancel: 'No, mantenlo',
			buttonSubmit: 'Ok, habilitar!',
		},
		colors: {
			bg: 'bg-[#3db272]',
			hoverBg: 'hover:bg-[#28aa63]',
			icon_bg_1: 'bg-[#50b980]',
			icon_bg_2: 'bg-[#eafbf2]',
		},

		loading,
		onClose,
		onSubmit: handleSubmit,
	}

	return <ModalActionRD {...modalProps} />
}

export { ModalCreate, ModalUpdate, ModalRemove, ModalReactive }
