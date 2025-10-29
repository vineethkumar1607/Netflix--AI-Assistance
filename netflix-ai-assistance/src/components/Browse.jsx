// src/pages/Browse.jsx
import { useSelector } from "react-redux";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRated from "../hooks/useToprated";

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
