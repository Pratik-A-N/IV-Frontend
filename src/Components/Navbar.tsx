import { Link } from "react-router-dom"
import { Button } from "./ui/button"

export const Navbar = ()=>{
    return <div className="flex justify-between items-center p-5 border-b border-b-gray-700">
        <div className="text-2xl font-bold text-slate-100">FREESPACE</div>
        <div className="flex">
            <div className="mx-2"><Link to="login"><Button>Login</Button></Link></div>
            <div className="mx-2"><Link to="signUp"><Button className="bg-transparent">Sign Up </Button></Link></div>
        </div>
    </div>
} 