import { useState } from "react";
import MovieList from "./MovieList";

export type MovieData= {
    imdbID:string
    Title:string
    Year:string
    Poster:string
}

export type MovieArray={
    movies:MovieData[]
}

function ListBox({movies}:MovieArray) {
 const [isOpen1, setIsOpen1] = useState(true);
  return (
    <div className="box">
    <button
      className="btn-toggle"
      onClick={() => setIsOpen1((open) => !open)}
    >
      {isOpen1 ? "–" : "+"}
    </button>
    {isOpen1 && (
      <MovieList movies={movies} />
    )}
  </div>
  )
}

export default ListBox