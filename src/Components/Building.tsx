// src/components/BuildingModel.js
import { useGLTF } from '@react-three/drei';

export function BuildingModel({ position, scale, modelPath }) {
  const { scene } = useGLTF(modelPath);  // Dynamically load the model

  return (
    <primitive 
      object={scene} 
      position={position} 
      scale={scale} 
    />
  );
}

export default BuildingModel