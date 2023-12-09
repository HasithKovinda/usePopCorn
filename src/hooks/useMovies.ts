import { useEffect, useState } from "react";
import { MovieData } from "../types/types";

const key = "b2bcf820";

export function useMovies(query:string,callBack?:Function){
    const [movies, setMovies] = useState<MovieData []>([]);
    const[isLoading,setIsLoading] =useState(false)
    const[error,setError] =useState("")
    async function getMovies(controller:AbortController):Promise<void>{
        callBack?.()
        try {
         setIsLoading(true)
         setError('')
         const res = await fetch(
           `http://www.omdbapi.com/?apikey=${key}&S=${query}`,{
             signal:controller.signal
           }
         );
         if(!res.ok) {
           throw new Error('Fail to fetch movies')
         }
         const data = await res.json()
         if(data.Response==='False'){
           throw new Error('No movies found')
         }
         const movies:MovieData[] = data.Search.map((item:any)=>{
           const {Title,Year,Poster,imdbID} = item
           const movie:MovieData={
             title:Title,
             imdbID,
             year:Year,
             poster:Poster
           }
           return movie
         })
         setMovies(movies)
         setError("")
        } catch (error) {
          if(error instanceof Error){
           if(error.name!=='About')
           setError(error.message)
          }
        }finally{
         setIsLoading(false)
        }
       }

       useEffect(()=>{
        const controller = new AbortController()
        if(query.length<3){
          setMovies([])
          setError('')
          return
        }
       getMovies(controller)
    
       return ()=>{
        return controller.abort()
       }
      },[query])

      return {isLoading,error,movies}
     
}