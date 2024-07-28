import { LuInfo, LuX } from 'react-icons/lu'
import { useEffect, useState } from 'react'
import { BiFile, BiX } from 'react-icons/bi'
import { SpinnerLoading } from '../ui/SpinnerLoading'
import { ButtonLoadingSpinner } from '../ui/ButtomSpinner'

const ModalSelector = ({ initialValues, onSubmit, onClose, translations, loading, loadingData }) => {
	const [selectedCategory, setSelectedCategory] = useState(null)
	const [selectedTags, setSelectedTags] = useState([])
	const [filteredCategories, setFilteredCategories] = useState([])
	const [filteredTags, setFilteredTags] = useState([])
	const [selectedTagsBadgets, setSelectedTagsBadgets] = useState([])
	const [modalOpen, setModalOpen] = useState(false)

	useEffect(() => {
		setModalOpen(true)
	}, [])

	useEffect(() => {
		setFilteredCategories(initialValues.categories)
		setFilteredTags(initialValues.tags)
	}, [initialValues])

	const handleCategoryChange = e => {
		const selectedCategoryId = e.target.value
		setSelectedCategory(selectedCategoryId)
	}

	const handleTagChange = e => {
		const selectedTagIds = Array.from(e.target.selectedOptions, option => option.value)
		const uniqueSelectedTagIds = Array.from(new Set(selectedTagIds)) // Eliminar duplicados

		// Verificar si el tag ya está seleccionado antes de agregarlo
		const newTags = uniqueSelectedTagIds.filter(tagId => !selectedTags.includes(tagId))
		setSelectedTags(prevTags => [...prevTags, ...newTags])

		// Filtrar los nuevos tags seleccionados
		const selectedTagsData = initialValues.tags.filter(tag => newTags.includes(tag.id_tag))
		setSelectedTagsBadgets(prevBadgets => [...prevBadgets, ...selectedTagsData])
	}

	const handleRemoveBadget = tagId => {
		setSelectedTags(prevTags => prevTags.filter(id => id !== tagId))
		setSelectedTagsBadgets(prevBadgets => prevBadgets.filter(tag => tag.id_tag !== tagId))
	}

	const handleSubmit = e => {
		e.preventDefault()
		const formData = {
			id_category: selectedCategory,
			id_tag: selectedTags,
		}
		onSubmit(formData) // Llamar a la función de callback con los datos del formulario
	}

	return (
		<>
			<div
				className={`fixed inset-0 z-50 flex items-center justify-center overflow-y-scroll bg-neutral-50/30 backdrop-blur-sm ${
					modalOpen ? 'opacity-100' : 'opacity-0'
				}`}>
				<div className='flex w-full max-w-md flex-col items-end justify-center px-4 text-center sm:block sm:p-0 bg-white'>
					{loadingData ? (
						<div className='h-screen bg-white flex justify-center items-center'>
							<SpinnerLoading textColor='bg-sky-700' />
						</div>
					) : (
						<div className='transform border border-neutral-300 bg-white text-left align-bottom text-neutral-600 transition-all sm:inline-block sm:w-full sm:max-w-md sm:align-middle rounded-lg'>
							<div className='modal w-auto transition-opacity'>
								<div className='flex items-center justify-between px-4 pt-4'>
									<div className='flex flex-row items-center gap-2 font-medium text-neutral-600'>
										<div className='rounded-md border p-2'>
											<BiFile />
										</div>
										<span>{translations.title}</span>
									</div>

									<div
										onClick={onClose}
										className='cursor-pointer rounded-md p-1.5 text-lg text-neutral-400 transition-colors duration-150 hover:bg-neutral-100 hover:text-neutral-500'>
										<LuX />
									</div>
								</div>

								<div className='text-md flex flex-col gap-y-1 px-4 pt-4 font-semibold text-neutral-600'>
									<div className='flex flex-col gap-y-2 bg-sky-50 px-3 py-2 text-xs font-normal text-sky-700'>
										<div className='flex flex-row items-center gap-1 font-semibold'>
											<LuInfo size={15} />
											<span>Información</span>
										</div>
										<span>{translations.info}</span>
									</div>
								</div>

								<form onSubmit={onSubmit} className='flex flex-col gap-y-2 px-4 text-xs text-neutral-600'>
									<div className='grid grid-cols-1 gap-x-4 gap-y-3 pt-2 font-medium'>
										<div className='flex flex-col gap-y-2'>
											<div>
												<label className='text-neutral-600'>Categoria</label>
												<span className='text-red-600'>*</span>
											</div>
											<select
												id='categories'
												value={selectedCategory || ''}
												onChange={handleCategoryChange}
												className='rounded-md border border-neutral-300 bg-white p-2 font-medium text-neutral-700 outline-none placeholder:text-neutral-400'>
												<option value='' disabled>
													Seleccione una categoria
												</option>
												{filteredCategories.map(category => (
													<option key={category.id_category} value={category.id_category}>
														{category.name}
													</option>
												))}
											</select>
										</div>
									</div>

									<div className='grid grid-cols-1 gap-x-4 gap-y-3 pt-2 font-medium'>
										<div className='flex flex-col gap-y-2'>
											<div>
												<label className='text-neutral-600'>Etiquetas</label>
												<span className='text-red-600'>*</span>
											</div>
											<select
												id='tags'
												multiple
												value={selectedTags}
												onChange={handleTagChange}
												className='text-neutral-500 bg-white rounded-md block w-full border border-neutral-300 focus:outline-none focus:border-neutral-300 cursor-pointer text-xs font-medium'>
												{filteredTags.map(tag => (
													<option
														key={tag.id_tag}
														value={tag.id_tag}
														className='hover:bg-neutral-200 hover:text-neutral-800 p-2 transition-colors duration-100'>
														{tag.name}
													</option>
												))}
											</select>
										</div>
									</div>

									<span className='text-neutral-600 font-medium pt-2'>Etiquetas seleccionadas</span>
									{selectedTagsBadgets.length === 0 ? (
										<p className='text-neutral-400'>No has seleccionado ninguna etiqueta.</p>
									) : (
										<div className='flex flex-wrap gap-4 pt-2'>
											{selectedTagsBadgets.map(tag => (
												<div
													onClick={() => handleRemoveBadget(tag.id_tag)}
													key={tag.id_tag}
													className='bg-neutral-50 text-xs text-neutral-500 rounded-md font-medium border border-neutral-300 px-2 py-1 flex items-center justify-between hover:bg-red-400 hover:border-red-300 cursor-pointer hover:text-neutral-50 transition-colors duration-200'>
													<span className='mr-1'>{tag.name}</span>
													<BiX className='cursor-pointer' />
												</div>
											))}
										</div>
									)}

									<div className='flex flex-col justify-between gap-4 py-4 text-xs font-semibold sm:flex-row'>
										<button
											type='button'
											onClick={onClose}
											className='mt-2 inline-flex w-full justify-center rounded-md border border-neutral-300 px-4 py-2 font-medium text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-600 focus:outline-none sm:mt-0'>
											{translations.buttonCancel}
										</button>

										<button
											type='submit'
											disabled={loading}
											onClick={handleSubmit}
											className={`mt-2 inline-flex w-full justify-center rounded-md border border-transparent bg-sky-800 px-4 py-2 font-medium text-neutral-50 hover:bg-sky-900 focus:outline-none sm:mt-0 ${
												loading ? 'cursor-not-allowed' : ''
											}`}>
											{loading ? <ButtonLoadingSpinner loadingText='Procesando...' /> : translations.buttonSubmit}
										</button>
									</div>
								</form>
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	)
}

export { ModalSelector }
