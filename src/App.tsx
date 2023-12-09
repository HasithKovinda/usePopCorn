
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
import { useMovies } from "./hooks/useMovies";



// const query='harry potter'

export default function App() {
  const [query, setQuery] = useState<string>("");
  const[selectedId,setSelectedId] =useState<string |null>(null)
  const [watched, setWatched] = useState<watchMovieData []>(()=>{
    const watchedList = localStorage.getItem('watched')
    if(watchedList)
    return JSON.parse(watchedList)
  });
  const{isLoading,movies,error} =useMovies(query,handleClose)

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

useEffect(()=>{
  localStorage.setItem('watched',JSON.stringify(watched))
},[watched])

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
