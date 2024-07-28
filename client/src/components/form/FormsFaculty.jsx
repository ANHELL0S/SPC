/* eslint-disable react/prop-types */
import { toast } from 'sonner'
import { useState } from 'react'
import { BiArch } from 'react-icons/bi'
import { Modal1 } from '../modal/Modal1'
import { ModalActionRD } from '../modal/ModalActionRD'
import { createFacultyRequest, updateFacultyRequest, deleteFacultyRequest } from '../../services/api/faculty.api'

const ModalCreate = ({ onClose, onCreate }) => {
	const [loading, setLoading] = useState(false)

	const [formData, setFormData] = useState({
		name: '',
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
			const response = await createFacultyRequest(formData)
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
			title: 'Crear facultad',
			info_1: 'Ten en cuenta, cuando creas una facultad estará diponible en la creación de un usuario docente.',
			submit: loading ? 'Procesando...' : 'Ok, Crear!',
			cancel: 'No, Cancelar',
		},
		colors: {
			bg: ['bg-sky-50', 'bg-[#00accf]', 'hover:bg-[#008ec6]'],
		},

		loading,
		icon: <BiArch />,
		onClose: onClose,
		onSubmit: handleSubmit,
		onChange: handleChange,
	}

	return <Modal1 {...modalProps} />
}

const ModalUpdate = ({ faculty, onClose, onUpdate }) => {
	const [loading, setLoading] = useState(false)

	const [formData, setFormData] = useState({
		name: faculty.name || '',
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

			const response = await updateFacultyRequest(faculty.id_faculty, updatedFields)
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
			title: 'Actualizar facultad',
			info_1: 'Ten en cuenta, cuando editas una facultad estará diponible en la creación de un usuario docente.',
			submit: loading ? 'Procesando...' : 'Si, actualizar!',
			cancel: 'No, cancelar.',
		},
		colors: {
			bg: ['bg-sky-50', 'bg-[#00accf]', 'hover:bg-[#008ec6]'],
		},
		loading,
		icon: <BiArch />,
		onClose: onClose,
		onSubmit: handleSubmit,
		onChange: handleChange,
	}

	return <Modal1 {...modalProps} />
}

const ModalRemove = ({ faculty, onClose, onDelete }) => {
	const [loading, setLoading] = useState(false)

	const handleRemove = async e => {
		e.preventDefault()
		setLoading(true)
		try {
			const response = await deleteFacultyRequest(faculty.id_faculty)
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
			title: 'Eliminar facultad',
			description_a: `Estás a punto de eliminar la facultad`,
			description_b: `${faculty.name}`,
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
