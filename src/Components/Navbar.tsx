import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { useEffect, useState } from "react";

export const Navbar = ()=>{
    const token = localStorage.getItem('token');
    const [isLoggedIn, setLoggedIn] = useState(false);

    useEffect(()=>{
        if(token){
            setLoggedIn(true);
        }
    })

    const handleLogout = ()=>{
        localStorage.clear();
        setLoggedIn(false);
    }

    return <div className="flex justify-between items-center p-5 border-b border-b-gray-700">
        <div className="text-2xl font-bold text-slate-100">FREESPACE</div>
        {isLoggedIn &&
            <div>
                <div className="mx-2"><Button onClick={handleLogout} >Logout</Button></div>
            </div>
        }
        {!isLoggedIn && 
            <div className="flex">
                <div className="mx-2"><Link to="login"><Button>Login</Button></Link></div>
                <div className="mx-2"><Link to="signUp"><Button className="bg-transparent">Sign Up </Button></Link></div>
            </div>
        }
    </div>
} 