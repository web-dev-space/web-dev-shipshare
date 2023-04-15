import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {profileThunk} from "./redux/users/users-thunks";

function CurrentUserSession ({children}) {
    const dispatch = useDispatch();
    useEffect (() => {
        console.log("aaa");
       return () => {
           dispatch(profileThunk());
       }
    }, []);
    return children;
}

export default CurrentUserSession;