// JoinRoom.tsx
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { useEffect, useState } from "react";
import useSocket from "@/Hooks/useSocket";
import { Link, useNavigate } from "react-router-dom";

export const JoinRoom = () => {
  const [roomId, setRoomId] = useState("");
  const { joinRoom } = useSocket();
  const modelName = localStorage.getItem('userAvatar') ?? "";
  const navigate = useNavigate();

  useEffect(()=>{
    let token = localStorage.getItem('token')
    if(!token){
      alert("User Not Logged In")
      navigate("/login")
    }
  },[])

  const handleJoinRoom = () => {
    if (!roomId.trim()) {
      alert("Please enter a room ID.");
      return;
    }

    joinRoom(roomId,modelName);
    localStorage.setItem('roomId',roomId)
    navigate("/playground")
    setRoomId("");
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center" >
      <div className="w-1/4 flex flex-col justify-center">
        <Input
            className="mb-5"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            placeholder="Enter room name to join"
        />
        <div className="flex justify-evenly">
          <div><Button onClick={handleJoinRoom}>Join Room</Button></div>
          <div>or</div>
          <div><Link to="/createRoom"><Button>Create Room</Button></Link></div>
        </div>
      </div>
    </div>
  );
};
