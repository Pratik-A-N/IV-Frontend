import groundTexture from '../assets/textures/tile_texture.jpeg';

import { useLoader } from '@react-three/fiber';
import { useEffect } from 'react';
import { TextureLoader, RepeatWrapping } from 'three';

function Ground() {
  const texture = useLoader(TextureLoader, groundTexture); // Load the texture

  useEffect(() => {
    texture.wrapS = texture.wrapT = RepeatWrapping; // Set the texture to repeat
    texture.repeat.set(50, 50); // Set the repeat values (10x10 tiling in this case)
  }, [texture]);

  return (
    <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

export default Ground;

