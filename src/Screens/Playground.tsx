import { Canvas } from "@react-three/fiber";
import Lighting from "../Components/Lighting";
import Ground from "../Components/Ground";
import Avatar from "../Components/Avatar";
import { PerspectiveCamera, Stars } from "@react-three/drei";
import AxisLabels from "../Components/AxisLabel";
import { useEffect, useRef } from "react";
import { PerspectiveCamera as PerspectiveCameraType } from "three";
import { useRecoilValue } from "recoil";
import { RoomUsersState } from "@/Atoms/roomUsersAtom";
import OtherAvatar from "@/Components/OtherAvatar";
import { useNavigate } from "react-router-dom";



export function PlayGround(){
    const cameraRef = useRef<PerspectiveCameraType>();
    const allUsers = useRecoilValue(RoomUsersState);
    const navigate = useNavigate();
    const otherUsers = allUsers.filter(user => user.username != localStorage.getItem('username'));
    const currUser = allUsers.find(usr => usr.username == localStorage.getItem('username'));

    useEffect(()=>{
      let token = localStorage.getItem('token');
      if(!token){
        alert("User Not Logged In")
        navigate("/login")
      }
    },)

    return (<div className="w-screen h-screen">
        <Canvas shadows>
          <PerspectiveCamera ref={cameraRef} makeDefault position={[0,5,-10]} />
        
          <Lighting />
  
          {/* Ground Plane */}
          <Ground/>

          <Avatar cameraRef={cameraRef} user={currUser!} />
          {otherUsers.map((user) => (
              <OtherAvatar key={user.username} user={user} />
          ))}
                   
          {/* Environment - Stars */}
          <Stars />
          <axesHelper args={[5]} />
          <AxisLabels/>
        </Canvas>
      </div>)
}