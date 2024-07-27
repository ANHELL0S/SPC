import { toast } from 'sonner'
import { useEffect, useState } from 'react'
import { fetch as fetchConfig } from '../services/api/config.api'

const useConfigData = () => {
	const [config, setConfig] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [configData] = await Promise.all([fetchConfig()])
				setConfig(configData[0])
			} catch (error) {
				toast.error(`${error.message}`)
			}
		}

		fetchData()
	}, [])

	return config
}

export { useConfigData }
