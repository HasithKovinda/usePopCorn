
import NavBar from "./components/Navbar/NavBar";
import Search from "./components/Navbar/Search";
import NumResults from "./components/Navbar/NumResults";
import Main from "./components/Main";
import MovieList from "./components/Movie/MovieList";
import Box from "./components/Box";
import Summary from "./components/Watch/Summary";
import WatchedMovieList from "./components/Watch/WatchedMovieList";
import { useEffect, useState } from "react";
import {MovieData, watchMovieData} from "./types/types";
import Loading from "./components/Loading";
import ErrorMessage from "./components/Error";
import MovieDetails from "./components/Movie/MovieDetails";


const key = "b2bcf820";
// const query='harry potter'

export default function App() {
  const [movies, setMovies] = useState<MovieData []>([]);
  const [watched, setWatched] = useState<watchMovieData []>([]);
  const [query, setQuery] = useState<string>("");
  const[isLoading,setIsLoading] =useState(false)
  const[error,setError] =useState("")
  const[selectedId,setSelectedId] =useState<string |null>(null)


  function handleSelectedId(id:string){
    setSelectedId(id)
  }

  function handleClose(){
   setSelectedId(null)
  }

  function handleWatchedList(movie:watchMovieData){
     setWatched((watched)=>[...watched,movie])
  }

  function handleDeleteMovie(id:string){
     const movies = watched.filter((movie)=>movie.imdbID!==id)
     setWatched(movies)
   }
 


  
  async function getMovies():Promise<void>{
   try {
    setIsLoading(true)
    setError('')
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
    if(query.length<3){
      setMovies([])
      setError('')
      return
    }
   getMovies()
  },[query])

  return (
    <>
    <NavBar>
      <Search query={query} setQuery={setQuery} />
      <NumResults movies={movies} />
    </NavBar>
     <Main>
      <Box>
        {isLoading && <Loading/>}
        {!isLoading && !error && <MovieList  movies={movies} handleClick={handleSelectedId} />}
        {error && <ErrorMessage message={error} />}
      </Box>
      <Box>
        {selectedId ? <MovieDetails id={selectedId} handleClose={handleClose} addMovie={handleWatchedList} watchMovies={watched}/>:  <>
        <Summary watchList={watched} />
        <WatchedMovieList watchList={watched} deleteWatchedMovie={handleDeleteMovie} />
        </>}
      </Box>
     </Main>
    </>
  );
}
