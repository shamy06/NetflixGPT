import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { useRef } from "react";
import openai from "../utils/openai"
import { API_OPTIONS, tmdbMovieResults } from "../utils/constants";
import { addGptMovieResult } from "../redux/gptSlice";

const GptSearchBar = () => {
    const langKey = useSelector(state => state.config.lang);
    const dispatch = useDispatch();
    const searchText = useRef(null);

    // search movie in TMDB
    const searchMovieTMDB = async (movie) => {
        // console.log(movie)
        const data = await fetch(
            "https://api.themoviedb.org/3/search/movie?query=" +
            movie +
            "&include_adult=false&language=en-US&page=1",
            API_OPTIONS
        );
        const json = await data.json();
        return json.results;

    };

    const handleGptSearchClick = async () => {
        const gptQuery = "Act as a Movie Recommendation system ansd suggest some movies for the query :" + searchText.current.value + ". only give me names of 5 movies., comma separated";
        let gptResults = []
        try {
            gptResults = await openai.chat.completions.create({
                messages: [{ role: 'user', content: gptQuery }],
                model: 'gpt-3.5-turbo',
            })
        }
        catch (error) {
            console.error(error);
        }

        // Andaz Apna Apna, Hera Pheri, Chupke Chupke, Jaane Bhi Do Yaaro, Padosan
        const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");
        const promiseArray = tmdbMovieResults.map((movie) => searchMovieTMDB(movie));  // [Promise, Promise, Promise, Promise, Promise]
        const tmdbResults = await Promise.all(promiseArray);

        //using sample movie data for now as openAI key billing is costing more

        dispatch(
            addGptMovieResult({ movieNames: tmdbMovieResults, movieResults: tmdbResults })
        );
    }

    return (
        <div className="pt-[5%] md:pt-[10%] flex justify-center flex-col items-center">
            <form
                className="w-full md:w-1/2 bg-black grid grid-cols-12"
                onSubmit={(e) => e.preventDefault()}
            >
                <input
                    type="text"
                    ref={searchText}
                    className="p-4 m-4 col-span-9"
                    placeholder={lang[langKey].gptSearchPlaceholder}
                />
                <button
                    className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg"
                    onClick={handleGptSearchClick}
                >
                    {lang[langKey].search}
                </button>
            </form>
            <h2 className="mt-10 bg-black opacity-80 text-white text-lg">
                Showing sample search results using TMDB SEarch API, as Open AI Key billing is extended and restricted due to security issues.
            </h2>
        </div>
    )
}

export default GptSearchBar;
