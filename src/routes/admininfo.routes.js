import { Router } from "express";

import { 
    getProducts, createProduct, updateProduct, deleteProduct, 
    getUsers, createUser, updateUser, deleteUser,
    getPromos, createPromo, updatePromo,  deletePromo
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

export default router