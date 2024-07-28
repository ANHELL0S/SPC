import React, { useState } from 'react'
import { LuSearch, LuX } from 'react-icons/lu'

const SearchBar = ({ onSearch }) => {
	const [search, setSearch] = useState('')

	const handleSearchChange = e => {
		const { value } = e.target
		setSearch(value)
		onSearch(value)
	}

	const handleClearSearch = () => {
		setSearch('')
		onSearch('')
	}

	return (
		<div className='relative flex flex-col gap-2 text-center sm:flex-row sm:items-end sm:justify-end sm:text-start'>
			<div className='relative flex w-full items-center sm:w-auto'>
				<div className='relative flex w-full items-center'>
					<LuSearch className='absolute left-3 text-neutral-500' />
					<input
						type='text'
						value={search}
						onChange={handleSearchChange}
						placeholder='Buscar...'
						className='focus:border-primary-500 w-full rounded-lg border py-1.5 pl-10 pr-8 text-sm font-medium text-neutral-500 placeholder-neutral-400 transition-colors duration-300 ease-in-out focus:outline-none'
					/>
					{search.length > 0 && (
						<button
							onClick={handleClearSearch}
							className='absolute right-3 top-1/2 -translate-y-1/2 transform focus:outline-none'>
							<LuX className='hover:text-primary-500 cursor-pointer text-neutral-500' />
						</button>
					)}
				</div>
			</div>
		</div>
	)
}

export { SearchBar }
