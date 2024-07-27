import { BiFile, BiListUl, BiX } from 'react-icons/bi'
import React, { useEffect, useState } from 'react'
import { SpinnerLoading } from '../ui/SpinnerLoading'
import { ButtonLoadingSpinner } from '../ui/ButtomSpinner'
import { LuInfo, LuX } from 'react-icons/lu'

const ModalSelectorUpdate = ({
	initialValues,
	onSubmit,
	onClose,
	translations,
	colors,
	associatedTags,
	loading,
	loadingData,
}) => {
	const [selectedTags, setSelectedTags] = useState([])
	const [filteredTags, setFilteredTags] = useState([])
	const [selectedTagsBadgets, setSelectedTagsBadgets] = useState([])
	const [modalOpen, setModalOpen] = useState(false)
	const [deletedTags, setDeletedTags] = useState([])

	useEffect(() => {
		setModalOpen(true)
	}, [])

	useEffect(() => {
		// Actualizar las etiquetas filtradas cuando cambian las etiquetas asociadas
		setFilteredTags(associatedTags)
	}, [associatedTags])

	const handleTagChange = e => {
		const selectedTagIds = Array.from(e.target.selectedOptions, option => option.value)
		const uniqueSelectedTagIds = Array.from(new Set(selectedTagIds)) // Eliminar duplicados

		// Verificar si el tag ya está seleccionado antes de agregarlo
		const newTags = uniqueSelectedTagIds.filter(tagId => !selectedTags.includes(tagId))

		setSelectedTags(prevTags => [...prevTags, ...newTags]) // Mantener todas las etiquetas seleccionadas

		// Filtrar los nuevos tags seleccionados directamente en initialValues
		const selectedTagsData = initialValues.filter(tag => newTags.includes(tag.id_tag))
		setSelectedTagsBadgets(prevBadgets => [...prevBadgets, ...selectedTagsData])
	}

	const handleRemoveBadget = tagId => {
		setSelectedTags(prevTags => prevTags.filter(id => id !== tagId))
		setSelectedTagsBadgets(prevBadgets => prevBadgets.filter(tag => tag.id_tag !== tagId))

		// Verificar si la etiqueta ya ha sido eliminada antes de agregarla
		if (!deletedTags.includes(tagId)) {
			setDeletedTags(prevDeletedTags => [...prevDeletedTags, tagId]) // Utilizando prevDeletedTags aquí
		}
	}

	const handleSubmit = async e => {
		e.preventDefault()
		const formData = {
			id_tag: selectedTags,
		}
		onSubmit(formData)
	}

	// Obtener los ID de las etiquetas actuales
	const currentTagIds = associatedTags.map(tag => tag.id_tag_fk)

	// Filtrar las etiquetas iniciales basadas en los ID de las etiquetas actuales
	const availableTags = initialValues.filter(tag => !currentTagIds.includes(tag.id_tag))

	return (
		<>
			<div
				className={`fixed inset-0 z-50 flex items-center justify-center overflow-y-scroll bg-neutral-50/30 backdrop-blur-sm ${
					modalOpen ? 'opacity-100' : 'opacity-0'
				}`}>
				<div className='flex w-full max-w-md flex-col items-end justify-center px-4 text-center sm:block sm:p-0 bg-white'>
					{loadingData ? (
						<SpinnerLoading textColor='bg-sky-700' />
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

								<div className='text-xs flex flex-col gap-y-1 px-4 pt-4 text-neutral-600 font-medium'>
									<span className='text-left block mb-2'>Etiquetas actuales</span>
									{associatedTags.length === 0 ? (
										<span className='text-neutral-400 text-xs'>No hay etiquetas asociadas a este formato.</span>
									) : (
										<div className='flex flex-wrap gap-4'>
											{associatedTags.map(tag => (
												<div
													key={tag.id_tag}
													className='bg-neutral-50 text-neutral-500 rounded-md text-xs py-1 font-medium border border-neutral-300 px-2 flex items-center'>
													<span className='mr-1'>{tag.tag_name}</span>
												</div>
											))}
										</div>
									)}
								</div>

								<form onSubmit={handleSubmit} className='flex flex-col gap-y-2 px-4 text-xs text-neutral-600 mt-4'>
									<div className='mb-4'>
										<label htmlFor='tags' className='block mb-2 text-xs font-medium text-neutral-600'>
											Seleccionar etiquetas:
										</label>

										<select
											id='tags'
											className='ttext-neutral-500 bg-white rounded-md block w-full border border-neutral-300 focus:outline-none focus:border-neutral-300 cursor-pointer text-xs font-medium'
											multiple
											value={selectedTags}
											onChange={handleTagChange}>
											{availableTags.length === 0 ? (
												<option disabled>No hay etiquetas disponibles</option>
											) : (
												availableTags.map(tag => (
													<option
														key={tag.id_tag}
														value={tag.id_tag}
														className='hover:bg-neutral-100 hover:text-neutral-600 p-2 transition-colors duration-100'>
														{tag.name}
													</option>
												))
											)}
										</select>
									</div>

									<span className='text-neutral-600 font-medium'>Etiquetas seleccionadas</span>
									{selectedTags.length === 0 ? (
										<p className='text-neutral-400'>No has seleccionado ninguna etiqueta.</p>
									) : (
										<div className='flex flex-wrap gap-4'>
											{selectedTags.map(tagId => {
												const tag = initialValues.find(tag => tag.id_tag === tagId)
												return (
													<div
														key={tag.id_tag}
														onClick={() => handleRemoveBadget(tag.id_tag)}
														className='bg-neutral-50 text-xs text-neutral-500 rounded-md font-medium border border-neutral-300 px-2 py-1 flex items-center justify-between hover:bg-red-400 hover:border-red-300 cursor-pointer hover:text-neutral-50 transition-colors duration-200'>
														<span className='mr-1'>{tag.name}</span>
														<BiX className='cursor-pointer' />
													</div>
												)
											})}
										</div>
									)}

									<div className='flex flex-col justify-between gap-4 py-4 text-xs font-semibold sm:flex-row'>
										<button
											type='button'
											onClick={onClose}
											className='mt-2 inline-flex w-full justify-center rounded-md border border-neutral-300 px-4 py-2 font-medium text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-600 focus:outline-none sm:mt-0'>
											{translations.cancel}
										</button>

										<button
											type='submit'
											disabled={loading}
											onClick={handleSubmit}
											className={`mt-2 inline-flex w-full justify-center rounded-md border border-transparent bg-sky-800 px-4 py-2 font-medium text-neutral-50 hover:bg-sky-900 focus:outline-none sm:mt-0 ${
												loading ? 'cursor-not-allowed' : ''
											}`}>
											{loading ? <ButtonLoadingSpinner loadingText='Procesando...' /> : translations.submit}
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

export { ModalSelectorUpdate }
