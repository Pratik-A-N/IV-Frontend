import { useEffect, useRef, useState } from "react";
import { Html, useAnimations } from "@react-three/drei";
import { useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import { Euler, Group, Vector3 } from 'three';
import { modelPath } from "@/Utilities/helper";
import { PerspectiveCamera as PerspectiveCameraType } from "three";
import { UserInRoom } from "@/Interfaces/CommonModelName";
import { userState } from "@/Atoms/userAtom";

interface AvartarModeProps{
  key: string
  user: UserInRoom
}

function OtherAvatar({user}: AvartarModeProps){
  const modelpath = modelPath(user.modelName);
  // const isCurrentUser = (localStorage.getItem("username") === user.username);
  const gltf = useLoader(GLTFLoader, modelpath);
  const [groupPosition, setGroupPosition] = useState(new Vector3());
  const [groupRotation, setGroupRotation] = useState(new Euler());
  const {actions}  = useAnimations(gltf.animations, gltf.scene);
  const idleAction = Object.keys(actions).find((key) =>
    key.toLowerCase().includes("idle")
  );
  const walk = Object.keys(actions).find((key)=> key.toLowerCase().includes("walk"));
  const groupRef = useRef<Group>(null);

  useEffect(()=>{
    actions[idleAction ?? ""]?.play()
  })


  // Function to start the walking animation
  const startWalking = () => {
    if (walk && actions[walk]) {
      actions[walk].play();
    }
  };

  // Function to stop the walking animation
  const stopWalking = () => {
    console.log("stopped");
    if (walk && actions[walk]) {
      actions[walk].stop();
    }
  };

  useEffect(()=>{
    if(user.movement){
      startWalking();
    }else{
      stopWalking();
    }
    setGroupPosition(new Vector3(user.position[0],user.position[1], user.position[2]));
    setGroupRotation(new Euler(0,user.rotationY,0,"XYZ"));
    // console.log(user);
    // console.log(groupRef.current);
  },[user])

  return <>
        <group ref={groupRef} position={groupPosition} rotation={groupRotation} >
          <primitive object={gltf.scene} />
          <Html position={[0, 2, 0]} center>
            <div style={{ color: "white", backgroundColor: "rgba(0, 0, 0, 0.5)", padding: "4px", borderRadius: "4px" }}>
              {user.username}
            </div>
          </Html>
        </group>
  </>
}

export default OtherAvatar