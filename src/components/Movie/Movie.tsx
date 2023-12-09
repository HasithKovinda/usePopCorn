import { MovieData } from "../../types/types"

interface singleMovie{
  movie:MovieData
  handleClick:(id:string)=>void
}

 

function Movie({movie,handleClick}:singleMovie) {
  return (
    <li key={movie.imdbID} onClick={()=>handleClick(movie.imdbID)}>
    <img src={movie.poster} alt={`${movie.title} poster`} />
    <h3>{movie.title}</h3>
    <div>
      <p>
        <span>🗓</span>
        <span>{movie.year}</span>
      </p>
    </div>
  </li>
  )
}

export default Movie