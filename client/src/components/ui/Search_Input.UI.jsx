import { useState } from 'react'

const SearchInput = ({ onSearch }) => {
	const [searchTerm, setSearchTerm] = useState('')

	const handleChange = e => {
		const value = e.target.value
		setSearchTerm(value)
		onSearch(value)
	}

	return (
		<input
			type='text'
			placeholder='Buscar...'
			className='w-full sm:w-auto px-2 py-1 rounded-lg border border-neutral-300 focus:outline-none focus:ring-1 focus:ring-neutral-300 transition-colors duration-150'
			value={searchTerm}
			onChange={handleChange}
		/>
	)
}

export { SearchInput }
