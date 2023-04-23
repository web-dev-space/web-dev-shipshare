import { Route, Routes } from "react-router";
import ParcelMainPage from "Pages/Buyer/1-Parcels/Parcel-Main";
import ShipmentMainPage from "Pages/Buyer/2-Shipments/Shipment-Main";
import { Group } from "Pages/Buyer/3-Groups";
import { Community } from "Pages/Buyer/4-Community";
import { Account } from "Pages/Buyer/5-Account";
import { Help } from "Pages/Buyer/6-Help";
import LoginPage from "Pages/0-SignIn & SignUp/SignInPage";
import SignUpPage from "Pages/0-SignIn & SignUp/SignUpPage";

export default function Buyer() {
    return (
        <Routes>
            <Route path="/" element={<ParcelMainPage />} />
            <Route path="/parcels" element={<ParcelMainPage />} />
            <Route path="/shipments" element={<ShipmentMainPage />} />
            <Route path="/groups/*" element={<Group />} />
            <Route path="/community/*" element={<Community />} />
            <Route path="/account/*" element={<Account />} />
            <Route path="/help/*" element={<Help />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<SignUpPage />} />
        </Routes>
    );
}
