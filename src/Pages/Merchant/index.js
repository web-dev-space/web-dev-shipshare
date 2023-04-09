import {Route, Routes} from "react-router";
import LoginPage from "../0-SignIn & SignUp/SignInPage";
import SignUpPage from "../0-SignIn & SignUp/SignUpPage";
import MerchantParcelMain from "./1-Parcels/MerchantParcel-Main";
import {Account} from "../Buyer/5-Account";
import {Help} from "../Buyer/6-Help";
import {Community} from "../Buyer/4-Community";

// replace below imports with merchant pages
import {Group} from "../Buyer/3-Groups";
import ShipmentMainPage from "../Buyer/2-Shipments/Shipment-Main";

export default function Merchant() {
    return (
        <Routes>
            <Route path="/" element={<MerchantParcelMain/>}/>
            <Route path="/parcels" element={<MerchantParcelMain/>}/>
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