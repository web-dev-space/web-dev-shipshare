import {Route, Router, Routes} from "react-router";
import Following from "./Follow";
import Discover from "./Discover";
import Profile from "./Profile";
import PostDetails from "./PostDetails";

export function Community() {
    return (
        <div>
            <Routes>
                <Route path="/"    element={<Discover/>}/>
                <Route path="/discover"    element={<Discover/>}/>
                <Route path="/follow"    element={<Following/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/posts" element={<PostDetails />}/>
            </Routes>
        </div>
    )
}