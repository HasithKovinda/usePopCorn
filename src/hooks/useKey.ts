import { useEffect } from "react"

export function useKey(key:string,action:Function){
    useEffect(()=>{
        const handleEvent= (e:KeyboardEvent)=>{
          if(e.code.toLocaleLowerCase()===key.toLocaleLowerCase()){
            action()
          }
      }
        document.addEventListener('keydown',handleEvent)
    
        return ()=>document.removeEventListener('keydown',handleEvent)
      },[action,key])
}