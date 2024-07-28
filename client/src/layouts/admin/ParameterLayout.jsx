import { Toaster } from 'sonner'
import { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar'
import { filterData } from '../../utils/search.util'
import { Table } from '../../components/table/Table'
import { Spinner } from '../../components/ui/spinner'
import { fetch } from '../../services/api/parameter.api'
import { useAllParameter } from '../../hooks/useParameter'
import { formatDate } from '../../utils/dataFormater.utils'
import { SearchBar } from '../../components/inputs/SearchBar'
import { LuPencilLine, LuPlus, LuRotateCcw, LuTrash } from 'react-icons/lu'
import { ModalCreate, ModalUpdate, ModalRemove, ModalReactive } from '../../components/form/FormsParameter'

const ParameterLayout = () => {
	const [search, setSearch] = useState('')
	const [selected, setSelected] = useState(null)
	const [showCreateModal, setShowCreateModal] = useState(false)
	const [showUpdateModal, setShowUpdateModal] = useState(false)
	const [showActiveModal, setShowActiveModal] = useState(false)
	const [showDeleteModal, setShowDeleteModal] = useState(false)
	const { parameter, loading, error, setParameter } = useAllParameter()

	const handleSearch = value => {
		setSearch(value.toLowerCase())
	}

	useEffect(() => {
		fetchData()
	}, [])

	const fetchData = async () => {
		try {
			const data = await fetch()
			setParameter(data)
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
	const handleUpdate = parameter => {
		setSelected(parameter)
		setShowUpdateModal(true)
	}

	const toggleUpdateModal = () => {
		setShowUpdateModal(!showUpdateModal)
	}

	const handleUpdateCallback = async () => {
		fetchData()
	}

	// Delete
	const handleDelete = parameter => {
		setSelected(parameter)
		setShowDeleteModal(true)
	}

	const toggleDeleteModal = () => {
		setShowDeleteModal(!showDeleteModal)
	}

	const handleDeleteCallback = async () => {
		fetchData()
	}

	// Active
	const handleActive = parameter => {
		setSelected(parameter)
		setShowActiveModal(true)
	}

	const toggleActiveModal = () => {
		setShowActiveModal(!showActiveModal)
	}

	const handleActiveCallback = async () => {
		fetchData()
	}

	const filteredData = filterData(parameter, search, ['name'])

	const columns = [
		{
			name: 'Nombre',
			selector: row => row.name,
			sortable: true,
			minWidth: '250px',
			cell: row => (
				<div className='text-xs text-neutral-500 flex flex-col gap-y-1'>
					<span>{row.name}</span>
				</div>
			),
		},
		{
			name: 'Descripción',
			selector: row => row.description,
			sortable: true,
			minWidth: '400px',
			cell: row => (
				<div className='text-xs text-neutral-500 flex flex-col gap-y-1'>
					<span>{row.description}</span>
				</div>
			),
		},
		{
			name: 'Estado',
			selector: row => row.active,
			sortable: true,
			minWidth: '110px',
			cell: row => (
				<div
					className={`inline-flex items-center gap-1 rounded-full px-2 py-0 text-xs font-medium ${
						row.active
							? 'border border-green-300 bg-green-50 text-green-600'
							: 'border border-red-300 bg-red-50 text-red-600'
					}`}>
					<span className={`h-1.5 w-1.5 rounded-full ${row.active ? 'bg-green-600' : 'bg-red-600'}`}></span>
					{row.active ? 'Activo' : 'Inactivo'}
				</div>
			),
		},
		{
			name: 'Creado',
			selector: row => row.createdAt,
			sortable: true,
			minWidth: '170px',
			cell: row => <div className='text-xs text-neutral-500'>{formatDate(row.createdAt)}</div>,
		},
		{
			name: 'Actualizado',
			selector: row => row.updatedAt,
			sortable: true,
			minWidth: '170px',
			cell: row => <div className='text-xs text-neutral-500'>{formatDate(row.updatedAt)}</div>,
		},
		{
			name: '',
			minWidth: '0px',
			cell: parameter => (
				<div className='flex justify-end gap-2 text-neutral-600'>
					{parameter.active ? (
						<>
							<button
								onClick={() => {
									handleUpdate(parameter)
								}}
								className='rounded-lg border border-neutral-300 p-1 transition-colors duration-150 hover:border-neutral-700 hover:bg-neutral-700 hover:text-neutral-50'>
								<LuPencilLine size={12} />
							</button>

							<button
								onClick={() => {
									handleDelete(parameter)
								}}
								className='rounded-md border border-red-300 bg-red-50 p-1 text-red-400 transition-colors duration-150 hover:bg-red-300 hover:text-neutral-50'>
								<LuTrash size={12} />
							</button>
						</>
					) : (
						<>
							<button
								onClick={() => {
									handleActive(parameter)
								}}
								className='rounded-md border border-green-300 bg-green-50 p-1 text-green-400 transition-colors duration-150 hover:bg-green-300 hover:text-neutral-50'>
								<LuRotateCcw size={12} />
							</button>
						</>
					)}
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
									<span>Parametros ({parameter.length})</span>
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
							<ModalCreate parameter={selected} onClose={toggleCreateModal} onCreate={handleCreateCallback} />
						)}

						{showUpdateModal && (
							<ModalUpdate parameter={selected} onClose={toggleUpdateModal} onUpdate={handleUpdateCallback} />
						)}

						{showActiveModal && (
							<ModalReactive parameter={selected} onClose={toggleActiveModal} onActive={handleActiveCallback} />
						)}

						{showDeleteModal && (
							<ModalRemove parameter={selected} onClose={toggleDeleteModal} onRemove={handleDeleteCallback} />
						)}
					</main>
				</>
			)}
			<Toaster position='bottom-right' reverseOrder={false} richColors />
		</>
	)
}

export { ParameterLayout }
