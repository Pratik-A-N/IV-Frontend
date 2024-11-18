import { RoomUsersState } from "@/Atoms/roomUsersAtom"
import { useEffect } from "react";
import { useRecoilState } from "recoil"

export const TestingPlayground = () =>{
    const [ userInRoom, setUserInRoom ] = useRecoilState(RoomUsersState);
    useEffect(()=>{
        console.log(userInRoom);
    }) 
    return <div>Testing Ground</div>
}