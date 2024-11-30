import axios from './axios'

export const registerRequest = Admin => axios.post(`/registeradmin`, Admin)

export const loginRequest = Admin => axios.post(`/loginadmin`, Admin)

export const verifyTokenRequest = () => axios.get('/verifyadmin')
