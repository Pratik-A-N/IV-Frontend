import BallModel from "@/Components/BallModel";
import Controls from "@/Components/Controls";
import Lighting from "@/Components/Lighting";
import { Navbar } from "@/Components/Navbar";
import { Button } from "@/Components/ui/button";
import { PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Link } from "react-router-dom";


export function Home(){
    return <div>
        <div className="h-screen flex flex-col">
            <div>
                <Navbar/>
            </div>
            <div className="px-14 flex items-center flex-grow">
                <div className="flex h-2/3 w-screen justify-between items-center">
                    <div>
                        <div className="text-4xl text-slate-100 mb-3">
                            <div>
                                Dive into the metaverse
                            </div>
                            <div>
                                world with everyone
                            </div>
                        </div>
                        <div className="text-xl text-slate-500">
                            <div>
                                Unite, innovate, and rejoice with Free Space,
                            </div>
                            <div>
                                no matter where you are
                            </div>
                        </div>
                        <div className="flex mt-9">
                            <div>
                                <Link to="createRoom">
                                    <Button className="font-semibold px-3 py-5 mr-3">+ Create Room</Button>
                                </Link>
                            </div>
                            <div className="flex ml-3">
                                <Link to="joinRoom">
                                    <Button className="bg-transparent py-5">Join Room</Button>  
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="w-1/3 h-4/5 mr-16">
                        <Canvas className="bg-gradient-to-r from-black via-slate-700 to-black rounded-full" shadows>

                            <PerspectiveCamera makeDefault position={[0,0,3]} />

                            <Lighting />

                            <BallModel/>

                            <Controls minDist={150} maxDist={170} />
                        </Canvas>
                    </div>
                </div>
            </div>
        </div>
    </div>
}