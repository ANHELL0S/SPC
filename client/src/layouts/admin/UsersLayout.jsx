import { Toaster } from 'sonner'
import { useState, useEffect } from 'react'
import { filterData } from '../../utils/search.util'
import { Table } from '../../components/table/Table'
import { useUsersAll } from '../../hooks/useUsers'
import Navbar from '../../components/Navbar'
import { formatDate } from '../../utils/dataFormater.utils'
import { Spinner } from '../../components/ui/spinner'
import { SearchBar } from '../../components/inputs/SearchBar'
import { getALlUsersRequest } from '../../services/api/users.api'
import { LuFile, LuPencilLine, LuPlus, LuPrinter, LuRotateCcw, LuTrash } from 'react-icons/lu'
import { ModalCreate, ModalUpdate, ModalReactive, ModalRemove } from '../../components/form/FormsUsers'
import { useAuth } from '../../context/AuthContext'

const UsersLayout = () => {
	const [search, setSearch] = useState('')
	const { users, loading, error, setUsers } = useUsersAll()
	const [showCreateModal, setShowCreateModal] = useState(false)
	const [showUpdateModal, setShowUpdateModal] = useState(false)
	const [showActiveModal, setShowActiveModal] = useState(false)
	const [showDeleteModal, setShowDeleteModal] = useState(false)
	const [selected, setSelected] = useState(null)
	const { user } = useAuth()

	const handleSearch = value => {
		setSearch(value.toLowerCase())
	}

	useEffect(() => {
		fetchData()
	}, [])

	const fetchData = async () => {
		try {
			const data = await getALlUsersRequest()
			setUsers(data)
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
	const handleUpdate = user => {
		setSelected(user)
		setShowUpdateModal(true)
	}

	const toggleUpdateModal = () => {
		setShowUpdateModal(!showUpdateModal)
	}

	const handleUpdateCallback = async () => {
		fetchData()
	}

	// Active
	const handleActive = user => {
		setSelected(user)
		setShowActiveModal(true)
	}

	const toggleActiveModal = () => {
		setShowActiveModal(!showActiveModal)
	}

	const handleActiveCallback = async () => {
		fetchData()
	}

	// Delete
	const handleDelete = user => {
		setSelected(user)
		setShowDeleteModal(true)
	}

	const toggleDeleteModal = () => {
		setShowDeleteModal(!showDeleteModal)
	}

	const handleDeleteCallback = async () => {
		fetchData()
	}

	const filteredData = filterData(
		users.filter(u => u.id_user !== user.id_user),
		search,
		['name', 'email', 'identification_card', 'residence', 'phone']
	)

	const columns = [
		{
			name: 'Nombres',
			selector: row => row.username,
			sortable: true,
			minWidth: '220px',
			cell: row => (
				<div className='text-xs text-neutral-500 flex flex-col gap-y-1'>
					<span>{row.username}</span>
					<span className='text-neutral-400'>{row.email}</span>
				</div>
			),
		},
		{
			name: 'Cédula',
			selector: row => row.identification_card,
			sortable: true,
			minWidth: '110px',
			cell: row => (
				<div className='text-xs text-neutral-500'>{row.identification_card ? row.identification_card : '---'}</div>
			),
		},
		{
			name: 'Rol',
			selector: row => row.role.type_rol,
			sortable: true,
			minWidth: '100px',
			cell: row => (
				<div className='inline-flex items-center gap-1 rounded-full px-2 py-0 text-xs font-medium border border-neutral-300 bg-neutral-50 text-neutral-600'>
					{row.role.type_rol}
				</div>
			),
		},
		{
			name: 'Facultad',
			selector: row => row.faculty.name,
			sortable: true,
			minWidth: '300px',
			cell: row => <div className='text-xs text-neutral-500'> {row.faculty.name ? row.faculty.name : '---'}</div>,
		},
		{
			name: 'Relación laboral',
			selector: row => row.employmentRelationship,
			sortable: true,
			minWidth: '200px',
			cell: row => (
				<div className='text-xs text-neutral-500 flex flex-col gap-y-1'>
					<span>{row.employmentRelationship}</span>
					<span className='text-neutral-400'>{row.dedication}</span>
				</div>
			),
		},
		{
			name: '# artc.',
			selector: row => row.articleCount,
			sortable: true,
			minWidth: '90px',
			cell: row => (
				<div className='text-xs text-neutral-500 flex flex-col gap-y-1'>
					<span>{row.articleCount}</span>
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
			name: '',
			minWidth: '0px',
			cell: user => (
				<div className='flex justify-end gap-2 text-neutral-600'>
					{user.active ? (
						<>
							<button
								onClick={() => {
									handleUpdate(user)
								}}
								className='rounded-lg border border-neutral-300 p-1 transition-colors duration-150 hover:border-neutral-700 hover:bg-neutral-700 hover:text-neutral-50'>
								<LuPencilLine size={12} />
							</button>

							<button
								onClick={() => {
									handleDelete(user)
								}}
								className='rounded-md border border-red-300 bg-red-50 p-1 text-red-400 transition-colors duration-150 hover:bg-red-300 hover:text-neutral-50'>
								<LuTrash size={12} />
							</button>
						</>
					) : (
						<>
							<button
								onClick={() => {
									handleActive(user)
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
									<span>Usuarios ({users.length - 1})</span>
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
							<ModalCreate user={selected} onClose={toggleCreateModal} onCreate={handleCreateCallback} />
						)}

						{showUpdateModal && (
							<ModalUpdate user={selected} onClose={toggleUpdateModal} onUpdate={handleUpdateCallback} />
						)}

						{showActiveModal && (
							<ModalReactive user={selected} onClose={toggleActiveModal} onActive={handleActiveCallback} />
						)}

						{showDeleteModal && (
							<ModalRemove user={selected} onClose={toggleDeleteModal} onDelete={handleDeleteCallback} />
						)}
					</main>
				</>
			)}
			<Toaster position='bottom-right' reverseOrder={false} richColors />
		</>
	)
}

export { UsersLayout }
