import {Route, Routes} from "react-router";
import {DiscoverRoute} from "./Discover";
import Profile from "Pages/Buyer/4-Community/Profile";
import {useSelector} from "react-redux";
import Page403 from "../../../@mui-library/ErrorPages/Page403";
import SearchProducts from "Pages/Buyer/4-Community/Products/SearchProducts";
import ProductDetails from "Pages/Buyer/4-Community/Products/ProductDetails";

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