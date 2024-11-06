import { Canvas } from "@react-three/fiber";
import Lighting from "../Components/Lighting";
import Ground from "../Components/Ground";
import Avatar from "../Components/Avatar";
import Controls from "../Components/Controls";
import { PerspectiveCamera, Stars } from "@react-three/drei";
import AxisLabels from "../Components/AxisLabel";
import { useRef } from "react";
import { PerspectiveCamera as PerspectiveCameraType } from "three";

export function PlayGround(){
    const cameraRef = useRef<PerspectiveCameraType>();

    return (<div id="canvas-container">
        <Canvas shadows>
          {/* Lighting */}
          {/* Set up the camera and controls */}
          <PerspectiveCamera ref={cameraRef} makeDefault position={[0,5,-10]} />
        
          <Lighting />
  
          {/* Ground Plane */}
          <Ground/>
  
          <Avatar cameraRef={cameraRef}/>
          {/* Orbit Controls */}
          <Controls />
  
          {/* Environment - Stars */}
          <Stars />
          <axesHelper args={[5]} />
          <AxisLabels/>
        </Canvas>
      </div>)
}