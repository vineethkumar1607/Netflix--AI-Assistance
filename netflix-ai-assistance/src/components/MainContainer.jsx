
import VideoTitle from './VideoTitle'
import BackgroundVideo from './BackgroundVideo';
import { useSelector } from 'react-redux';

const MainContainer = () => {
    const nowPlayingMovies = useSelector((state) => state.movies.nowPlayingMovies)
    //early return if the movies are not present in the store
    if (!nowPlayingMovies) return;
    const mainMovie = nowPlayingMovies[0];
    const { original_title, overview, id } = mainMovie;

    return (
        <section className="relative w-full aspect-video overflow-hidden">
            <VideoTitle title={original_title} overview={overview} />
            <BackgroundVideo movieId={id} />
        </section>
    )
}

export default MainContainer
