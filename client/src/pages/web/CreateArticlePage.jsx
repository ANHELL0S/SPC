import { Toaster, toast } from 'sonner'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BarLeft } from '../../components/BarLeft'
import { BarRight } from '../../components/BarRight'
import { BottomBar } from '../../components/BarDown'
import { Spinner } from '../../components/ui/spinner'
import { useAllCareer } from '../../hooks/useCareer'
import { useAllField_dependence } from '../../hooks/useFieldDependence'
import { useAllField_detailed } from '../../hooks/useFieldDetailed'
import { useAllField_specific } from '../../hooks/useFieldSpecific'
import { useAllField_wide } from '../../hooks/useFieldWide'
import { create } from '../../services/api/article.api'
import { BiCollection, BiDetail, BiInfoCircle } from 'react-icons/bi'
import { useAllLineResearch } from '../../hooks/useLineResearch'
import { fetch as fetchTemplate } from '../../services/api/template.api'
import { ButtonLoadingSpinner } from '../../components/ui/ButtomSpinner'
import { participationOptions } from '../../constants/conts'
import { Tooltip as ReactTooltip } from 'react-tooltip'

const CreateArticlePage = () => {
	const navigate = useNavigate()
	const [loading, setLoading] = useState(false)
	const [submitloading, setSubmitLoading] = useState(false)
	const [categories, setCategories] = useState([])
	const [selectedTags, setSelectedTags] = useState([])
	const [descriptions, setDescriptions] = useState({})

	const [selectedFieldDetailed, setSelectedFieldDetailed] = useState('')
	const [selectedFieldSpecific, setSelectedFieldSpecific] = useState('')
	const [selectedFieldWide, setSelectedFieldWide] = useState('')
	const [selectedFieldDependence, setSelectedFieldDependence] = useState('')

	const [selectedCategory, setSelectedCategory] = useState('')
	const [selectedParameter, setSelectedParameter] = useState([])
	const [selectedLineResearch, setSelectedLineResearch] = useState('')
	const [selectedCareer, setSelectedCareer] = useState('')
	const [descriptionsParameter, setDescriptionsParameter] = useState({})
	const [selectedParticipation, setSelectedParticipation] = useState('')

	const { career } = useAllCareer()
	const { field_dependence } = useAllField_dependence()
	const { field_detailed } = useAllField_detailed()
	const { field_specific } = useAllField_specific()
	const { field_wide } = useAllField_wide()

	const { lineResearch } = useAllLineResearch()

	const [title, setTitle] = useState('')
	const [summary, setSummary] = useState('')

	useEffect(() => {
		fetchData()
	}, [])

	const fetchData = async () => {
		setLoading(true)
		try {
			const data = await fetchTemplate()
			setCategories(data)
		} catch (error) {
		} finally {
			setLoading(false)
		}
	}

	const handleSubmit = async () => {
		setSubmitLoading(true)
		try {
			const categoryId = categories.find(category => category.category_name === selectedCategory)?.id_category_fk
			const selectedCategoryData = categories.find(category => category.category_name === selectedCategory)
			const idTemplate = selectedCategoryData ? selectedCategoryData.id_template : null
			const tagIds = selectedTags.map(tag => tag.id_tag_fk)
			const parameterIds = selectedParameter.map(parameter => parameter.id_parameter)

			const articleData = {
				id_template_fk: idTemplate,
				id_category_fk: categoryId,
				title: title,
				summary: summary,
				participation: selectedParticipation,
				id_parameter_fk: parameterIds,
				id_tag_fk: tagIds,
				descriptions: descriptions,
				descriptions_parameter: descriptionsParameter,
				id_career: selectedCareer,
				id_field_dependence: selectedFieldDependence,
				id_field_detailed: selectedFieldDetailed,
				id_field_specific: selectedFieldSpecific,
				id_field_wide: selectedFieldWide,
				id_line_research: selectedLineResearch,
			}

			const response = await create(articleData)
			toast.success(`${response.message}`)
			navigate('/artículos')
		} catch (error) {
			toast.error(`${error.message}`)
		} finally {
			setSubmitLoading(false)
		}
	}

	const handleCategorySelect = category_name => {
		setSelectedCategory(category_name)
		const selectedCategoryData = categories.find(category => category.category_name === category_name)
		if (selectedCategoryData) {
			setSelectedTags(selectedCategoryData.tags)
			setSelectedParameter(selectedCategoryData.parameter)
		} else {
			setSelectedTags([])
		}
	}

	const handleDescriptionChange = (tagId, description) => {
		setDescriptions(prevState => ({
			...prevState,
			[tagId]: description,
		}))
	}

	const handleDescriptionParameterChange = (tagParameter, description) => {
		setDescriptionsParameter(prevState => ({
			...prevState,
			[tagParameter]: description,
		}))
	}

	const handleParticipationChange = participation => setSelectedParticipation(participation)
	const handleLineResearchChange = selectedLineResearch => setSelectedLineResearch(selectedLineResearch)
	const handleFieldDetailedChange = selectedFieldDetailed => setSelectedFieldDetailed(selectedFieldDetailed)
	const handleFieldSpecificChange = selectedFieldSpecific => setSelectedFieldSpecific(selectedFieldSpecific)
	const handleFieldWideChange = selectedFieldWide => setSelectedFieldWide(selectedFieldWide)
	const handleFieldDependenceChange = selectedFieldDependence => setSelectedFieldDependence(selectedFieldDependence)
	const handleCareerChange = selectedCareer => setSelectedCareer(selectedCareer)

	return (
		<>
			<BarLeft />
			<BarRight />
			<BottomBar />

			<main className='px-4 max-w-5xl mx-auto text-start justify-start my-2 text-slate-700 text-sm pb-12'>
				{loading ? (
					<Spinner />
				) : (
					<>
						<div className='py-4 text-slate-600 text-lg font-semibold flex flex-col gap-y-1'>
							<span>Subir publicación</span>
							<div className='text-md flex flex-col gap-y-1 py-4 font-semibold text-neutral-600'>
								<div className='flex flex-col gap-y-2 rounded-md border border-sky-200 bg-sky-50 p-4 text-xs font-normal text-sky-700'>
									<div className='flex flex-row items-center gap-1 font-semibold'>
										<BiInfoCircle size={14} />
										<span>Información</span>
									</div>
									<ol className='flex list-disc flex-col gap-y-2 pl-4'>
										<li>
											<span>
												Cada tipo de publicación <strong>tiene sus propios parámetros y requisitos</strong>. Asegúrate
												de cumplirlos al seleccionar el tipo de publicación.
											</span>
											<span>
												Asegúrate de que el <strong>tipo de publicación</strong> sea la adecuada para el contenido de tu
												publicaión.
											</span>
										</li>

										<li>
											<span>
												Para su respectiva aprobación, tu publicación deberá pasar por el
												<strong> proceso de revisión y aprobación</strong>.
											</span>
										</li>
									</ol>
								</div>
							</div>
						</div>

						<div className='flex flex-col gap-y-2 text-xs text-slate-700'>
							<label htmlFor='categorySelect' className='block font-medium'>
								Selecciona el tipo de ṕublicación:
							</label>

							<select
								id='categorySelect'
								className='block w-full px-4 py-2 mt-1 border bg-white rounded-lg focus:outline-none focus:border-blue-400'
								onChange={e => handleCategorySelect(e.target.value)}
								value={selectedCategory}>
								<option value='' disabled>
									Selecciona una categoría
								</option>
								{categories.map((category, index) => (
									<option key={index} value={category.category_name}>
										{category.category_name}
									</option>
								))}
							</select>
						</div>

						{selectedCategory && (
							<div className='flex flex-col gap-y-2 text-xs text-slate-600 pt-2 my-6'>
								<div className='text-slate-600 text-md font-semibold flex flex-col gap-y-1 pb-4'>
									<div className='flex items-center justify-between'>
										<div className='flex flex-row items-center gap-2 font-semibold text-lg text-slate-500'>
											<div className='rounded-lg border p-2'>
												<BiCollection />
											</div>
											<span>Formulario de la publicación</span>
										</div>
									</div>
								</div>

								<div className='grid grid-cols-1 gap-x-4 gap-y-3'>
									<div className='flex flex-col gap-y-2'>
										<label className='text-slate-700'>
											Título <span className='text-red-500'>*</span>
										</label>
										<input
											type='text'
											value={title}
											onChange={e => setTitle(e.target.value)}
											className='border border-neutral-300 rounded-lg p-2 text-slate-500'
											placeholder='Título del artículo'
										/>
									</div>
								</div>

								<div className='grid grid-cols-1 gap-x-4 gap-y-3 pt-2'>
									<div className='flex flex-col gap-y-2'>
										<label className='text-slate-700'>
											Resumen <span className='text-red-500'>*</span>
										</label>
										<textarea
											value={summary}
											onChange={e => setSummary(e.target.value)}
											className='border border-neutral-300 rounded-lg p-2 text-slate-500'
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

								<div className='grid grid-cols-2 gap-4 pt-4'>
									<div className='grid grid-cols-2 gap-4'>
										<div className='flex flex-col gap-1'>
											<label className='text-slate-700'>
												Campo especifíco <span className='text-red-500'>*</span>
											</label>
											<div className='w-full'>
												<select
													id='fieldSpecificSelect'
													className='block w-full px-4 py-2 mt-1 border border-neutral-300 bg-white rounded-lg focus:outline-none focus:border-blue-400'
													value={selectedFieldSpecific}
													onChange={e => handleFieldSpecificChange(e.target.value)}>
													<option value='' disabled hidden>
														Seleccione un campo específico
													</option>
													{field_specific.map((indexItem, index) => (
														<option key={index} value={indexItem.id_field_specific}>
															{indexItem.name}
														</option>
													))}
												</select>
											</div>
										</div>

										<div className='flex flex-col gap-1'>
											<label className='text-slate-700'>
												Campo amplio <span className='text-red-500'>*</span>
											</label>
											<div className='w-full'>
												<select
													id='fieldWideSelect'
													className='block w-full px-4 py-2 mt-1 border border-neutral-300 bg-white rounded-lg focus:outline-none focus:border-blue-400'
													value={selectedFieldWide}
													onChange={e => handleFieldWideChange(e.target.value)}>
													<option value='' disabled hidden>
														Seleccione un campo amplio
													</option>
													{field_wide.map((indexItem, index) => (
														<option key={index} value={indexItem.id_field_wide}>
															{indexItem.name}
														</option>
													))}
												</select>
											</div>
										</div>
									</div>

									<div className='grid grid-cols-2 gap-4'>
										<div className='flex flex-col gap-1'>
											<label className='text-slate-700'>
												Carrera <span className='text-red-500'>*</span>
											</label>
											<select
												id='careerSelect'
												className='block w-full px-4 py-2 mt-1 border border-neutral-300 bg-white rounded-lg focus:outline-none focus:border-blue-400'
												value={selectedCareer}
												onChange={e => handleCareerChange(e.target.value)}>
												<option value='' disabled hidden>
													Seleccione una carrera
												</option>
												{career.map((indexItem, index) => (
													<option key={index} value={indexItem.id_career}>
														{indexItem.name}
													</option>
												))}
											</select>
										</div>

										<div className='flex flex-col gap-1'>
											<label className='text-slate-700'>
												Participación <span className='text-red-500'>*</span>
											</label>

											<select
												id='participationSelect'
												className='block w-full px-4 py-2 mt-1 border border-neutral-300 bg-white rounded-lg focus:outline-none focus:border-blue-400'
												onChange={e => handleParticipationChange(e.target.value)}
												value={selectedParticipation}>
												<option value='' disabled>
													Selecciona tu participación
												</option>
												{participationOptions.map((participation, i) => (
													<option key={i} value={participation}>
														{participation}
													</option>
												))}
											</select>
										</div>
									</div>
								</div>

								<div className='text-slate-600 pt-8'>
									<div className='text-slate-600 text-md font-semibold flex flex-col gap-y-1 pb-4'>
										<div className='flex items-center justify-between'>
											<div className='flex flex-row items-center gap-2 font-semibold text-lg text-slate-500'>
												<div className='rounded-lg border p-2'>
													<BiDetail />
												</div>
												<span>Información adicional de la publicación</span>
											</div>
										</div>
									</div>

									<div className='grid grid-cols-1 gap-y-4 pt-2 md:grid-cols-4 md:gap-x-4 md:gap-y-2'>
										{/* Parámetros */}
										{selectedParameter.map((parameter, index) => (
											<div key={index} className='flex flex-col gap-y-2 mt-2'>
												<label htmlFor={`parameter_${index}`} className='text-slate-700 flex items-center gap-2'>
													{parameter.name_parameter}
													<BiInfoCircle
														size={16}
														data-tooltip-id='parameter-tooltip'
														data-tooltip-content={parameter.param_descripction}
													/>
													<span className='text-gray-700'>*</span>
												</label>
												<input
													type='text'
													id={`parameter_${index}`}
													name={`parameter_${index}`}
													value={parameter.description_parameter}
													onChange={e => handleDescriptionParameterChange(parameter.id_parameter, e.target.value)}
													className='border border-neutral-300 rounded-lg p-2 text-slate-500'
													placeholder={`${parameter.name_parameter} del artículo`}
												/>
											</div>
										))}

										<ReactTooltip id='parameter-tooltip' />

										{/* Etiquetas */}
										{selectedTags.length > 0 &&
											selectedTags.map((tag, index) => (
												<div key={index} className='flex flex-col gap-y-2 mt-2'>
													<label htmlFor={`tag_${index}`} className='text-slate-700 flex items-center gap-2'>
														{tag.tag_name}
														<BiInfoCircle
															size={16}
															data-tooltip-id='parameter-tooltip'
															data-tooltip-content={tag.tag_descripction}
														/>
														<span className='text-gray-700'>*</span>
													</label>
													<input
														type='text'
														id={`tag_${index}`}
														name={`tag_${index}`}
														onChange={e => handleDescriptionChange(tag.id_tag_fk, e.target.value)}
														className='border border-neutral-300 rounded-lg p-2 text-slate-500'
														placeholder={`${tag.tag_name} del artículo`}
													/>
												</div>
											))}
										<ReactTooltip id='tag-tooltip' />
									</div>
								</div>

								<div className='flex justify-between py-4 font-semibold gap-4'>
									<button
										onClick={handleSubmit}
										className={`flex-1 px-4 bg-sky-700 text-white rounded-lg hover:bg-sky-800 transition-colors duration-150 disabled:opacity-50 inline-flex h-10 items-center justify-center hover:text-white hover:ring hover:ring-white disabled:pointer-events-none ${
											submitloading ? 'cursor-not-allowed' : ''
										}`}>
										{submitloading ? <ButtonLoadingSpinner loadingText='Subiendo artículo...' /> : 'Subir artículo'}
									</button>
								</div>
							</div>
						)}
					</>
				)}
			</main>

			<Toaster richColors expand={true} />
		</>
	)
}

export { CreateArticlePage }
