import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

const URL_API = process.env.URL_API

const checkServerStatus = async () => {
	try {
		const response = await axios.get(`${URL_API}/status`)
		//console.log(`\nInf: Estatus server: ${response.status} - ${response.statusText}`)
	} catch (error) {
		console.error(`${error.message}`)
	}
}

export { checkServerStatus }
