import {Route, Router, Routes} from "react-router";
import Following from "Pages/Merchant/0-Dashboard/Dashboard";
import {DiscoverRoute} from "./Discover";
import Profile from "./Profile";

export function Community() {
    return (
        <div>
            <Routes>
                <Route path="/discover/*"    element={<DiscoverRoute/>}/>
                <Route path="/profile" element={<Profile/>}/>
            </Routes>
        </div>
    )
}