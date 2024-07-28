import { Toaster, toast } from 'sonner'
import { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import { formatDate } from '../../utils/dataFormater.utils'
import { ModalRemove } from '../../components/form/FormsArticle'
import { SearchInput } from '../../components/ui/Search_Input.UI'
import { fetch, check, remove as removeArticle } from '../../services/api/article.api'
import {
	BiBookmark,
	BiCalendarAlt,
	BiCheck,
	BiDownload,
	BiEditAlt,
	BiFileBlank,
	BiFilterAlt,
	BiFoodMenu,
	BiMessageSquareDetail,
	BiShow,
	BiShowAlt,
	BiSolidFileArchive,
	BiSolidFileExport,
	BiTrashAlt,
	BiUser,
	BiX,
} from 'react-icons/bi'
import {
	create,
	get_approved,
	get_pending,
	remove,
	check_review,
	uncheck_review,
	update,
} from '../../services/api/reviews.api'
import { Spinner } from '../../components/ui/spinner'
import { LuFile, LuInfo, LuPrinter, LuX } from 'react-icons/lu'
import * as XLSX from 'xlsx'

const ArticleLayout = () => {
	const [loading, setLoading] = useState(true)
	const [articles, setArticles] = useState([])
	console.log(articles)
	const [selectedArticle, setSelectedArticle] = useState(null)
	const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
	const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)
	const [reviewContent, setReviewContent] = useState('')
	const [reviewsApproved, setReviewsApproved] = useState([])
	const [reviewsPending, setReviewsPending] = useState([])
	const [searchTerm, setSearchTerm] = useState('')
	const [editingReviewId, setEditingReviewId] = useState(null)
	const [editedTask, setEditedTask] = useState('')
	const [toDelete, setToDelete] = useState(null)
	const [showDeleteModal, setShowDeleteModal] = useState(false)
	const [processingArticleId, setProcessingArticleId] = useState(null)

	const openEditModal = (reviewId, task) => {
		setEditingReviewId(reviewId)
		setEditedTask(task)
	}

	const closeEditModal = () => {
		setEditingReviewId(null)
		setEditedTask('')
	}

	useEffect(() => {
		fetchData()
	}, [])

	const fetchData = async () => {
		try {
			const articlesData = await fetch()
			setArticles(articlesData)
			setLoading(false)
		} catch (error) {
			toast.error(`${error.message}`)
		}
	}

	const openDetailModal = article => {
		console.log(article)
		setSelectedArticle(article)
		console.log(article)
		setIsDetailModalOpen(true)
	}

	const openReviewModal = async article => {
		setSelectedArticle(article)
		setIsReviewModalOpen(true)
		setReviewsApproved([]) // Limpiar el estado
		setReviewsPending([]) // Limpiar el estado

		try {
			const approvedData = await get_approved(article.id_article)
			const pendingData = await get_pending(article.id_article)
			setReviewsApproved(approvedData)
			setReviewsPending(pendingData)
		} catch (error) {
			toast.error(`${error.message}`)
		}
	}

	const closeDetailModal = () => {
		setSelectedArticle(null)
		setIsDetailModalOpen(false)
	}

	const closeReviewModal = () => {
		setSelectedArticle(null)
		setIsReviewModalOpen(false)
	}

	const [reportType, setReportType] = useState('all') // 'all' or 'category'
	const [selectedCategory, setSelectedCategory] = useState('')

	const transformDataForXLSX = articles => {
		// Function to remove accents from a string
		const removeAccents = str => {
			if (str === null || str === undefined) {
				return ''
			}
			return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
		}

		// Function to check if a string is a link
		const isLink = str => str && str.startsWith('https://')

		const parameterFields = new Set()
		const tagFields = new Set()

		// Collect all parameter and tag fields
		articles.forEach(article => {
			article.parameters.forEach(param => parameterFields.add(removeAccents(param.name_parameter).toUpperCase()))
			article.tags.forEach(tag => tagFields.add(removeAccents(tag.name_tag).toUpperCase()))
		})

		const parameterFieldsArray = Array.from(parameterFields)
		const tagFieldsArray = Array.from(tagFields)

		// Transform article data
		return articles.map(article => {
			const data = {
				Nombre: removeAccents(article?.manager_name).toUpperCase(),
				Cédula: article.manager_info?.identification_card || '',
				Dedicación: removeAccents(article.manager_info?.dedication || '').toUpperCase(),
				'Código IESS': '1017',
				'Código publicación': '',
				'Tipo publicación': removeAccents(article.category_name).toUpperCase(),
				// Etiquetas
				...tagFieldsArray.reduce((acc, field) => {
					const tag = article.tags.find(t => removeAccents(t.name_tag).toUpperCase() === field)
					acc[`${field}`] = tag
						? isLink(tag.description_tag)
							? tag.description_tag
							: removeAccents(tag.description_tag || '').toUpperCase()
						: ''
					return acc
				}, {}),
				'Título publicación': removeAccents(article.title).toUpperCase(),
				'Fecha de ingreso': '',
				'Fecha de publicación': '',
				'Campo amplio': article.field_wide_info.map(field => removeAccents(field.name_wide).toUpperCase()).join(', '),
				'Campo específico': article.field_specific_info
					.map(field => removeAccents(field.name_specific).toUpperCase())
					.join(', '),
				'Campo detallado': article.field_detailed_info
					.map(field => removeAccents(field.name_detailed).toUpperCase())
					.join(', '),
				'Línea de investigación': removeAccents(article.lineResearch_info?.description || '').toUpperCase(),
				'Tipo de ducumento': removeAccents('Cédula').toUpperCase(),
				Género: removeAccents(article.manager_info?.gender || '').toUpperCase(),
				Dependencia: article.field_dependence_info
					.map(field => removeAccents(field.name_dependence).toUpperCase())
					.join(', '),
				'Relación laboral': removeAccents(article.manager_info?.employmentRelationship || '').toUpperCase(),
				'Género del Manager': removeAccents(article.manager_info?.gender || '').toUpperCase(),
				'Relación Laboral del Manager': removeAccents(article.manager_info?.employmentRelationship || '').toUpperCase(),
				Carrera: removeAccents(article.career_info?.description || '').toUpperCase(),
				Estado: removeAccents(article.status).toUpperCase(),
				'Filiación del Manager': removeAccents(article.manager_info?.filiation || '').toUpperCase(),
				Participación: removeAccents(article?.participation || '').toUpperCase(),
				// Parámetros
				...parameterFieldsArray.reduce((acc, field) => {
					const param = article.parameters.find(p => removeAccents(p.name_parameter).toUpperCase() === field)
					acc[`${field}`] = param ? removeAccents(param.description_parameter || '').toUpperCase() : ''
					return acc
				}, {}),
			}
			return data
		})
	}

	/*
	const exportToXLSX = () => {
		// Filtrar los datos según el tipo de reporte y categoría seleccionada
		const filteredData =
			reportType === 'category' ? articles.filter(article => article.category_name === selectedCategory) : articles

		// Transformar los datos
		const transformedData = transformDataForXLSX(filteredData)

		// Crear una nueva hoja de cálculo y agregarle los datos
		const worksheet = XLSX.utils.json_to_sheet(transformedData)
		const workbook = XLSX.utils.book_new()
		XLSX.utils.book_append_sheet(workbook, worksheet, 'Articles')

		// Exportar el archivo XLSX
		XLSX.writeFile(workbook, 'ArticlesData.xlsx')
		toast.success('Reporte generado exitosamente!')
	}
	*/

	const exportToXLSX = () => {
		// Filtrar los datos según el tipo de reporte y categoría seleccionada
		const filteredData =
			reportType === 'category' ? articles.filter(article => article.category_name === selectedCategory) : articles

		// Transformar los datos
		const transformedData = transformDataForXLSX(filteredData)

		// Crear una nueva hoja de cálculo y agregarle los datos
		const worksheet = XLSX.utils.json_to_sheet(transformedData)
		const workbook = XLSX.utils.book_new()
		XLSX.utils.book_append_sheet(workbook, worksheet, 'Articles')

		// Obtener la fecha actual en formato dd-mm-yyyy
		const today = new Date()
		const formattedDate = today.toISOString().split('T')[0].split('-').reverse().join('-')

		// Construir el nombre del archivo
		const fileName = `Reporte_${reportType === 'category' ? selectedCategory : 'todos'}-${formattedDate}.xlsx`

		// Exportar el archivo XLSX
		XLSX.writeFile(workbook, fileName)
		toast.success('Reporte generado exitosamente!')
	}

	const handleSubmitReview = async () => {
		try {
			const response = await create({ articleId: selectedArticle.id_article, content: reviewContent })
			toast.success(`${response.message}`)
			setReviewContent('')
			fetchReviews()
		} catch (error) {
			toast.error(`${error.message}`)
		}
	}
	const handle_check_article = async id => {
		setProcessingArticleId(id) // Establecer el estado de carga
		try {
			const response = await check(id)
			toast.success(`${response.message}`)
			fetchData()
		} catch (error) {
			toast.error(`${error.message}`)
		} finally {
			setProcessingArticleId(null) // Restablecer el estado de carga
		}
	}

	const fetchReviews = async () => {
		try {
			const approved = await get_approved(selectedArticle.id_article)
			const pending = await get_pending(selectedArticle.id_article)
			setReviewsApproved(approved)
			setReviewsPending(pending)
		} catch (error) {
			toast.error(`${error.message}`)
		}
	}

	const handleDeleteReview = async reviewId => {
		try {
			const response = await remove(reviewId)
			toast.success(`${response.message}`)
			fetchReviews()
		} catch (error) {
			toast.error(`${error.message}`)
		}
	}

	const handle_check_review = async id => {
		try {
			const response = await check_review(id)
			toast.success(`${response.message}`)
			fetchReviews()
		} catch (error) {
			toast.error(`${error.message}`)
		}
	}

	const handle_unCheck_review = async id => {
		try {
			const response = await uncheck_review(id)
			toast.success(`${response.message}`)
			fetchReviews()
		} catch (error) {
			toast.error(`${error.message}`)
		}
	}

	const handleEditReview = async () => {
		try {
			const response = await update(editingReviewId, { task: editedTask })
			toast.success(`${response.message}`)
			fetchReviews()
			closeEditModal()
		} catch (error) {
			toast.error(`${error.message}`)
		}
	}

	const handleDelete = article => {
		setToDelete(article)
		setShowDeleteModal(true)
	}

	const toggleDeleteModal = () => {
		setShowDeleteModal(!showDeleteModal)
	}

	const handleDeleteCallback = async () => {
		try {
			await fetchData()
		} catch (error) {
			toast.error('Error al cargar articulos.')
		}
	}

	const filtered_articles = articles.filter(articles => articles.title.toLowerCase().includes(searchTerm.toLowerCase()))

	return (
		<>
			<Navbar />

			{loading ? (
				<Spinner />
			) : (
				<>
					<div className='h-screen lg:end-0 lg:start-0 lg:top-0 lg:h-20'>
						<main className='container mx-auto px-4 lg:px-8 xl:max-w-7xl'>
							<div className='md:py-2 lg:py-20 transform transition-all'>
								<div className='flex items-center justify-between mb-4'>
									<div className='flex gap-4 text-md font-semibold text-neutral-500'>
										<span>Artículos ({articles.length})</span>
									</div>
								</div>

								<hr />

								<div className='flex items-center justify-between py-4'>
									<div className='flex text-xs'>
										<div className='flex items-center justify-between gap-4'>
											<select
												value={reportType}
												onChange={e => setReportType(e.target.value)}
												className='p-2 border border-neutral-300 bg-white rounded-md'>
												<option value='all'>Todos</option>
												<option value='category'>Por Categoría</option>
											</select>

											{reportType === 'category' && (
												<select
													value={selectedCategory}
													onChange={e => setSelectedCategory(e.target.value)}
													className='p-2 border border-neutral-300  bg-white rounded-md'>
													<option value=''>Seleccionar Categoría</option>
													{[...new Set(articles.map(item => item.category_name))].map(category => (
														<option key={category} value={category}>
															{category}
														</option>
													))}
												</select>
											)}

											{reportType && (reportType !== 'category' || selectedCategory) && (
												<button
													onClick={() => exportToXLSX()}
													className='flex items-center gap-2 px-4 py-2 text-neutral-50 bg-sky-700 hover:bg-sky-800 rounded-md transition-colors duration-150 font-medium'>
													<BiDownload /> Generar Reporte
												</button>
											)}
										</div>
									</div>

									<SearchInput onSearch={setSearchTerm} />
								</div>

								<div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 text-sm text-neutral-600'>
									{filtered_articles.map(article => (
										<div
											key={article.id_article}
											className='overflow-hidden border border-neutral-200 rounded-lg shadow-sm'>
											<div className='px-4 py-3 flex justify-between items-center border-b border-neutral-200 bg-neutral-50'>
												<span className='font-semibold overflow-hidden overflow-ellipsis whitespace-nowrap'>
													{article.title}
												</span>
											</div>

											<div className='px-4 py-3 flex flex-col gap-2 text-neutral-500 text-xs'>
												<div className='flex items-center gap-1'>
													<BiUser />
													<span>Subido por {article.manager_name}</span>
												</div>
												<div className='flex items-center gap-1'>
													<BiCalendarAlt />
													<span>Subido {formatDate(article.createdAt)}</span>
												</div>

												<div className='flex items-center gap-4 justify-between'>
													<div className='flex items-center gap-1'>
														<BiFoodMenu />
														<span>{article.category_name}</span>
													</div>

													<div className='flex items-center gap-1'>
														<BiShowAlt />
														<span>
															{article.view_count} {article.view_count === 1 ? 'vista' : 'vistas'}
														</span>
													</div>

													<div className='flex items-center gap-1'>
														<BiMessageSquareDetail />
														<span>
															{article.comment_count} {article.comment_count === 1 ? 'comentario' : 'comentarios'}
														</span>
													</div>

													<div className='flex items-center gap-1'>
														<BiBookmark />
														<span>
															{article.collection_count} {article.collection_count === 1 ? 'colección' : 'colecciones'}
														</span>
													</div>
												</div>
											</div>

											<div className='border-t border-neutral-200 flex items-center justify-between'>
												<button
													onClick={() => handle_check_article(article.id_article)}
													className={`px-4 py-2 text-xs text-white rounded-bl-lg transition-colors duration-150 ${
														article.status === 'pendiente'
															? 'bg-orange-600 hover:bg-orange-700'
															: 'bg-green-600 hover:bg-green-700'
													}`}>
													{processingArticleId === article.id_article ? 'Procesando...' : article.status}
												</button>

												<div className='flex'>
													<button
														onClick={() => openReviewModal(article)}
														className='flex items-center border-l border-neutral-200 px-3 py-2 hover:bg-neutral-600 hover:text-neutral-50 transition-colors duration-150'>
														<BiMessageSquareDetail />
													</button>

													<button
														onClick={() => openDetailModal(article)}
														className='flex items-center border-l border-neutral-200 px-3 py-2 hover:bg-neutral-600 hover:text-neutral-50 transition-colors duration-150'>
														<BiShow />
													</button>

													<button
														onClick={() => handleDelete(article)}
														className='flex items-center border-l border-neutral-200 px-3 py-2 rounded-br-lg hover:bg-red-600 hover:text-neutral-50 transition-colors duration-150'>
														<BiTrashAlt />
													</button>
												</div>
											</div>
										</div>
									))}
								</div>
							</div>
						</main>
					</div>

					{selectedArticle && isDetailModalOpen && (
						<div className='fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-neutral-50/30 backdrop-blur-sm'>
							<div className='relative flex w-full max-w-md flex-col items-center justify-center px-4 text-center sm:block sm:p-0 sm:max-w-4xl mx-8'>
								<div className='relative flex flex-col w-full bg-white border border-neutral-300 rounded-lg text-left align-bottom text-neutral-600 transition-all sm:w-full sm:align-middle my-8'>
									{/* Encabezado */}
									<div className='flex items-center justify-between px-4 pt-4'>
										<div className='flex flex-row items-center gap-2 font-medium text-neutral-600'>
											<div className='rounded-md border p-2'>
												<BiShow />
											</div>
											<span>Editar publicación</span>
										</div>

										<div
											onClick={closeDetailModal}
											className='cursor-pointer rounded-md p-1.5 text-lg text-neutral-400 transition-colors duration-150 hover:bg-neutral-100 hover:text-neutral-500'>
											<LuX />
										</div>
									</div>

									<div className='overflow-y-auto p-4 max-h-[calc(100vh-8rem)]'>
										<div className='sm:flex sm:items-start'>
											<div className='text-neutral-600 w-full'>
												<div className='flex flex-col'>
													<div className='text-xs px-4 py-2'>
														<h4 className='font-semibold text-xs mb-2'>Título</h4>
														<span>{selectedArticle.title}</span>
													</div>

													<div className='text-xs px-4 py-2'>
														<h4 className='font-semibold text-xs mb-2'>Autor</h4>
														<span>{selectedArticle.manager_name}</span>
													</div>

													<div className='text-xs px-4 py-2'>
														<h4 className='font-semibold text-xs mb-2'>Resumen</h4>
														<span>{selectedArticle.summary}</span>
													</div>

													<div className='grid grid-cols-2 gap-12'>
														<div className='flex flex-col gap-2'>
															<div className='flex flex-row items-center justify-between'>
																<div className='flex flex-row items-center justify-between'>
																	<div className='text-xs px-4 py-2'>
																		<h4 className='font-semibold text-xs mb-2'>Línea de investigación</h4>
																		<span>{selectedArticle.lineResearch_info.description}</span>
																	</div>
																</div>
															</div>

															<div className='flex flex-row items-center justify-between'>
																<div className='flex flex-row items-center justify-between'>
																	<div className='text-xs px-4 py-2'>
																		<h4 className='font-semibold text-xs mb-2'>Carrera</h4>
																		<span>{selectedArticle.career_info.description}</span>
																	</div>
																</div>
															</div>

															<div className='flex items-center grid-cols-2 justify-between'>
																<div className=''>
																	<div className='text-xs px-4 py-2'>
																		<h4 className='font-semibold text-xs mb-2'>Dependencia</h4>
																		<span>
																			{selectedArticle.field_dependence_info &&
																			selectedArticle.field_dependence_info.length > 0
																				? selectedArticle.field_dependence_info.map((dependence, index) => (
																						<div key={index}>{dependence.name_dependence}</div>
																				  ))
																				: 'No establecido'}
																		</span>
																	</div>

																	<div className='text-xs px-4 py-2'>
																		<h4 className='font-semibold text-xs mb-2'>Campo detallado</h4>
																		<span>
																			{selectedArticle.field_detailed_info &&
																			selectedArticle.field_detailed_info.length > 0
																				? selectedArticle.field_detailed_info.map((detail, index) => (
																						<div key={index}>{detail.name_detailed}</div>
																				  ))
																				: 'No establecido'}
																		</span>
																	</div>

																	<div className='flex flex-row items-center justify-between'>
																		<div className='text-xs px-4 py-2'>
																			<h4 className='font-semibold text-xs mb-2'>Campo específico</h4>
																			<span>
																				{selectedArticle.field_specific_info &&
																				selectedArticle.field_specific_info.length > 0
																					? selectedArticle.field_specific_info.map((detail, index) => (
																							<div key={index}>{detail.name_specific}</div>
																					  ))
																					: 'No establecido'}
																			</span>
																		</div>
																	</div>

																	<div className='flex flex-row items-center justify-between'>
																		<div className='text-xs px-4 py-2'>
																			<h4 className='font-semibold text-xs mb-2'>Campo amplio</h4>
																			<span>
																				{selectedArticle.field_wide_info && selectedArticle.field_wide_info.length > 0
																					? selectedArticle.field_wide_info.map((wide, index) => (
																							<div key={index}>{wide.name_wide}</div>
																					  ))
																					: 'No establecido'}
																			</span>
																		</div>
																	</div>
																</div>
															</div>
														</div>

														<div className='flex flex-col gap-2'>
															{selectedArticle.parameters.map(parameter => (
																<div key={parameter.id_parameter} className='text-xs px-4 py-2'>
																	<h4 className='font-semibold text-xs mb-2'>{parameter.name_parameter}</h4>
																	<span>
																		{parameter.description_parameter
																			? parameter.description_parameter
																			: 'No establecido'}
																	</span>
																</div>
															))}

															{selectedArticle.tags.length > 0 ? (
																selectedArticle.tags.map(tag => (
																	<div key={tag.id_tag} className='text-xs px-4 py-2'>
																		<h4 className='font-semibold text-xs mb-2'>{tag.name_tag}</h4>
																		<span>{tag.description_tag ? tag.description_tag : 'No establecido'}</span>
																	</div>
																))
															) : (
																<></>
															)}
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					)}

					{selectedArticle && isReviewModalOpen && (
						<div className='fixed inset-0 z-50 flex items-center justify-center overflow-y-scroll bg-neutral-50/30 backdrop-blur-sm'>
							<div className='flex w-full max-w-xl flex-col items-end justify-center px-4 text-center sm:block sm:p-0'>
								<div className='transform rounded-lg border border-neutral-300 bg-white text-left align-bottom text-neutral-600 transition-all sm:inline-block sm:w-full sm:max-w-xl sm:align-middle py-4'>
									<div className='flex items-center justify-between px-4'>
										<div className='flex flex-row items-center gap-2 font-medium text-neutral-600'>
											<div className='rounded-md border p-2'>
												<BiShow />
											</div>
											<span>Revisiones del artículo</span>
										</div>

										<div
											onClick={closeReviewModal}
											className='cursor-pointer rounded-md p-1.5 text-lg text-neutral-400 transition-colors duration-150 hover:bg-neutral-100 hover:text-neutral-500'>
											<LuX />
										</div>
									</div>

									<div className='text-md flex flex-col gap-y-1 px-4 py-4 font-semibold text-neutral-600'>
										<div className='flex flex-col gap-y-2 bg-sky-50 px-3 py-2 text-xs font-normal text-sky-700'>
											<div className='flex flex-row items-center gap-1 font-semibold'>
												<LuInfo size={14} />
												<span>Información</span>
											</div>
											<ol className='list-disc pl-4'>
												<li>
													<span>
														Las revisones se envianran al responsable de la publicación, estás sircen para notificar al
														docente que debe hacer cambios.
													</span>
												</li>
											</ol>
										</div>
									</div>

									<div className='bg-white px-4'>
										<textarea
											value={reviewContent}
											onChange={e => setReviewContent(e.target.value)}
											className='border border-neutral-200 bg-neutral-50 rounded-lg p-4 focus:outline-none w-full text-sm text-slate-700'
											rows={3}
											placeholder='Ingresa la revisión...'></textarea>

										<div className='flex justify-end items-center pt-3'>
											<button
												onClick={handleSubmitReview}
												className='px-4 py-1.5 bg-sky-700 text-white hover:bg-sky-800 focus:outline-none rounded-md text-sm'>
												Crear revisión
											</button>
										</div>
									</div>

									<div className='bg-white rounded-b-lg'>
										<div className='text-neutral-500 text-sm px-4 py-1.5 border-neutral-300 mt-4'>
											<h3 className='text-md font-semibold'>Revisiones aprobadas ({reviewsApproved.length})</h3>
										</div>

										<div className='text-neutral-600 text-sm px-4 py-1 border-neutral-300'>
											<div className='max-h-40 overflow-y-auto'>
												{reviewsApproved.length === 0 ? (
													<p className='text-neutral-400 text-xs'>No hay revisiones aprobadas :)</p>
												) : (
													<ul className='space-y-2'>
														{reviewsApproved.map(review => (
															<li key={review.id_review} className='flex justify-between items-center'>
																<div className='flex flex-col'>
																	<span className='text-xs text-neutral-400'>{formatDate(review.createdAt)}</span>
																	<span className='line-through text-sm'>{review.task}</span>
																</div>

																<button
																	onClick={() => handle_unCheck_review(review.id_review)}
																	className='hover:text-red-500 hover:bg-red-100 text-red-400 bg-red-50 p-1.5 rounded-md transition-colors duration-200 border border-red-200'>
																	<BiX size={14} />
																</button>
															</li>
														))}
													</ul>
												)}
											</div>
										</div>

										<div className='text-neutral-500 text-sm px-4 py-1.5 mt-4'>
											<h3 className='text-md font-semibold'>Revisiones pendientes ({reviewsPending.length})</h3>
										</div>

										<div className='text-neutral-600 text-sm px-4 py-1'>
											<div className='max-h-40 overflow-y-auto'>
												{reviewsPending.length === 0 ? (
													<p className='text-neutral-400 text-xs'>No hay revisiones pendientes</p>
												) : (
													<ul className='space-y-2'>
														{reviewsPending.map(review => (
															<li key={review.id_review} className='flex justify-between items-center'>
																<div className='flex flex-col'>
																	<span className='text-xs text-neutral-400'>{formatDate(review.createdAt)}</span>
																	<span className='text-sm'>{review.task}</span>
																</div>

																<div className='flex gap-2'>
																	<button
																		onClick={() => handleDeleteReview(review.id_review)}
																		className='hover:text-red-500 hover:bg-red-100 text-red-400 bg-red-50 p-1.5 rounded-md transition-colors duration-200 border border-red-200'>
																		<BiTrashAlt size={14} />
																	</button>

																	<button
																		onClick={() => openEditModal(review.id_review, review.task)}
																		className='hover:text-slate-500 hover:bg-slate-100 text-slate-400 bg-slate-50 p-1.5 rounded-md transition-colors duration-200 border border-slate-200'>
																		<BiEditAlt size={14} />
																	</button>

																	{editingReviewId && (
																		<div className='fixed inset-0 z-50 overflow-y-auto flex justify-center items-center bg-neutral-50 text-neutral-600'>
																			<div className='bg-neutral-50 w-full max-w-sm rounded-lg border border-neutral-300'>
																				<h2 className='text-md font-semibold px-4 py-1.5'>Editar revisión</h2>

																				<textarea
																					type='text'
																					value={editedTask}
																					onChange={e => setEditedTask(e.target.value)}
																					className='border-b border-t bg-neutral-50 border-neutral-300 px-2 py-1 focus:outline-none focus:border-primary-500 w-full text-sm text-neutral-600'
																					rows={3}
																					placeholder='Editar revisión...'></textarea>

																				<div className='flex justify-end'>
																					<button
																						onClick={closeEditModal}
																						className='px-3 py-1 bg-neutral-100 text-neutral-500 hover:bg-red-400 hover:text-neutral-50 focus:outline-none focus:bg-neutral-400 border-l border-r border-neutral-300 transition-colors duration-200'>
																						No, cancelar
																					</button>

																					<button
																						onClick={handleEditReview}
																						className='px-3 py-1 bg-primary-500 text-white bg-sky-600 hover:bg-sky-700 border-transparent hover:bg-primary-600 focus:outline-none focus:bg-primary-600 transition-colors rounded-br-lg duration-200'>
																						Ok, guardar
																					</button>
																				</div>
																			</div>
																		</div>
																	)}

																	<button
																		onClick={() => handle_check_review(review.id_review)}
																		className='hover:text-green-500 hover:bg-green-100 text-green-400 bg-green-50 p-1.5 rounded-md transition-colors duration-200 border border-green-200'>
																		<BiCheck size={14} />
																	</button>
																</div>
															</li>
														))}
													</ul>
												)}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					)}

					{showDeleteModal && (
						<ModalRemove article={toDelete} onClose={toggleDeleteModal} onRemove={handleDeleteCallback} />
					)}

					<Toaster richColors expand={true} />
				</>
			)}
		</>
	)
}

export { ArticleLayout }
