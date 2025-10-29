import React from 'react';
import MovieCard from './MovieCard';

const MovieRow = ({ title, movies }) => {
  if (!movies || !Array.isArray(movies)) return null;
  
  return (
    <div className="px-3 ">
      <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
        {title} <span className="text-blue-500 ml-1">&gt;</span>
      </h2>

      <div className="flex overflow-x-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent space-x-4 py-2 no-scrollbar">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieRow;
