/* eslint-disable react/prop-types */
import { toast } from 'sonner'
import { useState } from 'react'
import { ModalActionRD } from '../modal/ModalActionRD'
import { remove } from '../../services/api/article.api'

const ModalRemove = ({ article, onClose, onRemove }) => {
	const [loading, setLoading] = useState(false)

	const handleRemove = async e => {
		e.preventDefault()
		setLoading(true)
		try {
			const response = await remove(article.id_article)
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
		text: {
			title: 'Eliminar artículo',
			description_a: `Estás a punto de eliminar el artículo`,
			description_b: `${article.title}`,
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

export { ModalRemove }
