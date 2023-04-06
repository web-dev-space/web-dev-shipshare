import {Route, Router, Routes} from "react-router";
import Following from "./follow";
import Discover from "./Discover";
import MyProfile from "./MyProfile";

export function Community() {
    return (
        <div>
            <Routes>
                <Route path="/"    element={<Discover/>}/>
                <Route path="/discover"    element={<Discover/>}/>
                <Route path="/follow"    element={<Following/>}/>
                <Route path="/profile" element={<MyProfile/>}/>
            </Routes>
        </div>
    )
}