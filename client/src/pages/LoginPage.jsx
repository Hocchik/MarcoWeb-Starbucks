import { useForm } from "react-hook-form"
import { useAuth } from "../context/AuthContext";
import {Link} from "react-router-dom";

function LoginPage(){
    
    const {register, handleSubmit, formState: {errors}, } = useForm();
    const {signin, errors: loginErrors}= useAuth();

    const onSubmit = handleSubmit((data) =>{
        signin(data);
    });

    return (
        
        <div className="flex h-[calc(100vh-100px)] items-center justify-center">
            <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
            
            {
                loginErrors.map((error, i) => (
                    <div className="bg-red-500 p-2 text-white text-center my-2" key={i}>
                        {error}
                    </div>
                ))
            }
            
            <h1 className="text-2xl text-center font-bold ">Login</h1>
            <form onSubmit={onSubmit}>
                <input
                type="email" {... register("email", {required: true })} 
                className='w-full bg-zinc-700 text-white px-4 py-2 my-2 rounded-md' 
                placeholder='Email'
                />

                {errors.email && (<p className='text-red-500'>Email is required</p>)}

                <input 
                type="password" {... register("password", {required: true })}
                className='w-full bg-zinc-700 text-white px-4 py-2 my-2 rounded-md' 
                placeholder='Password'
                />
                
                {errors.password && (<p className='text-red-500'>Password is required</p>)}
        
                <button type='submit'>
                    Login
                </button>
            </form>

            <p className="flex gap-x-2 justify-between">
                Dont have an account? 
                <Link to="/register" className="text-sky-500">
                Register</Link>
            </p>

            </div>
        </div>
    )
}

export default LoginPage