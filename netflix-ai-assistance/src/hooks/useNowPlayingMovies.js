// src/hooks/useNowPlayingMovies.js
import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useApi } from "./useApi";
import { addNowPlayingMovies } from "../redux/moviesSlice";
import { tmdboptions,TMDB_MOVIE_ENDPOINTS } from "../utils/tmdbOptions";

const API_BASE_URL = import.meta.env.VITE_TMDB_API_API_BASE_URL;
const API_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

const useNowPlayingMovies = () => {
    const dispatch = useDispatch();
    const options = useMemo(() => tmdboptions(API_TOKEN), [])

    const { data, loading, error } = useApi({
        url: `${API_BASE_URL}/movie/${TMDB_MOVIE_ENDPOINTS.NOW_PLAYING}`,
        options,
    });

    useEffect(() => {
        if (data?.results) {
            dispatch(addNowPlayingMovies(data.results));
        }
    }, [data, dispatch]);

    return { loading, error };
};

export default useNowPlayingMovies;
