import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { useState } from "react";
import useSocket from "@/Hooks/useSocket";
import { useNavigate } from "react-router-dom";

export const CreateRoom = () => {
  const [roomName, setRoomName] = useState("");
  const { createRoom } = useSocket();
  const navigate = useNavigate();
  const modelName = localStorage.getItem('userAvatar') ?? "";

  const handleCreateRoom = () => {
    if (!roomName.trim()) {
      alert("Please enter a room name.");
      return;
    }

    createRoom(roomName, modelName, (response) => {
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
                placeholder="Enter room name"
            />
            <Button onClick={handleCreateRoom}>Create Room</Button>
        </div>
    </div>
  );
};
