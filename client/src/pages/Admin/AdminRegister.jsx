import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContextAdmin';
import { useEffect } from 'react';
import {useNavigate, Link} from 'react-router-dom'




function AdminRegister() {
    const { register, handleSubmit, formState: {errors}, } = useForm();
    const {signup, isAuthenticated, errors: registerErrors } = useAuth();
    const navigate = useNavigate();
    
    useEffect(() => {
        if(isAuthenticated) navigate('/Admin')
    }, [isAuthenticated])

    const onSubmit = handleSubmit( async (values) => {
        signup(values)
    })

    return (
        <div className="Fondo flex h-[calc(113.5vh-100px)] items-center justify-center">
        <div className="bg-emerald-900 max-w-md p-10 rounded-md">
            {
                registerErrors.map((error, i) => (
                    <div className="bg-red-500 p-2 text-white text-center my-2" key={i}>
                        {error}
                    </div>
                ))
            }
            <h1 className="text-2xl text-center font-bold mb-1">Registrate</h1>
            <form onSubmit={onSubmit}>
                <input
                type="text" {... register("username", {required: true })} 
                className='w-full bg-emerald-700 text-white px-4 py-2 my-2 rounded-md'
                placeholder='Usuario'
                />

        {errors.username && (<p className='text-red-500'>Usuario es requerido</p>)}
                
                <input
                type="text" {... register("code", {required: true })} 
                className='w-full bg-emerald-700 text-white px-4 py-2 my-2 rounded-md' 
                placeholder='Codigo'
                />

        {errors.code && (<p className='text-red-500'>Codigo es requerido</p>)}

                <input 
                type="password" {... register("password", {required: true })}
                className='w-full bg-emerald-700 text-white px-4 py-2 my-2 rounded-md' 
                placeholder='Password'
                />
                
        {errors.password && (<p className='text-red-500'>Contraseña es requerido</p>)}
        
                <button type='submit'>
                    Registrase
                </button>
            </form>

            <p className="flex gap-x-2 justify-between">
                ¿Ya tienes cuenta?
                <Link to="/Admin-Login" className="text-sky-500">
                Logéate</Link>
            </p>
            
        </div>
        </div>
    )
}

export default AdminRegister