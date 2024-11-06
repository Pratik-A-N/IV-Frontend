import React from 'react';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { ArrowHelper, Vector3 } from 'three';

function AxisLabels() {
  const xRef = useRef();
  const yRef = useRef();
  const zRef = useRef();

  // Update the arrow helpers each frame to ensure they stay in position
  useFrame(() => {
    xRef.current.position.set(2, 0, 0);
    yRef.current.position.set(0, 2, 0);
    zRef.current.position.set(0, 0, 2);
  });

  return (
    <>
      {/* X Axis */}
      <arrowHelper
        args={[new Vector3(1, 0, 0), new Vector3(0, 0, 0), 2, 0xff0000]}
        ref={xRef}
      />
      <Text position={[2.2, 0, 0]} color="red" fontSize={0.3}>
        X
      </Text>

      {/* Y Axis */}
      <arrowHelper
        args={[new Vector3(0, 1, 0), new Vector3(0, 0, 0), 2, 0x00ff00]}
        ref={yRef}
      />
      <Text position={[0, 2.2, 0]} color="green" fontSize={0.3}>
        Y
      </Text>

      {/* Z Axis */}
      <arrowHelper
        args={[new Vector3(0, 0, 1), new Vector3(0, 0, 0), 2, 0x0000ff]}
        ref={zRef}
      />
      <Text position={[0, 0, 2.2]} color="blue" fontSize={0.3}>
        Z
      </Text>
    </>
  );
}

export default AxisLabels;
