import { Dispatch, SetStateAction, useEffect, useState } from "react";


export function useLocalStorageState<T>(initialState:T,key:string,):[T,Dispatch<SetStateAction<T>>] {
    const [value, setValue] = useState<T>(()=>{
        const items = localStorage.getItem(key)
        if(items)
        return JSON.parse(items)
        else return initialState
      });

      useEffect(()=>{
        localStorage.setItem(key,JSON.stringify(value))
      },[value,key])


      return [value,setValue]
}

