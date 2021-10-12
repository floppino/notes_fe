import axios from 'axios'

let httpClient = null

export default ({ Vue }) => {
  httpClient = axios.create({
    baseURL: process.env.NOTES_BACKEND_URL, 
    timeout: 10000, // Timout 10 seconds
    headers: {
      'Content-Type': 'application/json'
    }
  })

  Vue.prototype.$axios = axios
}

export { httpClient }
