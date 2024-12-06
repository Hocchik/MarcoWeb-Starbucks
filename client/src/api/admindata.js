import axios from './axios'

//Clientes
export const getClients = () => axios.get('/getclients')
export const createClient = client => axios.post(`/createclient`, client)
export const updateClient = (client) => axios.put(`/updateclient/${client._id}`, client)
export const deleteClient = (client) => axios.delete(`/deleteclient/${client._id}`, client)
    

//Productos
export const getProducts = () => axios.get('/getproducts')
export const createProduct = product => axios.post(`/createproduct`, product)
export const updateProduct = (product) => axios.put(`/updateproduct/${product._id}`, product)
export const deleteProduct = (product) => axios.delete(`/deleteproduct/${product._id}`, product)


//Promociones
export const getPromos = () => axios.get('/getpromos')
export const createPromo = promo => axios.post(`/createpromo`, promo)
export const updatePromo = (promo) => axios.put(`/updatepro/${promo._id}`, promo)
export const deletePromo = (promo) => axios.delete(`/deletepromo/${promo._id}`, promo)


//Reportes
export const getReportesCateProducts = () => axios.get('/getreportescateproducts')



