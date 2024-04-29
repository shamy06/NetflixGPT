import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "../firebase/firebase"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../redux/userSlice";
import { logo, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGptSearchView } from "../redux/gptSlice";
import { changeLanguage } from "../redux/configSlice";

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(store => store.user)
    const showGptSearch = useSelector(store => store.gpt.showGptSearch);

    const handleSignOut = () => {
        signOut(auth).then(() => {
        }).catch((error) => {
            navigate("/error");
        })
    }

    const handleGptSearchClick = () => {
        dispatch(toggleGptSearchView());
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const { uid, email, displayName, photoURL } = user;
                dispatch(
                    addUser({
                        uid: uid,
                        email: email,
                        displayName: displayName,
                        photoURL: photoURL
                    }));
                navigate("/browse");
            } else {
                dispatch(removeUser());
                navigate("/");
            }
        });
        //unsubscrube when component unmounts
        return () => unsubscribe();
    }, []);

    const handleLanguageCahnge = (e) => {
        dispatch(changeLanguage(e.target.value))
    }

    return (
        <div className="absolute w-full px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between">
            <img
                className="w-44 mx-auto md:mx-0"
                src={logo}
                alt="logo"
            />
            {user && (
                <div className="flex p-2 justify-between ">
                    {showGptSearch && (
                        <select className="p-2 m-2 bg-black text-white " onChange={handleLanguageCahnge}>
                            {SUPPORTED_LANGUAGES.map((lang) => (
                                <option value={lang.identifier}>{lang.name}</option>
                            ))}
                        </select>
                    )
                    }
                    <button className="py-2 m-2 px-4 mx-4 my-2 bg-purple-800 text-white rounded-lg"
                        onClick={handleGptSearchClick}>
                        {showGptSearch ? "HomePage" : "GPT Search"}
                    </button>
                    <img src={user.photoURL} alt="usericon" className="hidden md:block w-12 h-12 border rounded-full" />
                    <button onClick={handleSignOut} className="font-bold text-white">Sign Out</button>
                </div>
            )
            }
        </div>
    )
}
export default Header