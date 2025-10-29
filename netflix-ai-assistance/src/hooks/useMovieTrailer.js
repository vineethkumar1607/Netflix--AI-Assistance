import { useApi } from "./useApi";
import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { addMovieTrailer } from "../redux/moviesSlice";
import { tmdboptions,  } from "../utils/tmdbOptions";

const API_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
const API_BASE_URL = import.meta.env.VITE_TMDB_API_API_BASE_URL;

export const useMovieTrailer = (movieId) => {
    const dispatch = useDispatch()
    const options = useMemo(() => tmdboptions(API_TOKEN), [])

    const { data, loading, error } = useApi({
        url: `${API_BASE_URL}/movie/${movieId}/videos`,
        options,
    });

    const filterData = data?.results?.filter((video) => video.type === "Trailer") || [];
    const trailer = filterData.length ? filterData[0] : data?.results?.[0];

    useEffect(() => {
        if (trailer) {
            dispatch(addMovieTrailer(trailer))
        }
    }, [trailer, dispatch]);
    return { loading, error }
}