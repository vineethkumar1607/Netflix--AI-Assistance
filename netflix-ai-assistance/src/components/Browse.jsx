// src/pages/Browse.jsx

import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRated from "../hooks/useTopRated";

const Browse = () => {
  const { loading, error } = useNowPlayingMovies();
  usePopularMovies()
  useTopRated()
  return (
    <>
      <section>
        <MainContainer />
        <SecondaryContainer />
      </section>
    </>
  );
};

export default Browse;
