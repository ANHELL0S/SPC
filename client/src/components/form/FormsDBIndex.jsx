/* eslint-disable react/prop-types */
import { toast } from 'sonner'
import { useState } from 'react'
import { Modal1 } from '../modal/Modal1'
import { BiData } from 'react-icons/bi'
import { ModalActionRD } from '../modal/ModalActionRD'
import { createDBIndexRequest, updateDBIndexRequest, deleteDBIndexRequest } from '../../services/api/dbIndex.api'

const ModalCreate = ({ onClose, onCreate }) => {
	const [loading, setLoading] = useState(false)

	const [formData, setFormData] = useState({
		name: '',
	})

	const spanishTranslations = {
		name: 'Nombre de la base datos indexada',
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
			const response = await createDBIndexRequest(formData)
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
			title: 'Crear base datos indexada',
			info_1: 'Ten en cuenta, cuando crees una base datos indexada estará diponible en la creación de artículos.',
			submit: loading ? 'Procesando...' : 'Ok, Crear!',
			cancel: 'No, Cancelar',
		},
		colors: {
			bg: ['bg-sky-50', 'bg-[#00accf]', 'hover:bg-[#008ec6]'],
		},

		loading,
		icon: <BiData />,
		onClose: onClose,
		onSubmit: handleSubmit,
		onChange: handleChange,
	}

	return <Modal1 {...modalProps} />
}

const ModalUpdate = ({ dbIndex, onClose, onUpdate }) => {
	const [loading, setLoading] = useState(false)

	const [formData, setFormData] = useState({
		name: dbIndex.name || '',
	})

	const spanishTranslations = {
		name: 'Nombre de la base datos indexada',
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

			const response = await updateDBIndexRequest(dbIndex.id_db_index, updatedFields)
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
			title: 'Actualizar base datos indexada',
			info_1: 'Ten en cuenta, cuando editas una base datos indexada estará diponible en la creación de artículos.',
			submit: loading ? 'Procesando...' : 'Si, actualizar!',
			cancel: 'No, cancelar.',
		},
		colors: {
			bg: ['bg-sky-50', 'bg-[#00accf]', 'hover:bg-[#008ec6]'],
		},
		loading,
		icon: <BiData />,
		onClose: onClose,
		onSubmit: handleSubmit,
		onChange: handleChange,
	}

	return <Modal1 {...modalProps} />
}

const ModalRemove = ({ dbIndex, onClose, onDelete }) => {
	const [loading, setLoading] = useState(false)

	const handleRemove = async e => {
		e.preventDefault()
		setLoading(true)
		try {
			const response = await deleteDBIndexRequest(dbIndex.id_db_index)
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
			description_b: `${dbIndex.name}`,
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
