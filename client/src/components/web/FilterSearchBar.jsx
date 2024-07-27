import { BiRefresh } from 'react-icons/bi'
import { SearchInput } from '../ui/Search_Input.UI'

const FilterSearchBar = ({
	handleCategoryChange,
	handleStartDateChange,
	handleEndDateChange,
	handleResetFilters,
	selectedCategory,
	startDate,
	endDate,
	categories,
	setSearchTerm,
}) => {
	return (
		<div>
			<div className='flex flex-col sm:flex-row justify-between items-center gap-4'>
				<div className='flex flex-wrap gap-4 text-xs text-slate-600'>
					<select
						onChange={handleCategoryChange}
						className='border border-slate-300 bg-white hover:bg-slate-50 py-2 px-2 rounded-lg cursor-pointer'
						value={selectedCategory}>
						<option value=''>Todas las categorías</option>
						{categories.map(category => (
							<option key={category.id_category} value={category.name}>
								{category.name}
							</option>
						))}
					</select>

					<input
						type='date'
						onChange={handleStartDateChange}
						className='border border-slate-300 hover:bg-slate-50 py-2 px-2 rounded-lg'
						value={startDate}
					/>

					<input
						type='date'
						onChange={handleEndDateChange}
						className='border border-slate-300 hover:bg-slate-50 py-2 px-2 rounded-lg'
						value={endDate}
					/>

					<button
						onClick={handleResetFilters}
						className='border border-slate-300 hover:bg-slate-50 py-2 px-2 rounded-lg'>
						<BiRefresh className='inline-block text-lg' />
					</button>
				</div>

				<SearchInput onSearch={setSearchTerm} className='w-full sm:w-auto max-w-sm' />
			</div>
		</div>
	)
}

export { FilterSearchBar }
