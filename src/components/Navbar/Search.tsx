import { useEffect, useRef } from "react"

type SearchProps={
  query:string
  setQuery:(query:string)=>void
}

function Search({query,setQuery}:SearchProps) {
  const inputEl= useRef<HTMLInputElement>(null)
  useEffect(()=>{
    const callBack=(event: KeyboardEvent)=>{
     if(document.activeElement===inputEl.current) return 
     if(event.code==='Enter'){
       inputEl.current!.focus()
       setQuery("")
     }
    }
    document.addEventListener('keydown',callBack)
    return ()=>document.removeEventListener('keydown',callBack)
  },[setQuery])
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  )
}

export default Search