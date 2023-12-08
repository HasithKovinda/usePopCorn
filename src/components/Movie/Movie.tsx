import { MovieData } from "../../types/types"

interface singleMovie{
  movie:MovieData
  handleClick:(id:string)=>void
}

 

function Movie({movie,handleClick}:singleMovie) {
  return (
    <li key={movie.imdbID} onClick={()=>handleClick(movie.imdbID)}>
    <img src={movie.Poster} alt={`${movie.Title} poster`} />
    <h3>{movie.Title}</h3>
    <div>
      <p>
        <span>🗓</span>
        <span>{movie.Year}</span>
      </p>
    </div>
  </li>
  )
}

export default Movie