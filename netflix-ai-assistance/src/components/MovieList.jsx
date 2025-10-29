
import MovieRow from './MovieRow';
import PropTypes from 'prop-types';

const MovieList = ({ nowPlayingMovies, popularMovies, topRatedMovies }) => {
  const sections = [
    { title: 'Now Playing', movies: nowPlayingMovies },
    { title: 'Top Rated', movies: topRatedMovies },
    { title: 'Popular', movies: popularMovies },
  ];

  return (
    <div className="relative  bg-black min-h-screen text-white">
      {/* Top Gradient */}
      <div className="absolute  w-full h-20 bg-gradient-to-b  to-transparent z-10" />

      {/* Movie Rows */}
      <div className="relative -mt-60 pb-8 pl-10 z-20 space-y-6">
        {sections.map(({ title, movies }) => (
          <MovieRow key={title} title={title} movies={movies} />
        ))}
      </div>

      {/* Bottom Gradient */}
      <div className="fixed bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black to-transparent z-10" />
    </div>
  );
};

export default MovieList;

// Add propTypes for validation
MovieList.propTypes = {
    // Assuming each prop is an array of movie objects
    nowPlayingMovies: PropTypes.arrayOf(PropTypes.object).isRequired,
    popularMovies: PropTypes.arrayOf(PropTypes.object).isRequired,
    topRatedMovies: PropTypes.arrayOf(PropTypes.object).isRequired,
};


//  <div className='bg-black min-h-screen'> {/* Full black background */}
//       {/* Gradient overlay at top */}
//       <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-black to-transparent z-10"></div>

//       <div className=' relative -mt-70 pb-8 pl-10 z-20'> {/* Add padding to account for header */}
//         <MovieCard nowPlayingmovies={nowPlayingMovies} headerTitle={"Now Playing"} />
//         <MovieCard nowPlayingmovies={topRatedMovies} headerTitle={"Top Rated"} />
//         <MovieCard nowPlayingmovies={popularMovies} headerTitle={"Popular"} />
//       </div>

//       {/* Optional: Bottom gradient like Netflix */}
//       <div className="fixed bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black to-transparent z-10"></div>
//     </div>
