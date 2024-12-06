export interface AvartarModelName{
    modelName: string; 
}

export interface CustomAvatarModelName extends AvartarModelName{
    camerRef: unknown;
}

export interface UserInRoom{
    username: string,
    modelName: string,
    position: { x: number; y: number; z: number },
    rotationY: number,
    movement: boolean
}