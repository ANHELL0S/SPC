/* eslint-disable react/prop-types */
import { toast } from 'sonner'
import { useState } from 'react'
import { Modal1 } from '../modal/Modal1'
import { ModalActionRD } from '../modal/ModalActionRD'
import { BiBookmarks } from 'react-icons/bi'
import { create, update, remove, reactive } from '../../services/api/parameter.api'

const ModalCreate = ({ onClose, onCreate }) => {
	const [loading, setLoading] = useState(false)

	const [formData, setFormData] = useState({
		name: '',
		description: '',
	})

	const spanishTranslations = {
		name: 'Nombre del parametro',
		description: 'Descripción del parametro',
	}

	const handleChange = e => {
		const { name, value } = e.target
		setFormData(prevState => ({
			...prevState,
			[name]: value,
		}))
	}

	const handleSubmit = async e => {
		e.preventDefault()
		setLoading(true)
		try {
			const response = await create(formData)
			onClose()
			onCreate()
			toast.success(`${response.message}`)
		} catch (error) {
			toast.error(`${error.message}`)
		} finally {
			setLoading(false)
		}
	}

	const modalProps = {
		initialValues: formData,
		translation: spanishTranslations,
		text: {
			title: 'Crear parametro',
			info_1: 'Ten en cuenta, cuando creas un parametro estará diponible de manera global en la creación de artículos.',
			submit: loading ? 'Procesando...' : 'Ok, Crear!',
			cancel: 'No, Cancelar',
		},
		colors: {
			bg: ['bg-sky-50', 'bg-[#00accf]', 'hover:bg-[#008ec6]'],
		},
		loading,
		icon: <BiBookmarks />,
		onClose: onClose,
		onSubmit: handleSubmit,
		onChange: handleChange,
	}

	return <Modal1 {...modalProps} />
}

const ModalUpdate = ({ parameter, onClose, onUpdate }) => {
	const [loading, setLoading] = useState(false)

	const [formData, setFormData] = useState({
		name: parameter.name || '',
		description: parameter.description || '',
	})

	const spanishTranslations = {
		name: 'Nombre del parametro',
		description: 'Descripción del parametro',
	}

	const handleChange = e => {
		const { name, value } = e.target
		setFormData(prevState => ({
			...prevState,
			[name]: value,
		}))
	}

	const handleSubmit = async e => {
		e.preventDefault()
		setLoading(true)
		try {
			const updatedFields = { ...formData }

			const response = await update(parameter.id_parameter, updatedFields)
			onClose()
			onUpdate()
			toast.success(`${response.message}`)
		} catch (error) {
			toast.error(`${error.message}`)
		} finally {
			setLoading(false)
		}
	}

	const modalProps = {
		initialValues: formData,
		translation: spanishTranslations,
		text: {
			title: 'Actualizar parametro',
			info_1:
				'Ten en cuenta, cuando editas un parametro aún estará diponible de manera global en la sección de creación de formatos.',
			submit: loading ? 'Procesando...' : 'Si, actualizar!',
			cancel: 'No, cancelar.',
		},
		colors: {
			bg: ['bg-sky-50', 'bg-[#00accf]', 'hover:bg-[#008ec6]'],
		},

		loading,
		icon: <BiBookmarks />,
		onClose: onClose,
		onSubmit: handleSubmit,
		onChange: handleChange,
	}

	return <Modal1 {...modalProps} />
}

const ModalReactive = ({ parameter, onClose, onActive }) => {
	const [loading, setLoading] = useState(false)

	const handleSubmit = async e => {
		e.preventDefault()
		setLoading(true)
		try {
			const response = await reactive(parameter.id_parameter)
			toast.success(`${response.message}`)
			onClose()
			onActive()
		} catch (error) {
			toast.error(`${error.message}`)
		} finally {
			setLoading(false)
		}
	}

	const modalProps = {
		text: {
			title: 'Habilitar parametro',
			description_a: `Estás a punto de habilitar el parametro`,
			description_b: `${parameter.name}`,
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

const ModalRemove = ({ parameter, onClose, onRemove }) => {
	const [loading, setLoading] = useState(false)

	const handleRemove = async e => {
		e.preventDefault()
		setLoading(true)
		try {
			const response = await remove(parameter.id_parameter)
			onRemove()
			onClose()
			toast.success(`${response.message}`)
		} catch (error) {
			toast.error(`${error.message}`)
		} finally {
			setLoading(false)
		}
	}

	const modalProps = {
		translation: '',
		text: {
			title: 'Deshabilitar parametro',
			description_a: `Estás a punto de deshabilitar el parametro`,
			description_b: `${parameter.name}`,
			description_c: '¿Está seguro?',
			buttonCancel: 'No, mantenlo',
			buttonSubmit: 'Ok, deshabilitar!',
		},
		colors: {
			bg: 'bg-[#fe5266]',
			hoverBg: 'hover:bg-[#fe3f56]',
			icon_bg_1: 'bg-[#fe5266]',
			icon_bg_2: 'bg-[#fedce0]',
		},
		loading,
		onClose: onClose,
		onSubmit: handleRemove,
	}

	return <ModalActionRD {...modalProps} />
}

export { ModalCreate, ModalUpdate, ModalRemove, ModalReactive }
