import { Toaster, toast } from 'sonner'
import { useState, useEffect } from 'react'
import { filterData } from '../../utils/search.util'
import { Table } from '../../components/table/Table'
import { useAllTemplate } from '../../hooks/useTemplate'
import Navbar from '../../components/Navbar'
import { formatDate } from '../../utils/dataFormater.utils'
import { Spinner } from '../../components/ui/spinner'
import { SearchBar } from '../../components/inputs/SearchBar'
import { fetch, removeTags } from '../../services/api/template.api'
import { LuFile, LuInfo, LuPlus, LuPrinter, LuTrash, LuX } from 'react-icons/lu'
import { ModalCreate, ModalRemove, ModalUpdate } from '../../components/form/FormsTemplate'
import { BiBookmarks, BiPlus } from 'react-icons/bi'
import { ButtonLoadingSpinner } from '../../components/ui/ButtomSpinner'

const TemplateLayout = () => {
	const [search, setSearch] = useState('')
	const [selected, setSelected] = useState(null)
	const [selectedTags, setSelectedTags] = useState([])
	const [showCreateModal, setShowCreateModal] = useState(false)
	const [showUpdateModal, setShowUpdateModal] = useState(false)
	const [showDeleteModal, setShowDeleteModal] = useState(false)
	const [selectedCategory, setSelectedCategory] = useState(null)
	const [showTagDetailsModal, setShowTagDetailsModal] = useState(false)
	const { template, loading, error, setTemplate } = useAllTemplate()
	const [loadingTag, setLoadingTag] = useState(false)

	const handleSearch = value => {
		setSearch(value.toLowerCase())
	}

	useEffect(() => {
		fetchData()
	}, [])

	const fetchData = async () => {
		try {
			const data = await fetch()
			setTemplate(data)
		} catch (error) {}
	}

	const handleCloseTagDetailsModal = () => {
		setShowTagDetailsModal(false)
	}

	// Create
	const handleCreate = () => {
		setShowCreateModal(true)
	}

	const toggleCreateModal = () => {
		setShowCreateModal(!showCreateModal)
	}

	const handleCreateCallback = async () => {
		await fetchData()
	}

	// Update
	const handleShowTagDetails = template => {
		setSelectedTags(template.tags)
		setSelectedCategory({ categoryId: template.id_category_fk, categoryName: template.categoryName })
		setShowTagDetailsModal(true)
	}

	const handleUpdate = template => {
		setSelectedCategory(template.id_template)
		setSelected(template)
		const tagsOfSelectedTemplate = template.tags
		setSelectedTags(tagsOfSelectedTemplate)
		setShowUpdateModal(true)
	}

	const toggleUpdateModal = () => {
		setShowUpdateModal(!showUpdateModal)
	}

	const handleUpdateCallback = async () => {
		await fetchData()
	}

	// Delete
	const handleDelete = template => {
		setSelected(template)
		setShowDeleteModal(true)
	}

	const toggleDeleteModal = () => {
		setShowDeleteModal(!showDeleteModal)
	}

	const handleDeleteCallback = async () => {
		await fetchData()
	}

	const handleTagDelete = async id_relation_tag_template => {
		try {
			const response = await removeTags(id_relation_tag_template)
			const updatedTags = selectedTags.filter(tag => tag.id_relation_tag_template !== id_relation_tag_template)
			setSelectedTags(updatedTags)
			toast.success(`${response.message}`)
			setLoadingTag(true)
			await fetchData()
		} catch (error) {
			toast.error(`${error.message}`)
			setLoadingTag(false)
		}
	}

	const filteredData = filterData(template, search, ['category_name'])

	const columns = [
		{
			name: 'Nombre',
			selector: row => row.category_name,
			sortable: true,
			minWidth: '250px',
			cell: row => (
				<div className='text-xs text-neutral-500 flex flex-col gap-y-1'>
					<span>{row.category_name}</span>
				</div>
			),
		},
		{
			name: '# etiquetas',
			selector: row => row.tags,
			sortable: true,
			minWidth: '200px',
			cell: row => <div className='text-xs text-neutral-500'>{row.tags.length}</div>,
		},
		{
			name: '# parametros',
			selector: row => row.parameter,
			sortable: true,
			minWidth: '200px',
			cell: row => <div className='text-xs text-neutral-500'>{row.parameter.length}</div>,
		},
		{
			name: 'Creado',
			selector: row => row.createdAt,
			sortable: true,
			minWidth: '200px',
			cell: row => <div className='text-xs text-neutral-500'>{formatDate(row.createdAt)}</div>,
		},
		{
			name: 'Actualizado',
			selector: row => row.updatedAt,
			sortable: true,
			minWidth: '200px',
			cell: row => <div className='text-xs text-neutral-500'>{formatDate(row.updatedAt)}</div>,
		},
		{
			name: '',
			minWidth: '0px',
			cell: template => (
				<div className='flex justify-end gap-2 text-neutral-500'>
					<button
						onClick={() => handleShowTagDetails(template)}
						className='rounded-lg border border-neutral-300 p-1 transition-colors duration-150 hover:border-neutral-700 hover:bg-neutral-700 hover:text-neutral-50'>
						<BiBookmarks size={12} />
					</button>

					<button
						onClick={() => handleUpdate(template)}
						className='rounded-md border border-neutral-300 p-1 transition-colors duration-150 hover:border-neutral-700 hover:bg-neutral-700 hover:text-neutral-50'>
						<BiPlus size={12} />
					</button>

					<button
						onClick={() => handleDelete(template)}
						className='rounded-md border border-red-300 bg-red-50 p-1 text-red-400 transition-colors duration-150 hover:bg-red-300 hover:text-neutral-50'>
						<LuTrash size={12} />
					</button>
				</div>
			),
		},
	]

	return (
		<>
			<Navbar />

			{loading ? (
				<Spinner />
			) : (
				<>
					<main className='container mx-auto px-4 lg:px-8 xl:max-w-7xl mt-20'>
						<div className='flex flex-col gap-4 gap-x-20'>
							<div className='flex items-center justify-between'>
								<div className='flex gap-4 text-md font-semibold text-neutral-500'>
									<span>Formatos de artículos ({template.length})</span>
								</div>
							</div>

							<hr />

							<div className='flex items-center justify-between'>
								<div className='flex gap-4 text-xs'>
									<button
										className='flex items-center gap-2 rounded bg-sky-800 px-3 py-1.5 font-semibold text-neutral-50 transition-colors duration-150 hover:bg-sky-900'
										onClick={handleCreate}>
										<LuPlus />
										Nuevo
									</button>
								</div>

								<SearchBar onSearch={handleSearch} />
							</div>

							<div className='overflow-scroll'>
								<Table columns={columns} data={filteredData} />
							</div>
						</div>

						{showCreateModal && (
							<ModalCreate template={selected} onClose={toggleCreateModal} onCreate={handleCreateCallback} />
						)}

						{showUpdateModal && (
							<ModalUpdate
								onClose={toggleUpdateModal}
								onUpdate={handleUpdateCallback}
								template={{ id_template: selectedCategory, tags: selectedTags }}
							/>
						)}

						{showDeleteModal && (
							<ModalRemove onClose={toggleDeleteModal} onRemove={handleDeleteCallback} template={selected} />
						)}

						{showTagDetailsModal && (
							<div className='fixed inset-0 z-50 flex items-center justify-center overflow-y-scroll bg-neutral-50/30 backdrop-blur-sm'>
								<div className='transform border border-neutral-300 bg-white text-left align-bottom text-neutral-600 transition-all sm:inline-block sm:w-full sm:max-w-md sm:align-middle rounded-lg'>
									<div className='flex items-center justify-between px-4 pt-4'>
										<div className='flex flex-row items-center gap-2 font-medium text-neutral-600'>
											<div className='rounded-md border p-2'>
												<BiBookmarks />
											</div>
											<span>Etiquetas del formato</span>
										</div>

										<div
											onClick={handleCloseTagDetailsModal}
											className='cursor-pointer rounded-md p-1.5 text-lg text-neutral-400 transition-colors duration-150 hover:bg-neutral-100 hover:text-neutral-500'>
											<LuX />
										</div>
									</div>

									<div className='text-md flex flex-col gap-y-1 px-4 pt-4 font-semibold text-neutral-600'>
										<div className='flex flex-col gap-y-2 bg-orange-50 px-3 py-2 text-xs font-normal text-orange-700'>
											<div className='flex flex-row items-center gap-1 font-semibold'>
												<LuInfo size={15} />
												<span>Información</span>
											</div>
											<span>
												Ten en cuenta, si borras una etiqueta tambien estaras borrando los registros de los artículos
												que usen dicha etiqueta asociada a este formato.
											</span>
										</div>
									</div>

									<ul className='divide-y divide-neutral-300 p-4'>
										{selectedTags.map(tag => (
											<li key={tag.id_relation_tag_template} className='py-2 flex items-center justify-between'>
												<div className='flex items-center'>
													<span className='text-sm text-neutral-700'>{tag.tag_name}</span>
													<span className='ml-2 text-xs text-neutral-500'>{tag.description}</span>
												</div>

												<button
													onClick={() => handleTagDelete(tag.id_relation_tag_template)}
													className={`flex items-center justify-center text-neutral-500 hover:text-neutral-50 transition-colors duration-200 hover:bg-red-300 p-1.5 rounded-full disabled:pointer-events-none ${
														loadingTag ? 'cursor-not-allowed' : ''
													}`}>
													{loadingTag ? <ButtonLoadingSpinner textColor='text-neutral-600' /> : <LuTrash size={14} />}
												</button>
											</li>
										))}
									</ul>

									{selectedTags.length === 0 && (
										<div className='px-4 pb-8 text-sm font-medium text-neutral-400'>
											Actualmente no tienes asigandas etiquetas a este formato.
										</div>
									)}
								</div>
							</div>
						)}

						<Toaster position='bottom-right' reverseOrder={false} richColors />
					</main>
				</>
			)}
		</>
	)
}

export { TemplateLayout }
