import { toast } from 'sonner'
import { useState, useEffect } from 'react'
import { ModalActionRD } from '../modal/ModalActionRD'
import { ModalSelector } from '../modal/ModalTemplateCreate'
import { fetch as fetchTags } from '../../services/api/tags.api'
import { ModalSelectorUpdate } from '../modal/ModalTemplateUpdate'
import { create, remove, update } from '../../services/api/template.api'
import { fetch as fetchCategory } from '../../services/api/categories.api'

const ModalCreate = ({ onClose, onCreate }) => {
	const [tags, setTags] = useState([])
	const [loading, setLoading] = useState(false)
	const [categories, setCategories] = useState([])
	const [loadingData, setLoadingData] = useState(true)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const categoriesResult = await fetchCategory()
				const activeCategories = categoriesResult.filter(category => category.active)

				const tagsResult = await fetchTags()
				const activeTags = tagsResult.filter(tag => tag.active)

				setCategories(activeCategories)
				setTags(activeTags)
				setLoadingData(false)
			} catch (error) {
				setLoadingData(false)
			}
		}

		fetchData()
	}, [])

	const handleSubmit = async formData => {
		try {
			setLoading(true)
			const response = await create(formData)
			toast.success(`${response.message}`)
			onCreate()
			onClose()
		} catch (error) {
			toast.error(`${error.message}`)
			setLoading(false)
		}
	}

	const translations = {
		title: 'Crear formato',
		message: 'Por favor, seleciona la categoria correcta con sus respectivas etiquetas.',
		info: 'Ten en cuenta, cuando creas un formato este sera el que los docentes podran usarlo para llenarlo con los datos de sus artículos.',
		buttonCancel: 'No, cancelar',
		buttonSubmit: 'Ok, crear!',
	}

	const colors = {
		title: 'text-blue-400',
		bg: ['bg-blue-50', 'bg-blue-400', 'hover:bg-blue-500'],
		submit: ['bg-blue-400', 'bg:blue-400'],
	}

	return (
		<ModalSelector
			translations={translations}
			initialValues={{ categories, tags }}
			onSubmit={handleSubmit}
			onClose={onClose}
			colors={colors}
			loading={loading}
			loadingData={loadingData}
		/>
	)
}

const ModalUpdate = ({ onClose, onUpdate, template }) => {
	const [tagsActive, setTagsActive] = useState([])
	const [loading, setLoading] = useState(false)
	const [loadingData, setLoadingData] = useState(true)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const tagsResult = await fetchTags()
				const activeTags = tagsResult.filter(tag => tag.active)
				setTagsActive(activeTags)
				setLoadingData(false)
			} catch (error) {
				setLoadingData(false)
			}
		}
		fetchData()
	}, [])

	const handleSubmit = async formData => {
		setLoading(true)
		try {
			const updatedFormData = {
				...formData,
			}

			const response = await update(template.id_template, updatedFormData)
			toast.success(`${response.message}`)
			onUpdate()
			onClose()
		} catch (error) {
			toast.error(`${error.message}`)
			setLoading(false)
		}
	}

	const translations = {
		title: 'Añadir etiquetas',
		message: 'Por favor, seleciona las etiquetas correctas para este formato de articulo.',
		info: 'Ten en cuenta, cuando añades etiquetas a un formato estas seran las que los docentes podran usarlas para llenarlas con los datos de sus artículos.',
		submit: 'Actualizar',
		cancel: 'Cancelar',
	}

	const colors = {
		title: 'text-blue-400',
		bg: ['bg-blue-50', 'bg-blue-400', 'hover:bg-blue-500'],
		submit: ['bg-blue-400', 'bg:blue-400'],
	}

	return (
		<ModalSelectorUpdate
			translations={translations}
			initialValues={tagsActive}
			onSubmit={handleSubmit}
			onClose={onClose}
			colors={colors}
			loadingData={loadingData}
			loading={loading}
			associatedTags={template.tags}
		/>
	)
}

const ModalRemove = ({ template, onClose, onRemove }) => {
	const [loading, setLoading] = useState(false)

	const handleRemove = async e => {
		e.preventDefault()
		setLoading(true)
		try {
			const response = await remove(template.id_template)
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
			title: 'Eliminar formato',
			description_a: `Estás a punto de eliminar el formato`,
			description_b: `${template.category_name}`,
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
