import { useSelector } from "react-redux";
import { Route, Routes } from "react-router";
import { DiscoverRoute } from "./Discover";

export function Community() {
    const currentUser = useSelector(state => state.auth.currentUser);
    return (
        <div>
            <Routes>
                <Route path="/discover/*"    element={<DiscoverRoute/>}/>


            </Routes>
        </div>
    )
}