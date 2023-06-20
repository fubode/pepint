import React, { useEffect, useState } from 'react'
import { supabase } from "../supabase/client";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    
    const [email, setEmail] = useState("")

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
            await supabase.auth.signInWithOtp({
                email,
            });
        } catch (error) {
            console.log(error);
        }
    };
    
    useEffect(() => {
        if(supabase.auth.getUser()){
            navigate('/')
        }
    }, [navigate]);
    
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input type='email' name='email' placeholder='example@fubode.org' 
                onChange={(e)=> setEmail(e.target.value)}
            />
            <button>Enviar</button>
        </form>
    </div>
  )
}

export default Login
