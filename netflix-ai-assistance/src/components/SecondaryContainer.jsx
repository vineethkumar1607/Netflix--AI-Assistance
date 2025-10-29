// src/components/SecondaryContainer.jsx (Corrected Code)

import { useSelector } from "react-redux";
import MovieList from "./MovieList";


const SecondaryContainer = () => {
  // the variable is an empty array if the Redux store value is null/undefined.
  const nowPlayingMovies = useSelector((store) => store.movies.nowPlayingMovies) || [];
  const popularMovies = useSelector((store) => store.movies.popularMovies) || [];
  const topRatedMovies = useSelector((store) => store.movies.topRatedMovies) || [];

  // Return early if there's absolutely no data (e.g., the slice is unmounted/undefined)
  if (nowPlayingMovies.length === 0 && popularMovies.length === 0 && topRatedMovies.length === 0) {
    return null;
  }

  return (
    <div className="bg-black">
      <div className="-mt-52 relative z-20 ">
        <MovieList
          nowPlayingMovies={nowPlayingMovies}
          popularMovies={popularMovies}
          topRatedMovies={topRatedMovies}
          headerTitle={"Now Playing Movies"}
        />
      </div>
    </div>
  )
}

export default SecondaryContainer;