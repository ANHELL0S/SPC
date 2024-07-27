import { toast } from 'sonner'
import { useState, useEffect } from 'react'
import { create, remove, update, getById } from '../services/api/comment.api'

const useCommentActions = id_article => {
	const [comments, setComments] = useState([])

	const fetchComments = async () => {
		try {
			const fetchedComments = await getById(id_article)
			setComments(fetchedComments)
		} catch (error) {
			toast.error(`${error.message}`)
		}
	}

	useEffect(() => {
		fetchComments()
	}, [id_article])

	const addComment = async commentText => {
		try {
			const response = await create({ comment: commentText, id_article_fk: id_article })
			await fetchComments()
			toast.success(`${response.message}`)
		} catch (error) {
			toast.error(`${error.message}`)
		}
	}

	const deleteComment = async commentId => {
		try {
			const response = await remove(commentId)
			await fetchComments()
			toast.success(`${response.message}`)
		} catch (error) {
			toast.error(`${error.message}`)
		}
	}

	const editComment = async (commentId, editedCommentText) => {
		try {
			const response = await update(commentId, { comment: editedCommentText })
			await fetchComments()
			toast.success(`${response.message}`)
		} catch (error) {
			toast.error(`${error.message}`)
		}
	}

	return {
		comments,
		fetchComments,
		addComment,
		deleteComment,
		editComment,
	}
}

export { useCommentActions }
