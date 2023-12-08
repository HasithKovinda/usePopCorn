
import NavBar from "./components/Navbar/NavBar";
import Search from "./components/Navbar/Search";
import NumResults from "./components/Navbar/NumResults";
import Main from "./components/Main";
import MovieList from "./components/Movie/MovieList";
import Box from "./components/Box";
import Summary from "./components/Watch/Summary";
import WatchedMovieList from "./components/Watch/WatchedMovieList";
import { useEffect, useState } from "react";
import { MovieArray, MovieData, watchMovieData, watchedMovieArray } from "./types/types";
import Loading from "./components/Loading";
import ErrorMessage from "./components/Error";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const key = "b2bcf820";
const query='harry potterfvdfvf'

export default function App() {
  const [movies, setMovies] = useState<MovieData []>([]);
  const [watched, setWatched] = useState<watchMovieData []>([]);
  const[isLoading,setIsLoading] =useState(false)
  const[error,setError] =useState("")
  
  async function getMovies():Promise<void>{
   try {
    setIsLoading(true)
    const res = await fetch(
      `http://www.omdbapi.com/?apikey=${key}&S=${query}`,
    );
    if(!res.ok) {
      throw new Error('Fail to fetch movies')
    }
    const data = await res.json()
    if(data.Response==='False'){
      throw new Error('No movies found')
    }
    const movies:MovieData [] = data.Search
    setMovies(movies)
   } catch (error) {
     if(error instanceof Error){
      setError(error.message)
     }
   }finally{
    setIsLoading(false)
   }
  }

  useEffect(()=>{
   getMovies()
  },[])

  return (
    <>
    <NavBar>
      <Search/>
      <NumResults movies={movies} />
    </NavBar>
     <Main>
      <Box>
        {isLoading && <Loading/>}
        {!isLoading && !error && <MovieList movies={movies} />}
        {error && <ErrorMessage message={error} />}
      </Box>
      <Box>
      <Summary watchList={watched} />
      <WatchedMovieList watchList={watched} />
      </Box>
     </Main>
    </>
  );
}
