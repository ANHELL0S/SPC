import { toast } from 'sonner'
import { useState } from 'react'
import { formatDate } from '../../utils/dataFormater.utils'
import { BiEditAlt, BiTrash } from 'react-icons/bi'
import Avvvatars from 'avvvatars-react'

const CommentList = ({ comments, fetchComments, user, isAuthenticated, deleteComment, editComment }) => {
	const [editedComment, setEditedComment] = useState({ id: null, text: '' })

	const handleEditComment = async (commentId, commentText) => {
		setEditedComment({ id: commentId, text: commentText })
	}

	const handleSaveEditedComment = async (commentId, editedCommentText) => {
		try {
			await editComment(commentId, editedCommentText)
			toast.success('¡Comentario editado correctamente!')
			fetchComments() // Actualiza los comentarios después de editar
			setEditedComment({ id: null, text: '' }) // Sal del modo de edición
		} catch (error) {
			toast.error(`${error.message}`)
		}
	}

	return (
		<div>
			{comments.length === 0 ? (
				<p className='text-slate-600 font-medium text-sm py-4'>Sé el primero en comentar.</p>
			) : (
				comments.map(comment => (
					<div key={comment.id_comment} className='bg-white border-b py-4 text-sm text-slate-500'>
						<div className='flex items-center justify-between text-slate-400 font-medium text-xs'>
							<div className='flex flex-row gap-1'>
								{comment.name_user && comment.name_user && <Avvvatars size={26} value={comment.name_user} />}
								<div className='flex items-center text-slate-600 gap-2 pl-1'>
									<p className='font-semibold'>{comment.name_user}</p>
									<p className='text-slate-400 font-normal'>{formatDate(comment.createdAt)}</p>
								</div>
							</div>

							{isAuthenticated && comment.id_user_fk === user.id_user && (
								<div className='flex items-center justify-start text-slate-400 font-medium text-xs'>
									<button
										onClick={() => handleEditComment(comment.id_comment, comment.comment)}
										className='rounded-lg rounded-r-none px-2 py-2 hover:bg-slate-200 text-slate-600 hover:text-slate-800 transition-colors duration-150'>
										<BiEditAlt />
									</button>

									<button
										onClick={() => deleteComment(comment.id_comment)}
										className='rounded-lg rounded-l-none px-2 py-2 hover:bg-red-200 text-red-600 hover:text-red-800 transition-colors duration-150'>
										<BiTrash className='inline-block' />
									</button>
								</div>
							)}
						</div>

						{editedComment.id === comment.id_comment ? (
							<div className='mt-2'>
								<textarea
									value={editedComment.text}
									onChange={e => setEditedComment({ ...editedComment, text: e.target.value })}
									className='w-full bg-slate-50 rounded-lg border border-slate-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-200'
									rows='3'></textarea>

								<div className='flex justify-end mt-2 gap-3 font-semibold'>
									<button
										onClick={() => setEditedComment({ id: null, text: '' })}
										className='border border-slate-300 text-slate-500 px-3 py-1 ml-2 rounded hover:bg-red-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-200 transition-colors duration-150'>
										Cancelar
									</button>

									<button
										onClick={() => handleSaveEditedComment(comment.id_comment, editedComment.text)}
										className='bg-sky-500 text-white px-3 py-1 rounded hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-200 transition-colors duration-150'>
										Guardar
									</button>
								</div>
							</div>
						) : (
							<p className='mt-2 text-slate-600 pl-8'>{comment.comment}</p>
						)}
					</div>
				))
			)}
		</div>
	)
}

export { CommentList }
