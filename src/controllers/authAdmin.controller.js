import Admin from "../models/admin.model.js";
import bcrypt from "bcryptjs";
import {createAccessToken} from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const register = async (req, res) => {
    const{code, password, username} = req.body;

    try{

        const AdminFound = await Admin.findOne({code});
        if(AdminFound) 
            return res.status(400).json(['Codigo ya existe']);



        const passwordHash= await bcrypt.hash(password, 10);
        //Esto genera un String cualquiera :3

        const newAdmin = new Admin({
            username,
            code,
            password : passwordHash,
        });
    

        console.log(newAdmin);
        const AdminSaved = await newAdmin.save();
        
        /* Problemas Aquí */
        const token = await createAccessToken({ id: AdminSaved._id });
        
        res.cookie("token", token);
        
        res.json({
            id: AdminSaved._id,
            username: AdminSaved.username,
            code: AdminSaved.code,
            createdAt: AdminSaved.createdAt,
            updatedAt: AdminSaved.updatedAt,
        });


    }catch(error){
        res.status(500).json({ message: error.message });
    }
}

export const login = async (req, res) => {
/* Puedo colocar en lugar de Email, username */
const{ code, password } = req.body;

try{

    const AdminFound = await Admin.findOne({code}) /* Aqui tmb se cambiaria a username */
    if(!AdminFound) return res.status(400).json({ message: "Usuario no encontrado"});

    const isMatch= await bcrypt.compare(password, AdminFound.password);
    if(!isMatch) return res.status(400).json({ message: "Contraseña Incorrecta"});


    /* Problemas Aquí */
    const token = await createAccessToken({ id: AdminFound._id });
    
    res.cookie("token", token);
    
    res.json({
        id: AdminFound._id,
        username: AdminFound.username,
        code: AdminFound.code,
        createdAt: AdminFound.createdAt,
        updatedAt: AdminFound.updatedAt,
    });


}catch(error){
    res.status(500).json({ message: error.message });
}

};

export const logout = async (req, res) => {
    res.cookie('token', "", {
        expires: new Date(0)
    });
    return res.sendStatus(200);
} 

export const profile = async (req, res) => {
    const AdminFound = await Admin.findById(req.Admin.id);
    if(!AdminFound)  return res.status(400).json({message: "User not found"});
    
    return res.json({
        id: AdminFound._id,
        username: AdminFound.username,
        code: AdminFound.code,
        createdAt: AdminFound.createdAt,
        updatedAt: AdminFound.updatedAt,
    })
    res.send('profile');
}

export const verifyToken = async (req, res) => {
    const {token}= req.cookies
        if(!token) return res.status(401).json({message: 'Unauthorized'})

        jwt.verify(token, TOKEN_SECRET, async (err, admin) => {
            if(err) return res.status(401).json({message: 'Unauthorized'}) 
                const AdminFound = await Admin.findById(admin.id) 

            if(!AdminFound) return res.status(401).json({message: 'Unauthorized'}) 

                return res.json({
                    id: AdminFound._id,
                    username: AdminFound.username,
                    code: AdminFound.code,
                })

        })

}