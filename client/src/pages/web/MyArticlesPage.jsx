import { Toaster, toast } from 'sonner'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'
import { Spinner } from '../../components/ui/spinner'
import { useState, useEffect, useContext } from 'react'
import { formatDate } from '../../utils/dataFormater.utils'
import { getByIdUser, update } from '../../services/api/article.api'
import { ButtonLoadingSpinner } from '../../components/ui/ButtomSpinner'
import {
	BiBookmark,
	BiCalendarAlt,
	BiDetail,
	BiEditAlt,
	BiInfoCircle,
	BiListOl,
	BiMessageSquareDetail,
	BiRightArrow,
	BiShow,
} from 'react-icons/bi'
import { BarLeft } from '../../components/BarLeft'
import { BarRight } from '../../components/BarRight'
import { BottomBar } from '../../components/BarDown'
import { LuInfo, LuX } from 'react-icons/lu'
import { useAllCareer } from '../../hooks/useCareer'
import { useAllField_dependence } from '../../hooks/useFieldDependence'
import { useAllField_detailed } from '../../hooks/useFieldDetailed'
import { useAllField_specific } from '../../hooks/useFieldSpecific'
import { useAllField_wide } from '../../hooks/useFieldWide'
import { useAllLineResearch } from '../../hooks/useLineResearch'

const MyArticlePage = () => {
	const { user } = useContext(AuthContext)
	const id = user.id_user
	const [loading, setLoading] = useState(false)
	const [rendering, setRendering] = useState(false)
	const [articles, setArticles] = useState([])
	const [selectedArticle, setSelectedArticle] = useState(null)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [isReviewsModalOpen, setIsReviewsModalOpen] = useState(false)
	const [showDetailsModal, setShowDetailsModal] = useState(false)
	const [selectedReviews, setSelectedReviews] = useState([])

	const { career } = useAllCareer()
	const { field_dependence } = useAllField_dependence()
	const { field_detailed } = useAllField_detailed()
	const { field_specific } = useAllField_specific()
	const { field_wide } = useAllField_wide()
	const { lineResearch } = useAllLineResearch()

	const [selectedFieldDetailed, setSelectedFieldDetailed] = useState('')
	const [selectedFieldSpecific, setSelectedFieldSpecific] = useState('')
	const [selectedFieldWide, setSelectedFieldWide] = useState('')
	const [selectedFieldDependence, setSelectedFieldDependence] = useState('')
	const [selectedLineResearch, setSelectedLineResearch] = useState('')

	const [formData, setFormData] = useState({
		title: '',
		author: '',
		category_name: '',
		manager_name: '',
		summary: '',
		filiation: '',
		participation: '',
		parameters: [],
		tags: [],
	})

	useEffect(() => {
		fetchArticles()
	}, [])

	const fetchArticles = async () => {
		setRendering(true)
		try {
			const fetchedArticles = await getByIdUser(id)
			setArticles(fetchedArticles)
		} catch (error) {
			toast.error(`${error.message}`)
		} finally {
			setRendering(false)
		}
	}

	// Efecto para manejar el artículo seleccionado
	useEffect(() => {
		if (selectedArticle) {
			const selected = articles.find(article => article.id_article === selectedArticle.id_article)
			if (selected) {
				setFormData({
					title: selected.title,
					author: selected.author,
					category_name: selected.category_name,
					manager_name: selected.manager_name,
					link_post: selected.link_post,
					link_magazine: selected.link_magazine,
					summary: selected.summary,
					parameters: selected.parameters,
					tags: selected.tags,
				})
			}
		}
	}, [selectedArticle])

	const handleEditClick = article => {
		setSelectedArticle(article)
		setFormData({
			title: article.title,
			author: article.author,
			link_post: article.link_post,
			link_magazine: article.link_magazine,
			category_name: article.category_name,
			manager_name: article.manager_name,
			summary: article.summary,
			parameters: article.parameters,
			tags: article.tags,
		})
		setIsModalOpen(true)
	}

	const handleInputChange = e => {
		const { name, value } = e.target
		setFormData({
			...formData,
			[name]: value,
		})
	}

	const handleParameterChange = (index, e) => {
		const { name, value } = e.target
		const newParameters = [...formData.parameters]
		newParameters[index][name] = value
		setFormData({
			...formData,
			parameters: newParameters,
		})
	}

	const handleTagChange = (index, e) => {
		const { name, value } = e.target
		const newTags = [...formData.tags]
		newTags[index][name] = value
		setFormData({
			...formData,
			tags: newTags,
		})
	}

	const handleSaveChanges = async () => {
		try {
			setLoading(true)
			const updatedFormData = { ...formData }

			updatedFormData.parameters = updatedFormData.parameters.map(parameter => ({
				id_relation_parameter_article: parameter.id_relation_parameter_article,
				description_parameter: parameter.description_parameter,
			}))

			updatedFormData.tags = updatedFormData.tags.map(tag => ({
				id_relation_tag_article: tag.id_relation_tag_article,
				description_tag: tag.description_tag,
			}))

			// Llamar a la función de actualización en el backend con los datos actualizados
			const response = await update(selectedArticle.id_article, updatedFormData)
			fetchArticles()

			// Actualizar el estado de los artículos con los datos actualizados
			setArticles(prevArticles =>
				prevArticles.map(article =>
					article.id_article === selectedArticle.id_article ? { ...article, ...updatedFormData } : article
				)
			)

			toast.success(`${response.message}`)
		} catch (error) {
			toast.error(`${error.message}`)
		} finally {
			setLoading(false)
			setIsModalOpen(false)
			setSelectedArticle(null)
		}
	}

	const handleReviewsClick = reviews => {
		setSelectedReviews(reviews)
		setIsReviewsModalOpen(true)
	}

	const handleDetailsClick = article => {
		setSelectedArticle(article)
		setShowDetailsModal(true)
	}

	const handleFieldDetailedChange = selectedFieldDetailed => setSelectedFieldDetailed(selectedFieldDetailed)
	const handleFieldDependenceChange = selectedFieldDependence => setSelectedFieldDependence(selectedFieldDependence)
	const handleLineResearchChange = selectedLineResearch => setSelectedLineResearch(selectedLineResearch)

	return (
		<>
			<BarLeft />
			<BarRight />
			<BottomBar />

			{rendering ? (
				<Spinner />
			) : (
				<main className='px-4 pb-12'>
					<div className='bg-white w-full flex justify-between items-center max-w-5xl mx-auto mt-4'>
						<div className='flex flex-col'>
							<div className='flex gap-x-6 flex-row'>
								<h2 className='text-lg font-semibold text-slate-700'>Mis artículos ({articles.length})</h2>
							</div>
						</div>
					</div>

					<div className='max-w-5xl mx-auto bg-white text-slate-600 w-full border-t my-4'>
						<div className='flex flex-col'>
							<div className='max-w-5xl mx-auto bg-white text-slate-600 w-full'>
								{articles.map(article => (
									<div
										key={article.id_article}
										className='border-b py-4 px-4 my-6 rounded-lg border border-slate-200 bg-slate-50/20 hover:shadow-sm hover:border-slate-300 hover:bg-slate-50/40 transition-all ease-in-out'>
										<div className='flex items-center justify-between'>
											<div className='flex items-center text-xs gap-1 pb-2 text-slate-400'>
												<BiCalendarAlt />
												<span>{formatDate(article.createdAt)}</span>
											</div>

											<div className='text-xs text-slate-600 flex gap-2'>
												<button
													className='p-2 rounded-lg hover:bg-slate-100 hover:text-slate-700 cursor-pointer transition-colors duration-150'
													onClick={() => handleEditClick(article)}>
													<BiEditAlt />
												</button>

												<button
													className='p-2 rounded-lg hover:bg-slate-100 hover:text-slate-700 cursor-pointer transition-colors duration-150'
													onClick={() => handleReviewsClick(article.reviews)}>
													<BiListOl />
												</button>
											</div>
										</div>

										<div className='flex flex-col gap-y-2'>
											<Link
												to={`/article/${article.id_article}`}
												className='sm:text-lg text-sm font-bold hover:underline'>
												{article.title}
											</Link>
										</div>

										<div className='flex flex-row items-center gap-3 py-3'>
											<span className='bg-slate-100 px-3 py-0.5 rounded-full text-slate-500 text-xs font-semibold'>
												{article.participation}
											</span>

											<span className='bg-slate-400 px-3 py-0.5 rounded-full text-slate-50 text-xs font-semibold'>
												{article.category_name}
											</span>

											<div
												className={`flex items-center gap-1 text-xs font-semibold ${
													article.status === 'aprobado' ? 'text-green-500' : 'text-slate-400'
												}`}>
												<span
													className={`rounded-full px-3 py-0.5 text-uppercase ${
														article.status === 'aprobado' ? 'text-green-500 bg-green-100' : 'bg-slate-100'
													}`}>
													<span className='ml-1'>
														{article.status.charAt(0).toUpperCase() + article.status.slice(1)}
													</span>
												</span>
											</div>
										</div>

										<div className='flex flex-row items-center justify-between mt-6'>
											<div className='flex items-center space-x-4 text-xs font-medium text-slate-500'>
												<div className='flex flex-row items-center justify-center gap-1'>
													<BiMessageSquareDetail size={14} />
													<span>{article.comment_count}</span>
												</div>

												<div className='flex flex-row items-center justify-center gap-1'>
													<BiBookmark size={14} />
													<span>{article.collection_count}</span>
												</div>

												<div className='flex flex-row items-center justify-center gap-1'>
													<BiShow size={15} />
													<span>{article.view_count}</span>
												</div>
											</div>

											<div
												onClick={() => handleDetailsClick(article)}
												className='flex flex-row items-center gap-1 text-xs font-medium text-slate-500 hover:underline cursor-pointer hover:text-slate-600'>
												<span>Ver más detalles</span>
												<BiRightArrow />
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>

					{showDetailsModal && (
						<div className='fixed inset-0 z-50 flex items-center justify-center overflow-y-scroll bg-slate-50/30 backdrop-blur-sm'>
							<div className='flex w-full max-w-4xl flex-col items-end justify-center px-4 text-center sm:block sm:p-0'>
								<div className='transform border border-slate-300 bg-white text-left align-bottom text-slate-600 transition-all sm:inline-block sm:w-full sm:max-w-2xl sm:align-middle rounded-lg'>
									<div className='flex items-center justify-between px-4 pt-4'>
										<div className='flex flex-row items-center gap-2 font-medium text-slate-600'>
											<div className='rounded-md border p-2'>
												<BiDetail />
											</div>
											<span>Detalles de la publicación</span>
										</div>

										<div
											onClick={() => setShowDetailsModal(false)}
											className='cursor-pointer rounded-md p-1.5 text-lg text-slate-400 transition-colors duration-150 hover:bg-slate-100 hover:text-slate-500'>
											<LuX />
										</div>
									</div>

									<div className='px-4 py-4'>
										<div className='text-gray-600'>
											{selectedArticle.parameters.length === 0 && selectedArticle.tags.length === 0 ? (
												<div className='text-slate-400 flex flex-col items-center justify-center text-sm py-6 font-medium'>
													<span>No existen detalles para este artículo :(</span>
												</div>
											) : (
												<>
													{selectedArticle.parameters.map(parameter => (
														<div
															className='flex items-center justify-between mb-2 text-slate-500 text-sm'
															key={parameter.id_relation_parameter_article}>
															<span className='flex items-center gap-1'>
																<BiInfoCircle />
																<span>{parameter.name_parameter}:</span>
															</span>
															<span className='text-slate-600'>
																{parameter.description_parameter ? parameter.description_parameter : 'No establecido'}
															</span>
														</div>
													))}

													{selectedArticle.tags.map(tag => (
														<div
															className='flex items-center justify-between mb-2 text-slate-500 text-sm'
															key={tag.id_relation_tag_article}>
															<span className='flex items-center gap-1'>
																<BiInfoCircle />
																<span>{tag.name_tag}:</span>
															</span>
															<span className='text-slate-600'>
																{tag.description_tag ? tag.description_tag : 'No establecido'}
															</span>
														</div>
													))}
												</>
											)}
										</div>
									</div>
								</div>
							</div>
						</div>
					)}

					{isModalOpen && (
						<div className='fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-neutral-50/30 backdrop-blur-sm'>
							<div className='relative flex w-full max-w-md flex-col items-center justify-center px-4 text-center sm:block sm:p-0 sm:max-w-2xl'>
								<div className='relative flex flex-col w-full bg-white border border-neutral-300 rounded-lg text-left align-bottom text-neutral-600 transition-all sm:w-full sm:align-middle my-8'>
									{/* Encabezado */}
									<div className='flex items-center justify-between px-4 pt-4'>
										<div className='flex flex-row items-center gap-2 font-medium text-neutral-600'>
											<div className='rounded-md border p-2'>
												<BiEditAlt />
											</div>
											<span>Editar publicación</span>
										</div>

										<div
											onClick={() => setIsModalOpen(false)}
											className='cursor-pointer rounded-md p-1.5 text-lg text-neutral-400 transition-colors duration-150 hover:bg-neutral-100 hover:text-neutral-500'>
											<LuX />
										</div>
									</div>

									{/* Contenido desplazable */}
									<div className='overflow-y-auto p-4 max-h-[calc(100vh-8rem)]'>
										<div className='flex flex-col gap-y-2 text-xs text-slate-600'>
											<div className='grid grid-cols-1 gap-x-4 gap-y-3'>
												<div className='flex flex-col gap-y-2'>
													<label className='text-slate-600'>
														Título <span className='text-red-500'>*</span>
													</label>
													<input
														type='text'
														name='title'
														value={formData.title}
														onChange={handleInputChange}
														className='border border-neutral-300 rounded-lg p-2 text-slate-700'
														placeholder='Título del artículo'
													/>
												</div>
											</div>

											<div className='grid grid-cols-1 gap-x-4 gap-y-3 pt-2'>
												<div className='flex flex-col gap-y-2'>
													<label className='text-slate-600'>
														Resumen <span className='text-red-500'>*</span>
													</label>
													<textarea
														type='text'
														name='summary'
														value={formData.summary}
														onChange={handleInputChange}
														className='border border-neutral-300 rounded-lg p-2 text-slate-700'
														placeholder='Resumen del artículo'
													/>
												</div>
											</div>

											<div className='grid grid-cols-2 gap-4 pt-4'>
												<div className='grid grid-cols-1 gap-4'>
													<div className='flex flex-col gap-1'>
														<label className='text-slate-700'>
															Línea de investigación <span className='text-red-500'>*</span>
														</label>
														<div className='w-full'>
															<select
																id='lineResearch'
																className='block w-full px-4 py-2 mt-1 border border-neutral-300 bg-white rounded-lg focus:outline-none focus:border-blue-400'
																value={selectedLineResearch}
																onChange={e => handleLineResearchChange(e.target.value)}>
																<option value='' disabled hidden>
																	Seleccione una línea de investigación
																</option>
																{lineResearch.map((indexItem, index) => (
																	<option key={index} value={indexItem.id_line_research}>
																		{indexItem.name}
																	</option>
																))}
															</select>
														</div>
													</div>
												</div>

												<div className='grid grid-cols-1 gap-4'>
													<div className='grid grid-cols-2 gap-4'>
														<div className='flex flex-col gap-1'>
															<label className='text-slate-700'>
																Dependencia <span className='text-red-500'>*</span>
															</label>
															<div className='w-full'>
																<select
																	id='fieldDependenceSelect'
																	className='block w-full px-4 py-2 mt-1 border border-neutral-300 bg-white rounded-lg focus:outline-none focus:border-blue-400'
																	value={selectedFieldDependence}
																	onChange={e => handleFieldDependenceChange(e.target.value)}>
																	<option value='' disabled hidden>
																		Seleccione una dependencia
																	</option>
																	{field_dependence.map((indexItem, index) => (
																		<option key={index} value={indexItem.id_field_dependence}>
																			{indexItem.name}
																		</option>
																	))}
																</select>
															</div>
														</div>

														<div className='flex flex-col gap-1'>
															<label className='text-slate-700'>
																Campo detallado <span className='text-red-500'>*</span>
															</label>
															<div className='w-full'>
																<select
																	id='fieldDetailedSelect'
																	className='block w-full px-4 py-2 mt-1 border border-neutral-300 bg-white rounded-lg focus:outline-none focus:border-blue-400'
																	value={selectedFieldDetailed}
																	onChange={e => handleFieldDetailedChange(e.target.value)}>
																	<option value='' disabled hidden>
																		Seleccione un campo detallado
																	</option>
																	{field_detailed.map((indexItem, index) => (
																		<option key={index} value={indexItem.id_field_detailed}>
																			{indexItem.name}
																		</option>
																	))}
																</select>
															</div>
														</div>
													</div>
												</div>
											</div>

											<div className='grid grid-cols-1 gap-y-4 pt-2 md:grid-cols-4 md:gap-x-4 md:gap-y-2'>
												{formData.parameters.map((parameter, index) => (
													<div key={parameter.id_relation_parameter_article} className='flex flex-col gap-y-2 mt-2'>
														<label htmlFor={`parameter_${index}`} className='text-slate-700'>
															{parameter.name_parameter} <span className='text-gray-600'>*</span>
														</label>
														<input
															type='text'
															id={`parameter_${index}`}
															name='description_parameter'
															value={parameter.description_parameter}
															onChange={e => handleParameterChange(index, e)}
															className='border border-neutral-300 rounded-lg p-2 text-slate-700'
															placeholder={`${parameter.name_parameter} del artículo`}
														/>
													</div>
												))}

												{formData.tags.map((tag, index) => (
													<div key={tag.id_relation_tag_article} className='flex flex-col gap-y-2 mt-2'>
														<label htmlFor={`tag_${index}`} className='text-slate-600'>
															{tag.name_tag} <span className='text-gray-600'>*</span>
														</label>
														<input
															type='text'
															id={`tag_${index}`}
															name='description_tag'
															value={tag.description_tag}
															onChange={e => handleTagChange(index, e)}
															className='border border-neutral-300 rounded-lg p-2 text-slate-700'
															placeholder={`${tag.name_tag} del artículo`}
														/>
													</div>
												))}
											</div>
										</div>
									</div>

									<div className='flex justify-between py-2 font-semibold gap-4 flex-col sm:flex-row px-4 text-xs'>
										<button
											onClick={() => setIsModalOpen(false)}
											className='flex-1 px-4 py-3 border border-slate-300 text-slate-600 rounded-lg hover:bg-slate-100 transition-colors duration-150'>
											Cancelar
										</button>

										<button
											onClick={handleSaveChanges}
											className={`flex-1 px-4 py-3 bg-sky-700 text-white rounded-lg hover:bg-sky-800 transition-colors duration-150 disabled:opacity-50' inline-flex h-10 items-center justify-center hover:text-white hover:ring hover:ring-white disabled:pointer-events-none ${
												loading ? 'cursor-not-allowed' : ''
											}`}>
											{loading ? <ButtonLoadingSpinner loadingText='Guardando cambios...' /> : 'Guardar cambios'}
										</button>
									</div>
								</div>
							</div>
						</div>
					)}

					{isReviewsModalOpen && (
						<div className='fixed inset-0 z-50 flex items-center justify-center overflow-y-scroll bg-slate-50/30 backdrop-blur-sm '>
							<div className='flex w-full max-w-md flex-col items-end justify-center px-4 text-center sm:block sm:p-0'>
								<div className='ransform border border-slate-300 bg-white text-left align-bottom text-slate-600 transition-all sm:inline-block sm:w-full sm:max-w-md sm:align-middle rounded-lg'>
									<div className='flex items-center justify-between px-4 pt-4'>
										<div className='flex flex-row items-center gap-2 font-medium text-slate-600'>
											<div className='rounded-md border p-2'>
												<BiListOl />
											</div>
											<span>Revisiones del artículo</span>
										</div>

										<div
											onClick={() => setIsReviewsModalOpen(false)}
											className='cursor-pointer rounded-md p-1.5 text-lg text-slate-400 transition-colors duration-150 hover:bg-slate-100 hover:text-slate-500'>
											<LuX />
										</div>
									</div>

									<div className='text-md flex flex-col gap-y-1 px-4 pt-4 font-semibold text-neutral-600'>
										<div className='flex flex-col gap-y-2 bg-sky-50 px-3 py-2 text-xs font-normal text-sky-700'>
											<div className='flex flex-row items-center gap-1 font-semibold'>
												<LuInfo size={15} />
												<span>Información</span>
											</div>
											<span>
												Por favor, asegúrate de completar todas las revisiones correctamente para que tu artículo sea
												aprobado.
											</span>
										</div>
									</div>

									<div className='flex flex-col text-xs text-slate-600 px-4 pb-4 pt-4'>
										{selectedReviews.length > 0 ? (
											selectedReviews.map(review => (
												<div key={review.id_review} className='py-1 space-y-1'>
													<div className='flex flex-row items-center gap-1 text-slate-400'>
														<BiCalendarAlt />
														<span>{formatDate(review.createdAt)}</span>
													</div>

													<div className='flex flex-row items-center gap-2 justify-between text-slate-500'>
														<div className='text-sm'>{review.task}</div>
														<div
															className={`flex items-center gap-1 font-medium px-2 py-0.5 rounded-full ${
																review.status === 'pendiente' ? 'bg-orange-100' : 'bg-green-100'
															}`}>
															<span
																className={`uppercase ${
																	review.status === 'pendiente' ? 'text-orange-500' : 'text-green-500'
																}`}>
																{review.status}
															</span>
														</div>
													</div>
												</div>
											))
										) : (
											<div className='text-slate-400 flex flex-col items-center justify-center text-sm py-6 font-medium'>
												<span>No hay revisiones disponibles :)</span>
											</div>
										)}
									</div>
								</div>
							</div>
						</div>
					)}
				</main>
			)}

			<Toaster richColors expand={true} />
		</>
	)
}

export { MyArticlePage }
