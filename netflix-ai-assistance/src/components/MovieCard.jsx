// src/components/MovieCard.jsx (Modified)

import PropTypes from 'prop-types';
import { IMAGE_CDN_URL } from '../utils/constants';
import '../index.css'


const MovieCard = ({ movie, badgeText = "Now Playing" }) => {
    
    const altTitle = movie.title || movie.original_title || "Movie Poster";
    
    if (!movie?.poster_path) return null;

    return (
        <div
            className="relative flex-shrink-0 w-36 md:w-44 lg:w-52 transition-transform duration-300 hover:scale-105 hover:z-10"
        >
            <img
                className="rounded-md w-full h-full object-cover"
                src={IMAGE_CDN_URL + movie.poster_path}
                alt={altTitle}
            />
        
            <div className="absolute bottom-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded font-semibold shadow-lg">
                {badgeText}
            </div>
        </div>
    );
};

export default MovieCard;

// propTypes for validation
MovieCard.propTypes = {
    movie: PropTypes.shape({
        poster_path: PropTypes.string,
        title: PropTypes.string, 
        original_title: PropTypes.string,
    }).isRequired,
    
    badgeText: PropTypes.string,
};


// <div className="px-6 py-6">
//   <h1 className="text-2xl md:text-3xl font-semibold text-white mb-4">
//     {headerTitle} <span className="text-blue-500 ml-1">&gt;</span>
//   </h1>
//   <div className="flex overflow-x-auto no-scrollbar space-x-4 py-2 -mx-6 px-6">
//     {nowPlayingmovies.map((movie) => (
//       <div
//         key={movie.id}
//         className="relative flex-shrink-0 w-36 md:w-44 lg:w-52 transition-transform duration-300 hover:scale-105 hover:z-10"
//       >
//         <img
//           className="rounded-md w-full h-full object-cover"
//           src={IMAGE_CDN_URL + movie.poster_path}
//           alt={movie.original_title}
//         />
//         <div className="absolute bottom-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded font-semibold shadow-lg">
//           Now Playing
//         </div>
//       </div>
//     ))}
//   </div>
// </div>