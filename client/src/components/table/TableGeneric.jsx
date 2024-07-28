/* eslint-disable react/prop-types */
import { useState } from 'react'
import { filterData } from '../utils/search.utils'
import DataTable from 'react-data-table-component'
import { BiCaretDown, BiPlus, BiSearch } from 'react-icons/bi'

const CustomDataTable = ({ columns, data, handleAdd }) => {
	const [search, setSearch] = useState('')

	const handleSearch = e => {
		setSearch(e.target.value.toLowerCase())
	}

	const filteredData = filterData(data, search, ['name', 'username', 'email', 'description', 'createdAt', 'updatedAt'])

	const paginationOptions = {
		rowsPerPageText: 'Filas por página',
		rangeSeparatorText: 'de',
		selectAllRowsItem: true,
		selectAllRowsItemText: 'Todos',
	}

	const tableStyles = {
		headRow: {
			style: {
				border: 'none',
			},
		},

		headCells: {
			style: {
				color: '#737373',
				fontSize: '13px',
				fontWeight: 'bold',
				border: 'none',
			},
		},

		rows: {
			style: {
				color: '#737373',
				fontSize: '12.5px',
			},
			highlightOnHoverStyle: {
				backgroundColor: '#f5f5f5',
				color: '#171717',
			},
		},

		pagination: {
			style: {
				border: 'none',
				color: '#737373',
				fontSize: '12.5px',
			},
		},
	}

	const sortIcon = <BiCaretDown />

	return (
		<>
			<div className='flex flex-col gap-2 text-center sm:flex-row sm:items-center sm:justify-between sm:text-start relative'>
				<div className='flex-grow flex'>
					<button
						onClick={handleAdd}
						className='inline-flex items-center justify-center gap-1.5 border-r border-neutral-300 px-4 py-2 text-md font-semibold leading-5 bg-neutral-600 hover:bg-neutral-700 text-neutral-50 hover:text-neutral-50 transition-colors duration-200'>
						<BiPlus />
					</button>
				</div>

				<div className='relative border-l border-neutral-300'>
					<input
						type='text'
						value={search}
						onChange={handleSearch}
						placeholder='Buscar...'
						className='w-56 px-4 py-1 border-none placeholder:text-neutral-400 text-neutral-500 placeholder-neutral-500 focus:outline-none focus:border-none font-medium text-sm'
					/>
					<button className='absolute inset-y-0 right-0 flex items-center px-3 text-neutral-400'>
						<BiSearch />
					</button>
				</div>
			</div>

			<DataTable
				className='border-t border-neutral-300'
				columns={columns}
				data={filteredData}
				sortIcon={sortIcon}
				noDataComponent='Sin resultados'
				responsive
				pagination
				paginationRowsPerPageOptions={[5, 10, 25, 50, 100]}
				paginationComponentOptions={paginationOptions}
				customStyles={tableStyles}
				highlightOnHover
				pointerOnHover
			/>
		</>
	)
}

export default CustomDataTable
