import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = () => {
    const movies = useSelector(store => store.movies);
    const {nowPlayingMovies, popularMovies, topRatedMovies, upComingMovies} = movies;

    return (
        movies.nowPlayingMovies && (
            <div className="bg-black pt-20">
                <div className="mt-20 md:-mt-52 pl-4 md:pl-12 relative z-20">
                <MovieList title={"Now Playing"} movies={nowPlayingMovies}/>
                <MovieList title={"Top Rated"} movies={topRatedMovies} />
                <MovieList title={"Popular"} movies={popularMovies} />
                <MovieList title={"Upcoming"} movies={upComingMovies} />                
                </div>
            </div>
        )
    )
}

export default SecondaryContainer;