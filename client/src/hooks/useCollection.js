import { toast } from 'sonner'
import { useState, useEffect } from 'react'
import { fetch, create, remove } from '../services/api/collection_article.api'

const useCollection = (id_article, user) => {
	const [isInCollection, setIsInCollection] = useState(false)
	const [collectionId, setCollectionId] = useState(null)
	const [totalArticlesInCollection, setTotalArticlesInCollection] = useState(0)

	// Función para verificar si el artículo está en la colección
	const checkCollectionStatus = async () => {
		const response = await fetch()
		const collectionItem = response.find(item => item.id_article_fk === id_article && item.id_user_fk === user?.id_user)
		setIsInCollection(!!collectionItem)
		setCollectionId(collectionItem?.id_collection_article || null)
		setTotalArticlesInCollection(response.length) // Guardar el total de artículos en la colección
	}

	// Función para añadir un artículo a la colección
	const addToCollection = async () => {
		try {
			const response = await create({ id_article_fk: id_article })
			toast.success(`${response.message}`)
			setIsInCollection(true)
			setCollectionId(response.id_collection_article)
			await checkCollectionStatus() // Actualizar el estado después de agregar
			return response
		} catch (error) {
			toast.error(`${error.message}`)
		}
	}

	// Función para quitar un artículo de la colección
	const removeFromCollection = async () => {
		try {
			const response = await remove(collectionId)
			toast.success(`${response.message}`)
			setIsInCollection(false)
			setCollectionId(null)
			await checkCollectionStatus() // Actualizar el estado después de eliminar
			return response
		} catch (error) {
			toast.error(`${error.message}`)
		}
	}

	useEffect(() => {
		checkCollectionStatus()
	}, [id_article, user])

	return { isInCollection, addToCollection, removeFromCollection, checkCollectionStatus, totalArticlesInCollection }
}

export { useCollection }
