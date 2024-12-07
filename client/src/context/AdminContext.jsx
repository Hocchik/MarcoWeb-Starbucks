import { createContext, useContext, useState } from "react";
import { 
    getClients, createClient,updateClient, deleteClient,
    getProducts, createProduct, updateProduct, deleteProduct,
    getPromos, createPromo, updatePromo, deletePromo,
    getReportesCateProducts, getReportesDispersionProducts,
    getGraficoTendencia,
    getGraficoPie,
    getGraficoLineas,
    getGraficoBarra,
    getVentas,
    createVenta,
    deleteVenta,
    updateVenta
} from '../api/admindata'

const AdmContext = createContext();

export const useAdmin = () => {
    const context = useContext(AdmContext); 
    if(!context){
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export function AdminContext({ children }){
    
    const [clients, setClient] = useState([]);
    const [products, setProduct] = useState([]);
    const [promos, setPromos] = useState([]);
    const [ventas, setVentas] = useState([]);
    const [errors, setErrors] = useState([]);
    const [reportesCatePro, setReportesCatePro] = useState([])
    const [reportesDisperPro, setReportesDisperPro] = useState([])
    const [graficoTendencia, setGraficoTendencia] = useState([])
    const [graficoPie, setGraficoPie] = useState([])
    const [graficoLineas, setGraficoLineas] = useState([])
    const [graficoBarra, setGraficoBarra] = useState([])

//Gets
const getClientes =  async () => {
        try {
            const res = await getClients()
            setClient(res.data)
        } catch (error) {
            console.log(error)
        }
}
const getProductos =  async () => {
        try {
            const res = await getProducts();
            setProduct(res.data)
        } catch (error) {
            console.log(error)
        }
}
const getPromociones =  async () => {
        try {
            const res = await getPromos();
            setPromos(res.data)
        } catch (error) {
            console.log(error)
        }
}

//Create
const createClientes = async (client) => {
    try {
        const res = await createClient(client); 
        console.log(res)
    } catch (error) {
        if(Array.isArray(error.response.data)){
            return setErrors(error.response.data)
        }
        setErrors([error.response.data.message]);
        console.log(errors)
    }
}
const createPromociones = async (promo) => {
        try {
            const res = await createPromo(promo); 
            console.log(res)
        } catch (error) {
            if(Array.isArray(error.response.data)){
                return setErrors(error.response.data)
            }
            setErrors([error.response.data.message]);
            console.log(errors)
        }       
}
const createProductos = async (product) => {
    try {
        const res = await createProduct(product); 
        console.log(res)
    } catch (error) {
        if(Array.isArray(error.response.data)){
            return setErrors(error.response.data)
        }
        setErrors([error.response.data.message]);
        console.log(errors)
    }
}

//Updates
const updateClientes = async (client) => {
    try {
        const res = await updateClient(client);
        console.log(res)
    } catch (error) {
        console.log(error)
    }
}
const updateProductos = async (product) => {
    try {
        const res = await updateProduct(product)
        console.log(res)
    } catch (error) {
        console.log(error)
    }
}
const updatePromociones = async (promo) => {
    try {
        const res = await updatePromo(promo)
        console.log(res)
    } catch (error) {
        console.log(error)
    }
}

//Delete
const deleteClientes = async (client) => {
    try {
        const res = await deleteClient(client)
        console.log(res)
    } catch (error) {
        console.log(error)
    }
}
const deleteProductos = async (product) => {
    try {
        const res = await deleteProduct(product)
        console.log(res)
    } catch (error) {
        console.log(error)
    }
}
const deletePromociones = async (promo) => {
    try {
        const res = await deletePromo(promo)
        console.log(res)
    }
    catch(error){
        console.log(error)
    }
}

//Ventas
const getVentass = async () => {
    try {
        const res = await getVentas()
        setVentas(res.data)
    } catch (error) {
        console.log(error)
    }
}
const createVentas = async (venta) => {
    try {
        const res = await createVenta(venta); 
        console.log(res)
    } catch (error) {
        if(Array.isArray(error.response.data)){
            return setErrors(error.response.data)
        }
        setErrors([error.response.data.message]);
        console.log(errors)
    }
}
const updateVentas = async (venta) => {
    try {
        const res = await updateVenta(venta)
        console.log(res)
    } catch (error) {
        console.log(error)
    }
}
const deleteVentas = async (venta) => {
    try {
        const res = await deleteVenta(venta)
        console.log(res)
    } catch (error) {
        console.log(error)
    }
}


//Reportes
const getReporteCategoProducts = async () => {
    try {
        const res = await getReportesCateProducts()
        setReportesCatePro(res.data)
    } catch (error) {
        console.log(error)
    }
}

const getReportesDisperProducts = async () => {
    try {
        const res = await getReportesDispersionProducts()
        setReportesDisperPro(res.data)
    } catch (error) {
        console.log(error)
    }
}

const getGraficodeTendencia = async () => {
    try {
        const res = await getGraficoTendencia()
        setGraficoTendencia(res.data)
    } catch (error) {
        console.log(error)
    }
}

const getGraficodePie = async () => {
    try {
        const res = await getGraficoPie()
        setGraficoPie(res.data)
    } catch (error) {
        console.log(error)
    }
}

const getGraficodeLineas = async () => {
    try {
        const res = await getGraficoLineas()
        setGraficoLineas(res.data)
    } catch (error) {
        console.log(error)
    }
}

const getGraficodeBarra = async () => {
    try {
        const res = await getGraficoBarra()
        setGraficoBarra(res.data)
    } catch (error) {
        console.log(error)
    }
}


    return (
        <AdmContext.Provider value={{
            clients, getClientes, updateClientes, deleteClientes, createClientes,
            products, getProductos, updateProductos, deleteProductos, createProductos,
            promos, getPromociones, updatePromociones, deletePromociones, createPromociones,
            ventas, getVentass, createVentas, updateVentas, deleteVentas, 
            reportesCatePro, getReporteCategoProducts,
            reportesDisperPro, getReportesDisperProducts,
            graficoTendencia, getGraficodeTendencia,
            graficoPie, getGraficodePie,
            graficoLineas, getGraficodeLineas,
            graficoBarra, getGraficodeBarra,
        }}>
            { children }
        </AdmContext.Provider>
    )
}