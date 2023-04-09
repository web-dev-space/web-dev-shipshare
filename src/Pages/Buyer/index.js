import {Route, Routes} from "react-router";
import ParcelMainPage from "./1-Parcels/Parcel-Main";
import ShipmentMainPage from "./2-Shipments/Shipment-Main";
import {Group} from "./3-Groups";
import {Community} from "./4-Community";
import {Account} from "./5-Account";
import {Help} from "./6-Help";
import LoginPage from "../0-SignIn & SignUp/SignInPage";
import SignUpPage from "../0-SignIn & SignUp/SignUpPage";

export default function Buyer() {
    return (
        <Routes>
            <Route path="/" element={<ParcelMainPage/>}/>
            <Route path="/parcels" element={<ParcelMainPage/>}/>
            <Route path="/shipments" element={<ShipmentMainPage/>}/>
            <Route path="/groups/*" element={<Group/>}/>
            <Route path="/community/*" element={<Community/>}/>
            <Route path="/account/*" element={<Account/>}/>
            <Route path="/help/*" element={<Help/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/signup" element={<SignUpPage/>}/>
        </Routes>
  );
}