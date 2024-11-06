import { OrbitControls } from '@react-three/drei';

function Controls() {
  return (
    <OrbitControls enablePan={true} enableZoom={true} minDistance={2} maxDistance={5} maxPolarAngle={Math.PI / 2} />
  );
}

export default Controls;
