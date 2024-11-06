import {atom} from "recoil"
import { AnimationClip as AnimationClipType } from "three"

export const animationListState = atom<AnimationClipType[]>({
    key: 'animationListState',
    default: []
})

export const selectedAnimationState = atom<AnimationClipType>({
    key: 'selectedAnimationState',
    default: new AnimationClipType()
})