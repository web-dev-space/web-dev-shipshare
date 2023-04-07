import {Route, Routes} from "react-router";
import Discover from "./Discover";
import PostDetails from "./PostDetails";

export function DiscoverRoute() {
    return (
        <div>
            <Routes>
                <Route path="/"    element={<Discover/>}/>
                <Route path="/post" element={<PostDetails />}/>
            </Routes>
        </div>
    )
}