import React from 'react'
import { useSelector } from 'react-redux'
import { useMovieTrailer } from '../hooks/useMovieTrailer'

const BackgroundVideo = ({ movieId }) => {
    const { loading, error } = useMovieTrailer(movieId)
    const movieTrailer = useSelector((store) => store.movies.movieTrailer)

    if (!movieTrailer) return null;

    const youtubeKey = movieTrailer.key;

    return (
        <div className="absolute top-0 left-0 w-full h-full  bg-gradient-to-t from-black to-transparent z-10">
            <iframe
                className="w-full h-full object-cover pointer-events-none"
                src={`https://www.youtube.com/embed/${youtubeKey}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0&loop=1&playlist=${youtubeKey}&iv_load_policy=3&fs=0`}
                title="Netflix background trailer"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
            />
        </div>
    )
}

export default BackgroundVideo
