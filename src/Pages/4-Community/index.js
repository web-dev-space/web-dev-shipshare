import {Route, Router, Routes} from "react-router";
import Following from "./Follow";
import {DiscoverRoute} from "./Discover";
import Profile from "./Profile";

export function Community() {
    return (
        <div>
            <Routes>
                <Route path="/"    element={<DiscoverRoute/>}/>
                <Route path="/discover/*"    element={<DiscoverRoute/>}/>
                <Route path="/follow"    element={<Following/>}/>
                <Route path="/profile" element={<Profile/>}/>
            </Routes>
        </div>
    )
}