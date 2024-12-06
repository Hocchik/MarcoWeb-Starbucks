import Product from "../models/product.model.js";
import User from "../models/user.model.js";
import Promo from "../models/promos.model.js";
import Venta from "../models/ventas.model.js";

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
        const{name, description, category, price, type, urlimagen} = req.body;
        
        const newProduct = new Product({
                name,
                description,
                category,
                type,
                price,
                urlimagen
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

//Ventas
export const getVentas = async (req, res) => {
        const ventas = await Venta.find({})
        
        if(!ventas) return res.status(400).send({success:true, msg:'No llego'})
        res.json(ventas);
}
export const createVenta = async (req, res) => {{
        const { productoID, nombreProducto, cantidad, precioUnitario, total, fechaVenta, ClienteID} = req.body;
        const newVenta = new Venta({
                productoID, nombreProducto, cantidad, precioUnitario, total, fechaVenta, ClienteID
        })
        const saveVenta = await newVenta.save();
        res.json(saveVenta)
}}


//Reportes
export const getReportesCateProducts = async (req, res) => {
        try {
        const products = await Product.find({})
        if(!products) return res.status(400).send({success:true, msg:'No llego'})

        let categorias = [
                {name:'Bebidas', cantidad:0},
                {name:'Alimentos', cantidad:0},
                {name:'Merch y Café', cantidad:0},
                {name:'Packs y Boxes', cantidad:0}
        ]

        for (let index = 0; index < products.length; index++) {
                switch(products[index].category){
                        case 'Bebidas': categorias[0].cantidad++; break;
                        case 'Alimentos': categorias[1].cantidad++; break;
                        case 'Merch y Café en Grano': categorias[2].cantidad++; break;
                        case 'Packs y Boxes': categorias[3].cantidad++; break;
                        default: break;
                }
        }
        
        res.json(categorias);
        } catch (error) {
        res.status(500).json({ message: error.message });
        }     
}
export const getReportesDispersionProducts = async (req, res) => {
        try {
                const products = await Product.find({})
                if(!products) return res.status(400).send({success:true, msg:'No llego'})
                
                let productitos = []
                        
                for (let index = 0; index < products.length; index++){
                        if(products[index].type === 'Frappuccinos'){
                                productitos[productitos.length] = { name: products[index].name, precio: products[index].price };      
                        }    
                }
                res.json(productitos);
        } catch (error) {
                console.log(error)
        }
}



export const getGraficoTendencia = async (req, res) => {
        try {
                /* Dias de la Semana donde hubo mas ventas */
                const ventas = await Venta.find({});
                if(!ventas) return res.status(400).send({success:true, msg:'No llego'})

                const today = new Date()

                let days = [
                        {name:'Lunes', cantidad:0},
                        {name:'Martes', cantidad:0},
                        {name:'Miércoles', cantidad:0},
                        {name:'Jueves', cantidad:0},
                        {name:'Viernes', cantidad:0},
                        {name:'Sábado', cantidad:0},
                        {name:'Domingo', cantidad:0}
                ]
                for (let index = 0; index < ventas.length; index++) {

                        const diaVenta = ventas[index].fechaVenta
                        if(diaVenta.getFullYear() === today.getFullYear()){
                                if(diaVenta.getMonth() === today.getMonth()){
                                        if((diaVenta.getDate()-diaVenta.getDay())-(today.getDate()-today.getDay()) === 0 ){
                                                switch(ventas[index].fechaVenta.getDay()){
                                                        case 1: days[0].cantidad = days[0].cantidad + ventas[index].cantidad; break;
                                                        case 2: days[1].cantidad = days[1].cantidad + ventas[index].cantidad; break;
                                                        case 3: days[2].cantidad = days[2].cantidad + ventas[index].cantidad; break;
                                                        case 4: days[3].cantidad = days[3].cantidad + ventas[index].cantidad; break;
                                                        case 5: days[4].cantidad = days[4].cantidad + ventas[index].cantidad; break;
                                                        case 6: days[5].cantidad = days[5].cantidad + ventas[index].cantidad; break;
                                                        case 7: days[6].cantidad = days[6].cantidad + ventas[index].cantidad; break;
                                                        default: break;
                                                }
                                        } 
                                }
                        }
                        
                }    
                
                res.json(days)
        } catch (error) {
                console.log(error)
        }
}
export const getGraficoPie = async (req, res) => {
        try {
                /* Porcentajes de ventas por tipo de producto este mes  */
                const ventas = await Venta.find({});
                const productos = await Product.find({});
                if (!ventas || ventas.length === 0) return res.status(400).send({ success: true, msg: 'No llegaron ventas' });
            
                const today = new Date();
            
                // Crear un objeto para almacenar las ventas por tipo de producto
                let ventasPorTipo = [];
                let totalVentas = 0;
            
                for (let index = 0; index < ventas.length; index++) {
                    const venta = ventas[index];
                    const fechaVenta = new Date(venta.fechaVenta);
                    
                    // Verificar que la venta sea del año y mes actual
                    if (fechaVenta.getFullYear() === today.getFullYear() && fechaVenta.getMonth() === today.getMonth()) {
                        // Obtener el producto relacionado
                        const producto = await Product.findById(venta.productoID); // Asumiendo que tienes el ID del producto en la venta
            
                        if (producto) {
                            const tipoProducto = producto.type; // Obtener el tipo de producto
                            totalVentas = totalVentas + venta.cantidad; // Sumar la cantidad de la venta al total

                            // Buscar el tipo en el array de ventasPorTipo
                            const tipoExistente = ventasPorTipo.find(item => item.type === tipoProducto);
            
                            if (tipoExistente) {
                                // Si el tipo ya existe, sumar la cantidad
                                tipoExistente.cantidad += venta.cantidad;
                            } else {
                                // Si no existe, agregar un nuevo tipo
                                ventasPorTipo.push({ type: tipoProducto, cantidad: venta.cantidad });
                            }
                        }
                    }
                }

/*                 for (let j = 0; j < ventasPorTipo.length; j++) {
                        ventasPorTipo[j].porcentaje = parseFloat(((ventasPorTipo[j].cantidad / totalVentas) * 100).toFixed(2)) + '%' ;
                } */

                res.json(ventasPorTipo);
            } catch (error) {
                console.log(error);
            }
}
export const getGraficoLineas = async (req, res) => {
        try {
                /* Días de la Semana donde hubo más ventas */
                const ventas = await Venta.find({});
                if (!ventas || ventas.length === 0) return res.status(400).send({ success: true, msg: 'No llegaron ventas' });
            
                const today = new Date();
            
                // Inicializa el array para almacenar ventas por día
                let days = [
                    { name: 'Lunes', cantidad: 0, producto: '', productoCantidad: 0 },
                    { name: 'Martes', cantidad: 0, producto: '', productoCantidad: 0 },
                    { name: 'Miércoles', cantidad: 0, producto: '', productoCantidad: 0 },
                    { name: 'Jueves', cantidad: 0, producto: '', productoCantidad: 0 },
                    { name: 'Viernes', cantidad: 0, producto: '', productoCantidad: 0 },
                    { name: 'Sábado', cantidad: 0, producto: '', productoCantidad: 0 },
                    { name: 'Domingo', cantidad: 0, producto: '', productoCantidad: 0 }
                ];
            
                for (let index = 0; index < ventas.length; index++) {
                    const venta = ventas[index];
                    const diaVenta = new Date(venta.fechaVenta); // Asegúrate de que fechaVenta sea un objeto Date
            
                    // Verificar si la venta es del año y mes actual
                    if (diaVenta.getFullYear() === today.getFullYear() && diaVenta.getMonth() === today.getMonth()) {
                        const dia = diaVenta.getDay(); // 0 = Domingo, 1 = Lunes, ..., 6 = Sábado
                        const cantidad = venta.cantidad; // Asumiendo que 'cantidad' está en la venta
                        const productoNombre = venta.nombreProducto; // Asumiendo que tienes el nombre del producto en la venta
            
                        // Actualizar la cantidad total de ventas para el día correspondiente
                        days[dia].cantidad += cantidad;
            
                        // Verificar si este producto es el más vendido para el día
                        if (cantidad > days[dia].productoCantidad) {
                            days[dia].producto = productoNombre;
                            days[dia].productoCantidad = cantidad;
                        }
                    }
                }
            
                res.json(days);
            } catch (error) {
                console.log(error);
            }
}
export const getGraficoBarras = async (req, res) => {
        try {
                /* Top 5 Productos más vendidos de este mes */
                const ventas = await Venta.find({});
                if (!ventas || ventas.length === 0) return res.status(400).send({ success: true, msg: 'No llegaron ventas' });
            
                const today = new Date();
                const productosContados = {};
            
                // Filtrar ventas por el mes actual y contar cantidades por producto
                for (let index = 0; index < ventas.length; index++) {
                    const venta = ventas[index];
                    const diaVenta = new Date(venta.fechaVenta);
            
                    // Verificar si la venta es del año y mes actual
                    if (diaVenta.getFullYear() === today.getFullYear() && diaVenta.getMonth() === today.getMonth()) {
                        const productoID = venta.productoID; // Asumiendo que tienes el ID del producto
                        const cantidad = venta.cantidad; // Asumiendo que cada venta tiene una propiedad 'cantidad'
            
                        // Contar la cantidad de cada producto
                        if (!productosContados[productoID]) {
                            productosContados[productoID] = 0;
                        }
                        productosContados[productoID] += cantidad;
                    }
                }
            
                // Convertir el objeto a un array y ordenar por cantidad
                const topProductos = Object.keys(productosContados)
                    .map(productoID => ({ productoID, cantidad: productosContados[productoID] }))
                    .sort((a, b) => b.cantidad - a.cantidad) // Ordenar de mayor a menor
                    .slice(0, 5); // Obtener los 5 más vendidos
            
                // Obtener los nombres de los productos
                const productos = await Product.find({ _id: { $in: topProductos.map(p => p.productoID) } });
            
                // Mapear los resultados para el JSON final
                const resultado = topProductos.map(item => {
                    const producto = productos.find(p => p._id.toString() === item.productoID.toString());
                    return { name: producto.name, cantidad: item.cantidad }; // Guardar nombre y cantidad
                });
            
                res.json(resultado);
            } catch (error) {
                console.log(error);
            }
}