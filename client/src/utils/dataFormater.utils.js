// Code by ChatGPT
export const formatDate = (dateString, locale = 'es-ES') => {
	const date = new Date(dateString)
	const now = new Date()

	const diffInMs = now - date
	const diffInSec = Math.floor(diffInMs / 1000)
	const diffInMin = Math.floor(diffInSec / 60)
	const diffInHour = Math.floor(diffInMin / 60)
	const diffInDay = Math.floor(diffInHour / 24)
	const diffInWeek = Math.floor(diffInDay / 7)
	const diffInMonth = Math.floor(diffInWeek / 4)

	const options = {
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		hour12: true,
	}

	if (diffInSec < 60) {
		return 'ahora'
	} else if (diffInMin === 1) {
		return 'hace 1 minuto'
	} else if (diffInMin < 60) {
		return `hace ${diffInMin} minutos`
	} else if (diffInHour === 1) {
		return 'hace 1 hora'
	} else if (diffInHour < 24) {
		return `hace ${diffInHour} horas`
	} else if (diffInDay === 1) {
		return `ayer - ${date.toLocaleTimeString(locale, options)}`
	} else if (diffInDay === 2) {
		return `anteayer - ${date.toLocaleTimeString(locale, options)}`
	} else if (diffInWeek < 1) {
		return `${date.toLocaleDateString(locale)} - ${date.toLocaleTimeString(locale, options)}`
	} else if (diffInMonth < 1) {
		return `${date.toLocaleDateString(locale)} - ${date.toLocaleTimeString(locale, options)}`
	} else {
		return `${date.toLocaleDateString(locale)} - ${date.toLocaleTimeString(locale, options)}`
	}
}
