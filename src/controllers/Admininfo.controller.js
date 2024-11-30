import Product from "../models/product.model.js";
import User from "../models/user.model.js";
import Promo from "../models/promos.model.js";

//Clientes_Usuarios
export const getUsers = async (req, res) => {

        const users = await User.find({})
        
        if(!users) return res.status(400).send({success:true, msg:'No llego'})
        res.json(users)
}
export const createUser = async (req, res) => {
        const {username, email, password}  = req.body;

        const newUser = new User({
                username,
                email,
                password,
        })

        const savedUser  = await newUser.save()
        res.json(savedUser);
}
export const updateUser = async (req, res) => {   
        const user = await  User.findByIdAndUpdate(req.params.id, req.body, {new: true})
        if(!user)  return res.status(404).send({success:true, msg:'No se encontro el usuario'})
        res.json(user)
}
export const deleteUser = async (req, res) => {
        const  user = await User.findByIdAndDelete(req.params.id)
        if(!user)  return res.status(404).send({success:true, msg:'No se encontro el usuario'})
        return  res.sendStatus(204);
}


//Productos
export const getProducts = async (req, res) => {
    const products = await Product.find({})
        
        if(!products) return res.status(400).send({success:true, msg:'No llego'})
        res.json(products)
}
export const createProduct = async  (req, res) => {
        const{name, description, category, price, urlimagen, moneda} = req.body;
        
        const newProduct = new Product({
                name,
                description,
                category,
                price,
                urlimagen,
                moneda
        });

        const savedProduct = await newProduct.save();
        res.json(savedProduct)
}
export const updateProduct = async (req, res) => {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true})
        if(!product)  return res.status(404).send({success:true, msg:'No se encontro el producto'})
        res.json(product)
}
export const deleteProduct = async (req, res) => {
        const product = await Product.findByIdAndDelete(req.params.id)
        if(!product)  return res.status(404).send({success:true, msg:'No se encontro el producto'})
        return res.sendStatus(204);
}


//Promociones
export const getPromos = async (req, res) => {

        const promos = await Promo.find({})
        
        if(!promos) return res.status(400).send({success:true, msg:'No llego'})
        res.json(promos)
}
export const createPromo = async  (req, res) => {
        const{ producto, descuento, dateString, date, duration, admin} = req.body;
        
        const newPromo = new Promo({
                producto,
                descuento,
                date,
                dateString,
                duration,
                admin
        });

        const savedPromo = await newPromo.save();
        res.json(savedPromo)
}
export const updatePromo = async (req, res) => {
        const promo = await Promo.findByIdAndUpdate(req.params.id, req.body, {new: true})
        if(!promo)  return res.status(404).send({success:true, msg:'No se encontro la promocion'})
        res.json(promo)
}
export const deletePromo = async (req, res) => {
        const promo = await Promo.findByIdAndDelete(req.params.id)
        if(!promo)  return res.status(404).send({success:true, msg:'No se encontro la promocion'})
        return res.sendStatus(204);
}
