import { Banner } from '../banner/Banner'
import { BiCaretDown } from 'react-icons/bi'
import DataTable from 'react-data-table-component'
import imagePath from '../../assets/Not_Result.svg'

const Table = ({ columns, data }) => {
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
				fontWeight: 'bold',
				backgroundColor: '#f1f1f1',
			},
		},
		headCells: {
			style: {
				color: '#909090',
				fontSize: '13px',
				fontWeight: '500',
				borderBottom: '1px solid #ddd',
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

	const noDataComponent = (
		<Banner
			image={imagePath}
			alt_text='img login'
			description='Lo sentimos. No se encontraron registros.'
			size='w-1/2'
			padding='pt-0'
		/>
	)

	return (
		<DataTable
			className='rounded-lg border'
			columns={columns}
			data={data}
			sortIcon={sortIcon}
			noDataComponent={noDataComponent}
			paginationRowsPerPageOptions={[5, 10, 25, 50, 100]}
			paginationComponentOptions={paginationOptions}
			customStyles={tableStyles}
			responsive
			pagination
			dense
		/>
	)
}

export { Table }
