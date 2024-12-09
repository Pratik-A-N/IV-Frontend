import { useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import { modelPath } from "@/Utilities/helper";
import { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { animationListState, selectedAnimationState } from '@/Atoms/animationAtom';
import { useAnimations } from '@react-three/drei';
import ballprop from '../assets/models/propball.glb'


function BallModel(){
  const modelpath = ballprop;
  const gltf = useLoader(GLTFLoader, modelpath);
//   const [ , setanimationList ] = useRecoilState(animationListState);
//   const selectedAnimation = useRecoilValue(selectedAnimationState);
  const { actions } = useAnimations(gltf.animations, gltf.scene);

  // Ref to access the model and apply transformations
  const modelRef = useRef();
  
  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime(); // Get elapsed time
    if (modelRef.current) {
        modelRef.current.rotation.x = elapsedTime*0.5; // Rotate on X-axis
        modelRef.current.rotation.y = Math.sin(elapsedTime*0.5); // Rotate on Y-axis with sine wave
    }
  });
 
  return <primitive ref={modelRef} object={gltf.scene} position={[0, 0, 0]} />
          
}

export default BallModel