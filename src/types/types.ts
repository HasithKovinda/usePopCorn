//Movie Types

export type MovieData= {
    imdbID:string
    title:string
    year:string
    poster:string
  }
  
export type MovieArray={
    movies:MovieData[]
    handleClick?:(id:string)=>void
}



//Watch movie types

export type watchMovieData ={
    runtime: number,
    imdbRating: number,
    userRating: number,
} & MovieData

export type watchedMovieArray={
    watchList: watchMovieData[]
    deleteWatchedMovie?:(id:string)=>void
}
