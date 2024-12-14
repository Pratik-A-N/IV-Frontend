// useSocket.ts
import { RoomUsersState } from "@/Atoms/roomUsersAtom";
import { UserInRoom } from "@/Interfaces/CommonModelName";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { io, Socket } from "socket.io-client";

const socket: Socket = io("http://localhost:8000"); // Replace with your backend server's URL


const useSocket = () => {
  const [, setUsersInRoom] = useRecoilState(RoomUsersState);
  // Listen for connection and reconnection
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to WebSocket server:", socket.id);
    });

    socket.on("disconnect", () => {
      let username = localStorage.getItem('username') ?? "";
      let roomId = localStorage.getItem('roomId') ?? "";
      leaveRoom(roomId, username)
    });

    socket.on("userJoined", (roomUsers) => {
        setUsersInRoom(roomUsers);
    });
  },[]);

  // Function to create a room
  const createRoom = (username: string, roomName: string, modelName: string, callback: (response: unknown) => void) => {
    socket.emit("createRoom", { roomName, modelName, username }, callback);
  };

  // Function to join a room
  const joinRoom = (username: string, roomId: string, modelName: string) => {
    socket.emit("joinRoom", { roomId, modelName, username});
  };

  // Funtion to trigger when current position changes
  const changedMyPosition = (roomId: string, username: string, position: number[], rotationY: number, movement: boolean) => {
    socket.emit("changedMyPosition",{roomId, username, position, rotationY, movement});
  }

  const leaveRoom = (roomId: string, username: string) =>{
    socket.emit("leaveRoom", {roomId, username});
  }
  
  // Return functions to interact with the WebSocket server
  return { createRoom, joinRoom, changedMyPosition };
};

export default useSocket;
