
import { useState } from 'react';
import {type MovieData} from '../Movie/ListBox'

import Summary from './Summary';
import WatchedMovieList from './WatchedMovieList';

type watchMovieData ={
    runtime: number,
    imdbRating: number,
    userRating: number,
} & MovieData

export type watchedMovieArray={
    watchList: watchMovieData[]
}


function WatchedList({watchList}:watchedMovieArray) {
    const [movies, setMovies] = useState( watchList);
    const [watched, setWatched] = useState(watchList);
    const [isOpen2, setIsOpen2] = useState(true);
  return (
    <div className="box">
          <button
            className="btn-toggle"
            onClick={() => setIsOpen2((open) => !open)}
          >
            {isOpen2 ? "–" : "+"}
          </button>
          {isOpen2 && (
            <>
              <Summary watchList={watchList} />
              <WatchedMovieList watchList={watchList} />
            </>
          )}
        </div>
  )
}

export default WatchedList