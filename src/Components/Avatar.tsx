
import modelpath from '../assets/models/walk.glb';
import { useEffect, useState } from "react";
import { useAnimations } from "@react-three/drei";
import { useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import { Vector3 } from 'three';

function Avatar({cameraRef }){
  const gltf = useLoader(GLTFLoader, modelpath);
  const {actions}  = useAnimations(gltf.animations, gltf.scene);
  const [movement, setMovement] = useState({ forward: false, backward: false, left: false, right: false });
  const velocity = 0.05;
  const movementDirection = new Vector3();

  useEffect(()=>{
    // align the model and walk axis
    gltf.nodes._100Avatars_102_BizDude.parent.children[1].rotation.set(-Math.PI/2,0,0,'XYZ')
    actions['Armature|mixamo.com|Layer0']?.play()
  })

   // Function to start the walking animation
   const startWalking = () => {
    if (actions['Armature|mixamo.com|Layer0']) {
      actions['Armature|mixamo.com|Layer0'].play();
    }
  };

  // Function to stop the walking animation
  const stopWalking = () => {
    if (actions['Armature|mixamo.com|Layer0']) {
      actions['Armature|mixamo.com|Layer0'].stop();
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
      gltf.scene.getWorldDirection(movementDirection);
      if (left) {
        gltf.scene.rotation.y += 0.05;  // Rotate to the left
      }
      if (right) {
        gltf.scene.rotation.y -= 0.05;  // Rotate to the right
      }

      // Handle forward/backward movement
      if (forward) {
        gltf.scene.position.add(movementDirection.multiplyScalar(velocity));
      }
      if (backward) {
        gltf.scene.position.add(movementDirection.multiplyScalar(-velocity));
      }
      // console.log(gltf.scene.position);
      if(cameraRef.current){
        if(forward || backward){
          cameraRef.current.position.add(movementDirection.multiplyScalar(velocity*20));
        }
      }
    }else{
      stopWalking()
    }
    cameraRef.current.lookAt(gltf.scene.position)
  })

  return <primitive object={gltf.scene} position={[0, 0, 0]} />;
}

export default Avatar