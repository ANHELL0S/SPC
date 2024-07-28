import { Toaster } from 'sonner'
import { useParams } from 'react-router-dom'
import { BarLeft } from '../../components/BarLeft'
import { useArticle } from '../../hooks/useArticle'
import AuthContext from '../../context/AuthContext'
import { BottomBar } from '../../components/BarDown'
import { BarRight } from '../../components/BarRight'
import { Spinner } from '../../components/ui/spinner'
import { NotFound } from '../../components/ui/NotFound'
import { useEffect, useState, useContext } from 'react'
import { useCollection } from '../../hooks/useCollection'
import { useCommentActions } from '../../hooks/useComment'
import { CommentList } from '../../components/web/CommentList'
import { CommentForm } from '../../components/web/CommentForm'
import { ArticleDetails } from '../../components/web/ArticleDetails'

const ArticlePage = () => {
	const [rendering, setRendering] = useState(true)
	const { user, isAuthenticated } = useContext(AuthContext)
	const { id_article } = useParams()
	const { article, loading: articleLoading } = useArticle(id_article)
	const { comments, fetchComments, addComment, deleteComment, editComment } = useCommentActions(id_article)
	const { isInCollection, addToCollection, removeFromCollection, checkCollectionStatus, totalArticlesInCollection } =
		useCollection(id_article, user)
	const [userIp, setUserIp] = useState('')

	useEffect(() => {
		const fetchData = async () => {
			await fetchComments()
			await checkCollectionStatus()
			setRendering(false)
		}

		const fetchUserIp = async () => {
			try {
				const response = await fetch('https://api.ipify.org?format=json')
				const data = await response.json()
				setUserIp(data.ip)
			} catch (error) {
				console.error('Error fetching IP:', error)
				setUserIp('unknown')
			}
		}

		setRendering(true)
		fetchUserIp()
		fetchData()
	}, [id_article])

	const handleAddCollectionArticle = async () => {
		await addToCollection()
	}

	const handleRemoveCollectionArticle = async () => {
		await removeFromCollection()
	}

	return (
		<>
			<BarLeft />
			<BarRight />
			<BottomBar />

			<div className='max-w-5xl mx-auto bg-white text-slate-600 w-full px-4 pb-36'>
				{rendering ? (
					<Spinner />
				) : (
					<>
						{articleLoading ? (
							<Spinner />
						) : (
							<>
								{!article ? (
									<NotFound
										title='Artículo no disponible'
										description='El artículo que buscas podría estar en proceso de revisión o simplemente no existe en este momento. Lamentamos las molestias y agradecemos tu comprensión :)'
										linkText='Llevar al inicio'
										linkTo='/artículos'
									/>
								) : (
									<>
										<ArticleDetails
											article={article}
											user={user}
											comments={comments}
											isInCollection={isInCollection}
											handleAddCollectionArticle={handleAddCollectionArticle}
											handleRemoveCollectionArticle={handleRemoveCollectionArticle}
											isAuthenticated={isAuthenticated}
											totalArticlesInCollection={totalArticlesInCollection}
										/>

										<div className='comments-section mt-8'>
											<h2 className='text-2xl font-bold mb-4'>Comentarios</h2>

											<CommentForm id_article={id_article} addComment={addComment} />

											<CommentList
												id_article={id_article}
												comments={comments}
												fetchComments={fetchComments}
												user={user}
												isAuthenticated={isAuthenticated}
												deleteComment={deleteComment}
												editComment={editComment}
											/>
										</div>
									</>
								)}
							</>
						)}
					</>
				)}

				<Toaster richColors expand={true} />
			</div>
		</>
	)
}

export { ArticlePage }
