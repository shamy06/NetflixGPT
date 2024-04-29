import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTrailerVideo } from "../redux/movieSlice";

const useMovieTrailer =(movieId)=>{
    const dispatch =useDispatch();    
    const trailerVideo =useSelector(store => store.movies.trailerVideo)

    const getMoviesVideos = async () => {
        try{
        const data = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, API_OPTIONS)
        const json = await data.json();

        const filterData = json.results.filter((video) => video.type === "Trailer");
        const trailer = filterData.length ? filterData[0] : json.results[0];
        dispatch(addTrailerVideo(trailer))
        }
        catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        !trailerVideo && getMoviesVideos();
    }, []);

}

export default useMovieTrailer;