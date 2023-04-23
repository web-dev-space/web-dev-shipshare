import {Route, Routes} from "react-router";
import {DiscoverRoute} from "./Discover";
import Profile from "Pages/Buyer/4-Community/Profile";
import {useSelector} from "react-redux";
import Page403 from "../../../@mui-library/ErrorPages/Page403";
import SearchProducts from "./Products/SearchProducts";
import ProductDetails from "./Products/ProductDetails";

export function Community() {
    const currentUser = useSelector(state => state.auth.currentUser);
    return (
        <div>
            <Routes>
                <Route path="/discover/*"    element={<DiscoverRoute/>}/>
                <Route path="/profile" element={currentUser && currentUser.role === 'buyer' ? <Profile/> : <Page403 />}/>
                <Route path="/profile/:userId" element={<Profile/>}/>
                <Route path="/products" element={<SearchProducts/>}/>
                <Route path="/products/:productId" element={<ProductDetails/>}/>
            </Routes>
        </div>
    )
}