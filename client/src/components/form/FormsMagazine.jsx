/* eslint-disable react/prop-types */
import { toast } from 'sonner'
import { useState } from 'react'
import { BiArch, BiLibrary } from 'react-icons/bi'
import { Modal1 } from '../modal/Modal1'
import { ModalActionRD } from '../modal/ModalActionRD'
import { createMagazineRequest, updateMagazineRequest, deleteMagazineRequest } from '../../services/api/magazine.api'

const ModalCreate = ({ onClose, onCreate }) => {
	const [loading, setLoading] = useState(false)

	const [formData, setFormData] = useState({
		name: '',
	})

	const spanishTranslations = {
		name: 'Nombre de la revista',
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
			const response = await createMagazineRequest(formData)
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
			title: 'Crear revista',
			info_1: 'Ten en cuenta, cuando creas una revista estará diponible en la creación de artículos.',
			submit: loading ? 'Procesando...' : 'Ok, Crear!',
			cancel: 'No, Cancelar',
		},
		colors: {
			bg: ['bg-sky-50', 'bg-[#00accf]', 'hover:bg-[#008ec6]'],
		},

		loading,
		icon: <BiLibrary />,
		onClose: onClose,
		onSubmit: handleSubmit,
		onChange: handleChange,
	}

	return <Modal1 {...modalProps} />
}

const ModalUpdate = ({ magazine, onClose, onUpdate }) => {
	const [loading, setLoading] = useState(false)

	const [formData, setFormData] = useState({
		name: magazine.name || '',
	})

	const spanishTranslations = {
		name: 'Nombre de la facultad',
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

			const response = await updateMagazineRequest(magazine.id_magazine, updatedFields)
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
			title: 'Actualizar revista',
			info_1: 'Ten en cuenta, cuando editas una revista estará diponible en la creación de artículos.',
			submit: loading ? 'Procesando...' : 'Si, actualizar!',
			cancel: 'No, cancelar.',
		},
		colors: {
			bg: ['bg-sky-50', 'bg-[#00accf]', 'hover:bg-[#008ec6]'],
		},
		loading,
		icon: <BiLibrary />,
		onClose: onClose,
		onSubmit: handleSubmit,
		onChange: handleChange,
	}

	return <Modal1 {...modalProps} />
}

const ModalRemove = ({ magazine, onClose, onDelete }) => {
	const [loading, setLoading] = useState(false)

	const handleRemove = async e => {
		e.preventDefault()
		setLoading(true)
		try {
			const response = await deleteMagazineRequest(magazine.id_magazine)
			onDelete()
			onClose()
			toast.success(`${response.message}`)
		} catch (error) {
			toast.error(`${error.message}`)
		} finally {
			setLoading(false)
		}
	}

	const modalProps = {
		text: {
			title: 'Eliminar revista',
			description_a: `Estás a punto de eliminar la revista`,
			description_b: `${magazine.name}`,
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

export { ModalCreate, ModalUpdate, ModalRemove }
