
import { type MovieArray } from '../../types/types'
import Movie from './Movie'

 
function MovieList({movies}:MovieArray) {
  return (
    <ul className="list">
        {movies?.map((movie) => (
         <Movie movie={movie} key={movie.imdbID} />
        ))}
    </ul>
  )
}

export default MovieList