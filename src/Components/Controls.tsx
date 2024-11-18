import { OrbitControls } from '@react-three/drei';

interface ControlsPropType{
  minDist: number,
  maxDist: number
}

function Controls({minDist,maxDist}: ControlsPropType) {
  return (
    <OrbitControls enablePan={true} enableZoom={true} minDistance={minDist} maxDistance={maxDist} maxPolarAngle={Math.PI / 2} />
  );
}

export default Controls;
