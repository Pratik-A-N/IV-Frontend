import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { useEffect, useState } from "react";
import useSocket from "@/Hooks/useSocket";
import { Link, useNavigate } from "react-router-dom";

export const CreateRoom = () => {
  const [roomName, setRoomName] = useState("");
  const { createRoom } = useSocket();
  const navigate = useNavigate();
  const modelName = localStorage.getItem('userAvatar') ?? "";
  const username = localStorage.getItem('username') ?? "";

  useEffect(()=>{
    let token = localStorage.getItem('token')
    if(!token){
      alert("User Not Logged In")
      navigate("/login")
    }
  },[])

  const handleCreateRoom = () => {
    if (!roomName.trim()) {
      alert("Please enter a room name.");
      return;
    }

    createRoom(username, roomName, modelName, (response) => {
      if (response.success) {
        console.log("Room created:", response.roomId);
        localStorage.setItem('roomId',response.roomId);
        navigate("/playground")
      } else {
        alert("Error creating room: " + response.error);
      }
    });
  };


  return (
    <div className="w-screen h-screen flex justify-center items-center" >
        <div className="w-1/4 flex flex-col justify-center">
            <Input
                className="mb-5"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                placeholder="Create room name"
            />
            <div className="flex justify-evenly">
              <div><Button onClick={handleCreateRoom}>Create Room</Button></div>
              <div>or</div>
              <div><Link to="/joinRoom"><Button>Join Room</Button></Link></div>
            </div>
        </div>
    </div>
  );
};
