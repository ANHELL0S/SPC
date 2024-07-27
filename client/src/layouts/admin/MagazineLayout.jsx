import { Toaster } from 'sonner'
import { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar'
import { Table } from '../../components/table/Table'
import { filterData } from '../../utils/search.util'
import { Spinner } from '../../components/ui/spinner'
import { useAllMagazine } from '../../hooks/useMagazine'
import { formatDate } from '../../utils/dataFormater.utils'
import { SearchBar } from '../../components/inputs/SearchBar'
import { getAllMagazineRequest } from '../../services/api/magazine.api'
import { LuFile, LuPencilLine, LuPlus, LuPrinter, LuTrash } from 'react-icons/lu'
import { ModalCreate, ModalUpdate, ModalRemove } from '../../components/form/FormsMagazine'

const MagazineLayout = () => {
	const [search, setSearch] = useState('')
	const { magazine, loading, error, setMagazine } = useAllMagazine()
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
			const data = await getAllMagazineRequest()
			setMagazine(data)
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
	const handleUpdate = magazine => {
		setSelected(magazine)
		setShowUpdateModal(true)
	}

	const toggleUpdateModal = () => {
		setShowUpdateModal(!showUpdateModal)
	}

	const handleUpdateCallback = async () => {
		fetchData()
	}

	// Delete
	const handleDelete = magazine => {
		setSelected(magazine)
		setShowDeleteModal(true)
	}

	const toggleDeleteModal = () => {
		setShowDeleteModal(!showDeleteModal)
	}

	const handleDeleteCallback = async () => {
		fetchData()
	}

	const filteredData = filterData(magazine, search, ['name'])

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
			name: 'Actualizado',
			selector: row => row.updatedAt,
			sortable: true,
			minWidth: '200px',
			cell: row => <div className='text-xs text-neutral-500'>{formatDate(row.updatedAt)}</div>,
		},
		{
			name: '',
			minWidth: '0px',
			cell: magazine => (
				<div className='flex justify-end gap-2 text-neutral-600'>
					<button
						onClick={() => {
							handleUpdate(magazine)
						}}
						className='rounded-md border border-neutral-300 p-1 transition-colors duration-150 hover:border-neutral-700 hover:bg-neutral-700 hover:text-neutral-50'>
						<LuPencilLine size={12} />
					</button>

					<button
						onClick={() => {
							handleDelete(magazine)
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
									<span>Revistas ({magazine.length})</span>
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
							<ModalCreate magazine={selected} onClose={toggleCreateModal} onCreate={handleCreateCallback} />
						)}

						{showUpdateModal && (
							<ModalUpdate magazine={selected} onClose={toggleUpdateModal} onUpdate={handleUpdateCallback} />
						)}

						{showDeleteModal && (
							<ModalRemove magazine={selected} onClose={toggleDeleteModal} onDelete={handleDeleteCallback} />
						)}
					</main>
				</>
			)}
			<Toaster position='bottom-right' reverseOrder={false} richColors />
		</>
	)
}

export { MagazineLayout }
