// JoinRoom.tsx
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { useState } from "react";
import useSocket from "@/Hooks/useSocket";
import { useNavigate } from "react-router-dom";

export const JoinRoom = () => {
  const [roomId, setRoomId] = useState("");
  const { joinRoom } = useSocket();
  const modelName = localStorage.getItem('userAvatar') ?? "";
  const navigate = useNavigate();

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
            placeholder="Enter room ID"
        />
        <Button onClick={handleJoinRoom}>Join Room</Button>
        </div>
    </div>
  );
};
