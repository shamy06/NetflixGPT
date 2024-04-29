import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUpcomingMovies } from "../redux/movieSlice";
import { API_OPTIONS } from "../utils/constants";

const  useUpComingMovies = ()=>{
    const dispatch = useDispatch();
    const upComingMovies =useSelector(state=>state.movies.upComingMovies)

    const getUpComingMovies = async () => {
        try{
        const data = await fetch('https://api.themoviedb.org/3/movie/upcoming?page=1', API_OPTIONS)
        const json = await data.json();
        dispatch(addUpcomingMovies(json.results));
        }
        catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
       !upComingMovies && getUpComingMovies();
    }, []);
}

export default useUpComingMovies;