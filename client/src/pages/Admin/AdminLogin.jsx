import { useForm } from "react-hook-form"
import { useAuth } from "../../context/AuthContextAdmin";
import {useNavigate, Link} from "react-router-dom";
import { useEffect } from "react";
import './AdminFondo.css'

function AdminLogin() {
  const {register, handleSubmit, formState: {errors}, } = useForm();
    const {signin, errors: loginErrors, isAuthenticated}= useAuth();
    const navigate = useNavigate();

    const onSubmit = handleSubmit((data) =>{
        signin(data);
    });

    useEffect(()=>{
        if(isAuthenticated) navigate("/Admin");
    }, [isAuthenticated]);

    return (
        <div className="Fondo flex h-[calc(113.5vh-100px)] items-center justify-center">
            <div className="bg-emerald-900 max-w-md w-full p-10 rounded-md">
            
            {
                loginErrors.map((error, i) => (
                    <div className="bg-red-500 p-2 text-white text-center my-2" key={i}>
                        {error}
                    </div>
                ))
            }
            
            <h1 className="text-2xl text-center font-bold mb-1">Inicia Sesión</h1>
            <form onSubmit={onSubmit}>
                <input
                type="text" {... register("code", {required: true })} 
                className='w-full bg-emerald-700 text-white px-4 py-2 my-2 rounded-md' 
                placeholder='Codigo'
                />

                {errors.code && (<p className='text-red-500'>Código es requerido</p>)}

                <input 
                type="password" {... register("password", {required: true })}
                className='w-full bg-emerald-700 text-white px-4 py-2 my-2 rounded-md' 
                placeholder='Contraseña'
                />
                
                {errors.password && (<p className='text-red-500'>Contraseña es requerida</p>)}
        
                <button type='submit'>
                    Ingresar
                </button>
            </form>

            <p className="flex gap-x-2 justify-between">
                <div>¿<a href="/">No</a> tienes una cuenta? </div>
                <Link to="/Admin-Register" className="text-sky-500">
                Regístrate</Link>
            </p>

            </div>
        </div>
    )
}

export default AdminLogin