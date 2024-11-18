import { UserInRoom } from "@/Interfaces/CommonModelName";
import { atom } from "recoil";

export const RoomUsersState = atom<UserInRoom[]>({
    key: 'RoomUsersState',
    default: []
})