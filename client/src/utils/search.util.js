// Code by chatGPT
const filterData = (data, search, fields) => {
	const searchTerm = search.trim().toLowerCase()

	return data.filter(item =>
		fields.some(field => {
			const value = item[field]

			if (typeof value === 'string') {
				return value.toLowerCase().includes(searchTerm)
			}

			return false
		})
	)
}

export { filterData }
