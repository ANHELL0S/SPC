import { useState } from 'react'
import { ButtonLoadingSpinner } from '../ui/ButtomSpinner'

const CommentForm = ({ id_article, addComment }) => {
	const [commentText, setCommentText] = useState('')
	const [loadingSubmit, setLoadingSubmit] = useState(false)

	const handleSubmit = async e => {
		e.preventDefault()
		setLoadingSubmit(true)
		await addComment(commentText)
		setCommentText('')
		setLoadingSubmit(false)
	}

	return (
		<form onSubmit={handleSubmit} className='max-w-5xl mx-auto bg-white text-slate-600 w-full'>
			<div className='mb-3'>
				<textarea
					value={commentText}
					onChange={e => setCommentText(e.target.value)}
					placeholder='Escribe tu opinión...'
					className='w-full text-slate-600 bg-slate-50 rounded-lg border border-slate-300 leading-normal h-20 py-2 px-3 font-normal text-sm placeholder-slate-400 focus:outline-none focus:bg-white'></textarea>
			</div>

			<div className='flex justify-end'>
				<button
					type='submit'
					disabled={loadingSubmit}
					className={`mt-2 px-2.5 py-1.5 rounded-md text-slate-50 text-sm bg-sky-700 cursor-pointer hover:bg-sky-800 transition-colors duration-150 hover:text-white hover:ring hover:ring-white disabled:pointer-events-none ${
						loadingSubmit ? 'cursor-not-allowed' : ''
					}`}>
					{loadingSubmit ? <ButtonLoadingSpinner loadingText='Comentando...' /> : 'Comentar'}
				</button>
			</div>
		</form>
	)
}

export { CommentForm }
