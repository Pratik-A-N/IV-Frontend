import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import { modelPath } from "@/Utilities/helper";
import { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { animationListState, selectedAnimationState } from '@/Atoms/animationAtom';
import { useAnimations } from '@react-three/drei';
import { Box3, Vector3 } from 'three';
import { AvartarModelName } from '@/Interfaces/CommonModelName';

function ChooseAvatar({modelName}: AvartarModelName){
  const modelpath = modelPath(modelName);
  const gltf = useLoader(GLTFLoader, modelpath);
  const [ , setanimationList ] = useRecoilState(animationListState);
  const selectedAnimation = useRecoilValue(selectedAnimationState);
  const { actions } = useAnimations(gltf.animations, gltf.scene);

  // Ref to access the model and apply transformations
  const modelRef = useRef();
  
  useEffect(()=>{
    console.log(gltf.scene)
    setanimationList(gltf.animations);
    // console.log(gltf.animations)
    actions['CharacterArmature|Idle']?.play()
    actions[selectedAnimation.name]?.play();
    
    setTimeout(()=>{
      actions[selectedAnimation.name]?.fadeOut(1000);
      actions[selectedAnimation.name]?.stop();
    },(selectedAnimation.duration)*1000);


  },[gltf, actions, selectedAnimation, setanimationList])
 
  return <primitive ref={modelRef} object={gltf.scene} position={[0, -1, 0]} />
          
}

export default ChooseAvatar