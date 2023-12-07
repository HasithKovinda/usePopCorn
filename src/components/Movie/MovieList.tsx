
import Movie from './Movie'

export type MovieData= {
  imdbID:string
  Title:string
  Year:string
  Poster:string
}

export type MovieArray={
  movies:MovieData[]
}

 
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