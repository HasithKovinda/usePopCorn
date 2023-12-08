import { useEffect, useState } from "react";
import StarRating from "../rating/StarRating";
import Loading from "../Loading";
import { watchMovieData } from "../../types/types";

type MovieDetailsProps={
  id:string,
  handleClose:()=>void
  addMovie:(movie:watchMovieData)=>void
  watchMovies:watchMovieData[]
}

type movieDetails={
  Title: string
  Year: string
  Poster: string
  Runtime: string
  imdbRating:number
  Plot: string
  Released: string
  Actors: string
  Director:string
  Genre: string
}

const KEY = "b2bcf820";

function MovieDetails({id,handleClose,addMovie,watchMovies}:MovieDetailsProps) {
  const [movie, setMovie] = useState<Partial<movieDetails>>({});
  const [isLoading, setIsLoading] = useState(false);
  const[userRating,setUserRating] =useState(0)

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;


  const isWatched= watchMovies.map((movie)=>movie.imdbID).includes(id)
  const watchedUserRating = watchMovies.find((movie)=>movie.imdbID===id)?.userRating

  function handleAdd() {
    const newWatchedMovie = {
      imdbID:id,
      title:title || '',
      year:year||'',
      poster:poster || '',
      imdbRating: Number(imdbRating),
      runtime: Number(runtime!.split(' ')[0]),
      userRating,
    };
     addMovie(newWatchedMovie)
     handleClose()
  }

  useEffect(
    function () {
      async function getMovieDetails() {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${id}`
        );
        const data = await res.json() as movieDetails;
        setMovie(data);
        setIsLoading(false);
      }
      getMovieDetails();
    },
    [id]
  );
  return (
    <div className="details">
    {isLoading ? (
      <Loading />
    ) : (
      <>
        <header>
          <button className="btn-back" onClick={handleClose}>
            &larr;
          </button>
          <img src={poster} alt={`Poster of ${movie} movie`} />
          <div className="details-overview">
            <h2>{title}</h2>
            <p>
              {released} &bull; {runtime}
            </p>
            <p>{genre}</p>
            <p>
              <span>⭐️</span>
              {imdbRating} IMDb rating
            </p>
          </div>
        </header>
        <section>
          <div className="rating">
            {
              !isWatched ? <> <StarRating maxRating={10} size={24} onSetRating={setUserRating}/>
              {userRating > 0 && (
                       <button className="btn-add" onClick={handleAdd}>
                         + Add to list
                       </button>
               )}</>: <p>
               You rated with movie {watchedUserRating} <span>⭐️</span>
             </p>
            }
          
          </div>
          <p>
            <em>{plot}</em>
          </p>
          <p>Starring {actors}</p>
          <p>Directed by {director}</p>
        </section>
      </>
    )}
  </div>
  )
}

export default MovieDetails