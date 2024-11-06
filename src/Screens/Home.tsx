import { Button } from "@/Components/ui/button";
import { Link } from "react-router-dom";

export function Home(){
    return <div>
        <div>
            <div>Hello world</div>
            <Button><Link to="signUp">Sign Up</Link> </Button>
            <Button>Login</Button>
        </div>
    </div>
}