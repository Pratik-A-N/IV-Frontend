// useSocket.ts
import { RoomUsersState } from "@/Atoms/roomUsersAtom";
import { UserInRoom } from "@/Interfaces/CommonModelName";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { io, Socket } from "socket.io-client";

const socket: Socket = io("http://localhost:8000"); // Replace with your backend server's URL
const username: string = localStorage.getItem('username') ?? "";


const useSocket = () => {
  const [, setUsersInRoom] = useRecoilState(RoomUsersState);
  // Listen for connection and reconnection
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to WebSocket server:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from WebSocket server");
    });

    socket.on("userJoined", (roomUsers) => {
        console.log(roomUsers);
        setUsersInRoom(roomUsers);
    });
  },[]);

  // Function to create a room
  const createRoom = (roomName: string, modelName: string, callback: (response: unknown) => void) => {
    socket.emit("createRoom", { roomName, modelName, username }, callback);
  };

  // Function to join a room
  const joinRoom = (roomId: string,modelName: string) => {
    socket.emit("joinRoom", { roomId, modelName, username});
  };

  // Funtion to trigger when current position changes
  const changedMyPosition = (roomId: string, username: string, position: number[]) => {
    socket.emit("changedMyPosition",{roomId, username, position});
  }
  
  // Return functions to interact with the WebSocket server
  return { createRoom, joinRoom, changedMyPosition };
};

export default useSocket;
