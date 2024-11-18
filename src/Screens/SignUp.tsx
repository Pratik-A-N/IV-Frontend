import { signUpSchema } from "@/schemas/authSchema"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/Components/ui/form"
import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { Canvas } from "@react-three/fiber"
import { PerspectiveCamera } from "@react-three/drei"
import Lighting from "@/Components/Lighting"
import Controls from "@/Components/Controls"
import ChooseAvatar from "@/Components/ChooseAvatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select"
import { useRecoilState } from "recoil"
import { animationListState, selectedAnimationState } from "@/Atoms/animationAtom"
import { useState } from "react"
import { formatAnimationName, modelList } from "@/Utilities/helper"
import { AnimationClip as AnimationClipType } from "three"
import axios from "axios"
import { baseURL } from "@/Constants/UriConstants"
import { useNavigate, useNavigation } from "react-router-dom"

export function SignUp(){
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      avatar: "",
    },
  })
  
  
  const animationList = useRecoilState(animationListState);
  const [, setSelectedAnimation] = useRecoilState(selectedAnimationState);
  const [selectedAvatar, setSelectedAvatar] = useState("Adventurer");
  const navigate = useNavigate()

  async function onSubmit(values: z.infer<typeof signUpSchema>) {
    try {
      await axios.post(baseURL + 'authenticate/signUp', values)
      .then((res)=>{
        alert(res.data.message);
      })
    } catch (error) {
      alert(error)
    }
  }

  const handleAnimationSelect = (event : AnimationClipType) => {
    setSelectedAnimation(event)
  }

  const navigateToLogin = ()=>{
    navigate("/login")
  }

  return <div className="flex">
    {/* signup component */}
    <div className="flex flex-col justify-center w-1/2 h-screen px-48">
      <div className="border-2 px-10 py-5 border-zinc-900 rounded-sm">
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="eg. abc@example.com" {...field} />
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
          <FormField
            control={form.control}
            name="avatar"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Avatar</FormLabel>
                <Select onValueChange={(value)=>{
                    setSelectedAvatar(value)
                    field.onChange(value)
                  }} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an Avatar" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    { modelList.map((model)=>{
                        return <SelectItem key={model.key} value={model.value}>{model.value}</SelectItem>
                      })
                    }
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-baseline">
            <Button type="submit">Submit</Button>
            <p className="px-5">Or</p>
            <Button onClick={navigateToLogin} >Login</Button>
          </div>
        </form>
        </Form>
      </div>
    </div>
    {/* Model rendering */}
    <div className=" w-1/2 h-screen">
        <div className="absolute m-5 z-10">
          <Select onValueChange={handleAnimationSelect} >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Interact" />
            </SelectTrigger>
            <SelectContent>
              {animationList[0].map((animation)=>{
                return <SelectItem key={animation.uuid} value={animation}>{formatAnimationName(animation.name)}</SelectItem>
              })
              }
            </SelectContent>
          </Select>
        </div>
        <Canvas className="bg-gradient-to-r from-black via-zinc-900 to-black" shadows>

            <PerspectiveCamera makeDefault position={[0,0,3]} />
          
            <Lighting />
    
            <ChooseAvatar modelName={selectedAvatar} /> 

            <Controls minDist={2} maxDist={5} />
        </Canvas>
          
        
    </div>
  </div>  
}