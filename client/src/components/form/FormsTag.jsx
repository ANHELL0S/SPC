/* eslint-disable react/prop-types */
import { toast } from 'sonner'
import { useState } from 'react'
import { Modal1 } from '../modal/Modal1'
import { ModalActionRD } from '../modal/ModalActionRD'

import { create, update, remove, reactive } from '../../services/api/tags.api'
import { BiBookmarks } from 'react-icons/bi'

const ModalCreate = ({ onClose, onCreate }) => {
	const [loading, setLoading] = useState(false)

	const [formData, setFormData] = useState({
		name: '',
		description: '',
	})

	const spanishTranslations = {
		name: 'Nombre de la etiqueta',
		description: 'Descripción de la etiqueta',
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
			title: 'Crear etiqueta',
			info_1: 'Ten en cuenta, cuando crees una etiqueta estará diponible en la sección de creación de formatos.',
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

const ModalUpdate = ({ tag, onClose, onUpdate }) => {
	const [loading, setLoading] = useState(false)

	const [formData, setFormData] = useState({
		name: tag.name || '',
		description: tag.description || '',
	})

	const spanishTranslations = {
		name: 'Nombre de la etiqueta',
		description: 'Descripción de la etiqueta',
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

			const response = await update(tag.id_tag, updatedFields)
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
			title: 'Actualizar etiqueta',
			info_1: 'Ten en cuenta, cuando editas una etiqueta aún estará diponible en la sección de creación de formatos.',
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

const ModalRemove = ({ tag, onClose, onRemove }) => {
	const [loading, setLoading] = useState(false)

	const handleRemove = async e => {
		e.preventDefault()
		setLoading(true)
		try {
			const response = await remove(tag.id_tag)
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
			title: 'Desactivar categoria',
			description_a: `Estás a punto de eliminar la categoria`,
			description_b: `${tag.name}`,
			description_c: '¿Está seguro?',
			buttonCancel: 'No, mantenlo',
			buttonSubmit: 'Ok, eliminar!',
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

const ModalReactive = ({ tag, onClose, onActive }) => {
	const [loading, setLoading] = useState(false)

	const handleSubmit = async e => {
		e.preventDefault()
		setLoading(true)
		try {
			const response = await reactive(tag.id_tag)
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
			title: 'Habilitar categoria',
			description_a: `Estás a punto de habilitar la categoria`,
			description_b: `${tag.name}`,
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
