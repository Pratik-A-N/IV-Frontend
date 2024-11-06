import adventuer from '../assets/models/Adventurer.glb'
import businessMan from '../assets/models/BusinessMan.glb'
import manInSuit from '../assets/models/ManInSuit.glb'
import casualCharacter from '../assets/models/CasualCharacter.glb'
import woman from '../assets/models/Woman.glb'
import womanInDress from '../assets/models/WomanInDress.glb'
import womanCasual from '../assets/models/WomanCasual.glb'

export const modelMapping: Map<string, string> = new Map();
// modelMapping.set("walk",walk);
modelMapping.set("Adventurer",adventuer);
modelMapping.set("Business Man", businessMan);
// modelMapping.set("Man In Suit", manInSuit);
modelMapping.set("Casual Character", casualCharacter);
// modelMapping.set("Woman", woman);
// modelMapping.set("Woman In Dress", womanInDress);
// modelMapping.set("Woman Casual", womanCasual);

export function modelPath(modelName: string){
  return modelMapping.get(modelName) || "";
}

export function formatAnimationName(name: string){
  const clipname = name.split('|')[1];
  const modifiedName = clipname.replace(/_/g, " ");
  return modifiedName;
}

interface modelMappingObject {
  key: string,
  value: string
}

export const modelList: modelMappingObject[] = [];

modelMapping.forEach((key,value)=>{
  modelList.push({
    "key": key,
    "value": value
  })
})