import {Route, Router, Routes} from "react-router";
import Following from "Pages/Merchant/0-Dashboard/Dashboard";
import {DiscoverRoute} from "./Discover";
import Profile from "./Profile";
import {useSelector} from "react-redux";
import Page403 from "../../../third-party/ErrorPages/Page403";

export function Community() {
    const currentUser = useSelector(state => state.auth.currentUser);
    return (
        <div>
            <Routes>
                <Route path="/discover/*"    element={<DiscoverRoute/>}/>
                <Route path="/profile" element={currentUser && currentUser.role === 'buyer' ? <Profile/> : <Page403 />}/>
                <Route path="/profile/:userId" element={<Profile/>}/>
            </Routes>
        </div>
    )
}