//Movie Types

export type MovieData= {
    imdbID:string
    Title:string
    Year:string
    Poster:string
  }
  
export type MovieArray={
    movies:MovieData[]
}



//Watch movie types

export type watchMovieData ={
    runtime: number,
    imdbRating: number,
    userRating: number,
} & MovieData

export type watchedMovieArray={
    watchList: watchMovieData[]
}
