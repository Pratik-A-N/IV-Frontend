import { useEffect, useRef, useState } from "react";
import { Html, useAnimations } from "@react-three/drei";
import { useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import { Group, Vector3 } from 'three';
import { modelPath } from "@/Utilities/helper";
import { PerspectiveCamera as PerspectiveCameraType } from "three";
import { UserInRoom } from "@/Interfaces/CommonModelName";
import useSocket from "@/Hooks/useSocket";

interface AvartarModeProps{
  cameraRef: React.MutableRefObject<PerspectiveCameraType | undefined>,
  user: UserInRoom
}

function Avatar({cameraRef, user}: AvartarModeProps){
  const modelpath = modelPath(user.modelName);
  // const isCurrentUser = (localStorage.getItem("username") === user.username);
  const gltf = useLoader(GLTFLoader, modelpath);
  const { changedMyPosition } = useSocket();
  const {actions}  = useAnimations(gltf.animations, gltf.scene);
  const [movement, setMovement] = useState({ forward: false, backward: false, left: false, right: false });
  const velocity = 0.05;
  const roomId = localStorage.getItem('roomId') ?? "";
  const username = localStorage.getItem('username') ?? "";
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

   // Function to start the walking animation
   const startWalking = () => {
    if (walk && actions[walk]) {
      actions[walk].play();
    }
  };

  // Function to stop the walking animation
  const stopWalking = () => {
    if (walk && actions[walk]) {
      actions[walk].stop();
    }
  };

  useEffect(()=>{
    const handleKeyDown =(e: { key: unknown; })=>{
      switch (e.key) {
        case 'w':
          setMovement((m) => ({ ...m, forward: true }));
          break;
        case 's':
          setMovement((m) => ({ ...m, backward: true }));
          break;
        case 'a':
          setMovement((m) => ({ ...m, left: true }));
          break;
        case 'd':
          setMovement((m) => ({ ...m, right: true }));
          break;
        default:
          break;
      }
    }

    const handleKeyUp =(e: { key: unknown; })=>{
      switch (e.key) {
        case 'w':
          setMovement((m) => ({ ...m, forward: false }));
          break;
        case 's':
          setMovement((m) => ({ ...m, backward: false }));
          break;
        case 'a':
          setMovement((m) => ({ ...m, left: false }));
          break;
        case 'd':
          setMovement((m) => ({ ...m, right: false }));
          break;
        default:
          break;
      }
    }

    window.addEventListener('keydown',handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  },[])

  useFrame(()=>{
    const { forward, backward, left, right } = movement;

    if (forward || backward || left || right) {
      startWalking();
      groupRef.current?.getWorldDirection(movementDirection);
      if (left) {
        groupRef.current!.rotation.y += 0.05;  // Rotate to the left
      }
      if (right) {
        groupRef.current!.rotation.y -= 0.05;  // Rotate to the right
      }

      // Handle forward/backward movement
      if (forward) {
        groupRef.current!.position.add(movementDirection.multiplyScalar(velocity));
        // changedMyPosition(roomId, username, groupRef.current?.position);
      }
      
      if (backward) {
        groupRef.current!.position.add(movementDirection.multiplyScalar(-velocity));
      }
      

      if(cameraRef){
        if(forward || backward){
          cameraRef.current!.position.add(movementDirection.multiplyScalar(velocity*20));
        }
      }
    }else{
      stopWalking()
    }
    cameraRef.current!.lookAt(groupRef.current!.position)
  })

  return <group ref={groupRef}>
  <primitive object={gltf.scene} />
  {/* Display username above the model */}
  <Html position={[0, 2, 0]} center>
    <div style={{ color: "white", backgroundColor: "rgba(0, 0, 0, 0.5)", padding: "4px", borderRadius: "4px" }}>
      {user.username}
    </div>
  </Html>
</group>
}

export default Avatar