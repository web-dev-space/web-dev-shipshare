import {Route, Routes} from "react-router";
import Discover from "./Discover";
import PostDetails from "./PostDetails";
import CreatePost from "./CreatePost";

export function DiscoverRoute() {
    return (
        <div>
            <Routes>
                <Route path="/"    element={<Discover/>}/>
                <Route path="/post" element={<PostDetails />}/>
                <Route path="/create-new-post" element={<CreatePost />}/>
            </Routes>
        </div>
    )
}