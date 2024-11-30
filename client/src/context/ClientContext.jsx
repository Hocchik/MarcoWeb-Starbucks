import { createContext, useContext, useState } from "react";
import { getProducts, getPromos } from "../api/admindata";

const VwContext = createContext();

export const useAuth = () =>{
    const context = useContext(VwContext);
    if(!context){
        throw new Error('No context')
    }
    return context;
}

export function ViewContext({ children }){
    const [products, setProducts] = useState([]);
    const [promos, setPromos] = useState([]);

    const getProductos =  async () => {
        try {
            const res = await getProducts();
            setProducts(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const getPromociones =  async () => {
        try {
            const res = await getPromos();
            setPromos(res.data)
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <VwContext.Provider value={{
            products, getProductos,
            promos, getPromociones
        }}>
            { children }
        </VwContext.Provider>
    )
}