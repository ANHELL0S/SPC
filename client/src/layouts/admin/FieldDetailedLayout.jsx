import { Toaster } from 'sonner'
import { useState, useEffect } from 'react'
import { filterData } from '../../utils/search.util'
import { Table } from '../../components/table/Table'
import { useAllField_detailed } from '../../hooks/useFieldDetailed'
import Navbar from '../../components/Navbar'
import { formatDate } from '../../utils/dataFormater.utils'
import { Spinner } from '../../components/ui/spinner'
import { SearchBar } from '../../components/inputs/SearchBar'
import { LuFile, LuPencilLine, LuPlus, LuPrinter, LuTrash } from 'react-icons/lu'
import { getAll_field_detailed_Request } from '../../services/api/field_detailed.api'
import { ModalCreate, ModalUpdate, ModalRemove } from '../../components/form/FormsFieldDetailed'

const FieldDetailedLayout = () => {
	const [search, setSearch] = useState('')
	const { field_detailed, loading, error, setField_detailed } = useAllField_detailed()
	const [showCreateModal, setShowCreateModal] = useState(false)
	const [showUpdateModal, setShowUpdateModal] = useState(false)
	const [showDeleteModal, setShowDeleteModal] = useState(false)
	const [selected, setSelected] = useState(null)

	const handleSearch = value => {
		setSearch(value.toLowerCase())
	}

	useEffect(() => {
		fetchData()
	}, [])

	const fetchData = async () => {
		try {
			const data = await getAll_field_detailed_Request()
			setField_detailed(data)
		} catch (error) {}
	}

	// Create
	const handleCreate = () => {
		setShowCreateModal(true)
	}

	const toggleCreateModal = () => {
		setShowCreateModal(!showCreateModal)
	}

	const handleCreateCallback = async () => {
		fetchData()
	}

	// Update
	const handleUpdate = field_detailed => {
		setSelected(field_detailed)
		setShowUpdateModal(true)
	}

	const toggleUpdateModal = () => {
		setShowUpdateModal(!showUpdateModal)
	}

	const handleUpdateCallback = async () => {
		fetchData()
	}

	// Delete
	const handleDelete = field_detailed => {
		setSelected(field_detailed)
		setShowDeleteModal(true)
	}

	const toggleDeleteModal = () => {
		setShowDeleteModal(!showDeleteModal)
	}

	const handleDeleteCallback = async () => {
		fetchData()
	}

	const filteredData = filterData(field_detailed, search, ['name'])

	console.log('filteredData:', filteredData)

	const columns = [
		{
			name: 'Nombre',
			selector: row => row.name,
			sortable: true,
			minWidth: '600px',
			cell: row => (
				<div className='text-xs text-neutral-500 flex flex-col gap-y-1'>
					<span>{row.name}</span>
				</div>
			),
		},
		{
			name: 'Creado',
			selector: row => row.createdAt,
			sortable: true,
			minWidth: '200px',
			cell: row => <div className='text-xs text-neutral-500'>{formatDate(row.createdAt)}</div>,
		},
		{
			name: '',
			minWidth: '0px',
			cell: field_detailed => (
				<div className='flex justify-end gap-2 text-neutral-600'>
					<button
						onClick={() => {
							handleUpdate(field_detailed)
						}}
						className='rounded-md border border-neutral-300 p-1 transition-colors duration-150 hover:border-neutral-700 hover:bg-neutral-700 hover:text-neutral-50'>
						<LuPencilLine size={12} />
					</button>

					<button
						onClick={() => {
							handleDelete(field_detailed)
						}}
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
									<span>Campo detallado ({field_detailed.length})</span>
								</div>
							</div>

							<hr />

							<div className='flex items-center justify-between'>
								<div className='flex gap-4 text-xs'>
									<button
										className='flex items-center gap-2 rounded bg-sky-800 px-3 py-1.5 font-semibold text-neutral-50 transition-colors duration-150 hover:bg-sky-900'
										onClick={handleCreate}>
										<LuPlus />
										Nueva
									</button>
								</div>

								<SearchBar onSearch={handleSearch} />
							</div>

							<div className='overflow-scroll'>
								<Table columns={columns} data={filteredData} />
							</div>
						</div>

						{showCreateModal && (
							<ModalCreate field_detailed={selected} onClose={toggleCreateModal} onCreate={handleCreateCallback} />
						)}

						{showUpdateModal && (
							<ModalUpdate field_detailed={selected} onClose={toggleUpdateModal} onUpdate={handleUpdateCallback} />
						)}

						{showDeleteModal && (
							<ModalRemove field_detailed={selected} onClose={toggleDeleteModal} onDelete={handleDeleteCallback} />
						)}
					</main>
				</>
			)}
			<Toaster position='bottom-right' reverseOrder={false} richColors />
		</>
	)
}

export { FieldDetailedLayout }
