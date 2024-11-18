import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/Components/ui/form"
import { Button } from "@/Components/ui/button"
import { loginSchema } from "@/schemas/authSchema"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import axios from "axios"
import { Input } from "@/Components/ui/input"
import { baseURL } from "@/Constants/UriConstants"
import { useNavigate } from "react-router-dom"


export function LoginScreen(){
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
          username: "",
          password: ""
        },
      })

    const navigate = useNavigate();

    async function onSubmit(values: z.infer<typeof loginSchema>) {
      try {
        await axios.post(baseURL + 'authenticate/login', values)
        .then((res)=>{
          localStorage.setItem('token',res.data.token);
          localStorage.setItem('username',res.data.user.username);
          localStorage.setItem('userAvatar',res.data.user.avatar);
          navigate("/createRoom");
        })
      } catch (error) {
        alert(error)
      }
    }  

    const navigateToSignUp = ()=>{
      navigate("/signUp")
    }

    return <div className="flex justify-center items-center h-screen">
        <div className="border-2 px-10 py-5 w-1/4 border-zinc-900 rounded-sm">
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter username ..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-baseline">
            <Button type="submit">Login</Button>
            <p className="px-5">Or</p>
            <Button onClick={navigateToSignUp} >Create Account</Button>
          </div>
          
        </form>
        </Form>
      </div>
    </div>
}