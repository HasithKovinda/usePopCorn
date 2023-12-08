
import { type MovieArray } from '../../types/types'
import Movie from './Movie'

 
function MovieList({movies,handleClick}:MovieArray) {
  return (
    <ul className="list">
        {movies?.map((movie) => (
         <Movie movie={movie} key={movie.imdbID} handleClick={handleClick!} />
        ))}
    </ul>
  )
}

export default MovieList