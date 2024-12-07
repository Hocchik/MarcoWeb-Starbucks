import { Router } from "express";

import { 
    getProducts, createProduct, updateProduct, deleteProduct, 
    getUsers, createUser, updateUser, deleteUser,
    getPromos, createPromo, updatePromo,  deletePromo,
    getReportesCateProducts, getReportesDispersionProducts,
    getVentas,
    createVenta,
    getGraficoTendencia,
    getGraficoPie,
    getGraficoLineas,
    getGraficoBarras,
    updateVenta,
    deleteVenta
} from "../controllers/Admininfo.controller.js";


const router = Router();

//Clients-Users
router.get('/getclients', getUsers);
router.post('/createclient', createUser);
router.put('/updateclient/:id', updateUser);
router.delete('/deleteclient/:id', deleteUser);


//Products
router.get('/getproducts', getProducts);
router.post('/createproduct', createProduct);
router.put('/updateproduct/:id', updateProduct);
router.delete('/deleteproduct/:id', deleteProduct);


//Promos
router.get('/getpromos', getPromos)
router.post('/createpromo', createPromo);
router.put('/updatepromo/:id', updatePromo);
router.delete('/deletepromo/:id', deletePromo);

//Ventas
router.get('/getventas', getVentas);
router.post('/createventa', createVenta);
router.put('/updateventa/:id', updateVenta);
router.delete('/deleteventa/:id', deleteVenta);

//Reportes
router.get('/getreportescateproducts', getReportesCateProducts)
router.get('/getreportesdispersionproducts', getReportesDispersionProducts)
router.get('/getgraficotendencia', getGraficoTendencia)
router.get('/getgraficopie', getGraficoPie)
router.get('/getgraficolineas', getGraficoLineas)
router.get('/getgraficobarras', getGraficoBarras)

export default router