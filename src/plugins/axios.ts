import axios from 'axios'
import Cookies from 'js-cookie'

const token = Cookies.get('token')

const axiosInstance = axios.create({
  baseURL: 'https://localhost8000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'multipart/form-data',
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
    'X-Requested-With': 'XMLHttpRequest',
  },
})

axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get('token')
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }

  return config
})

export default axiosInstance
