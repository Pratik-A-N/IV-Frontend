import { signUpSchema } from "@/schemas/signUpSchema"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/Components/ui/form"
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
import { useEffect, useState } from "react"
import { formatAnimationName, modelList, modelMapping } from "@/Utilities/helper"
import { AnimationClip as AnimationClipType } from "three"


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
  useEffect(()=>{
    
  })

  function onSubmit(values: z.infer<typeof signUpSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  const handleAnimationSelect = (event : AnimationClipType) => {
    setSelectedAnimation(event)
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
                  <Input placeholder="eg. abc@example.com" {...field} />
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
          <Button type="submit">Submit</Button>
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

            <Controls />
        </Canvas>
          
        
    </div>
  </div>  
}