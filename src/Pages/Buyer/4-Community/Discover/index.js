import {Route, Routes} from "react-router";
import Discover from "./Discover";
import PostDetails from "./PostDetails";
import CreatePost from "./CreatePost";

export function DiscoverRoute() {
    return (
        <div>
            <Routes>
                <Route path="/"    element={<Discover/>}/>
                <Route path="/post/:id" element={<PostDetails />}/>
                <Route path="/posts/create-new-post" element={<CreatePost />}/>
            </Routes>
        </div>
    )
}