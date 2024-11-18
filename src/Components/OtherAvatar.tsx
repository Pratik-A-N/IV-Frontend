import { useEffect, useRef, useState } from "react";
import { Html, useAnimations } from "@react-three/drei";
import { useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import { Group, Vector3 } from 'three';
import { modelPath } from "@/Utilities/helper";
import { PerspectiveCamera as PerspectiveCameraType } from "three";
import { UserInRoom } from "@/Interfaces/CommonModelName";

interface AvartarModeProps{
  key: string
  user: UserInRoom
}

function OtherAvatar({key, user}: AvartarModeProps){
  const modelpath = modelPath(user.modelName);
  // const isCurrentUser = (localStorage.getItem("username") === user.username);
  const gltf = useLoader(GLTFLoader, modelpath);
  const {actions}  = useAnimations(gltf.animations, gltf.scene);
  const [movement, setMovement] = useState({ forward: false, backward: false, left: false, right: false });
  const velocity = 0.05;
  const movementDirection = new Vector3();
  const idleAction = Object.keys(actions).find((key) =>
    key.toLowerCase().includes("idle")
  );
  const walk = Object.keys(actions).find((key)=> key.toLowerCase().includes("walk"));
  const groupRef = useRef<Group>(null);

  useEffect(()=>{
    console.log(gltf)
    actions[idleAction ?? ""]?.play()
  })


  return <group ref={groupRef}>
  <primitive object={gltf.scene} position={user.position} />
  {/* Display username above the model */}
  <Html position={[0, 2, 0]} center>
    <div style={{ color: "white", backgroundColor: "rgba(0, 0, 0, 0.5)", padding: "4px", borderRadius: "4px" }}>
      {user.username}
    </div>
  </Html>
</group>
}

export default OtherAvatar