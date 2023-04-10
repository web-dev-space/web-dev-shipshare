import {Route, Routes} from "react-router";
import ShipmentMainPage from "../Buyer/2-Shipments/Shipment-Main";
import {Group} from "../Buyer/3-Groups";
import {Community} from "../Buyer/4-Community";
import {Account} from "../Buyer/5-Account";
import {Help} from "../Buyer/6-Help";
import LoginPage from "../0-SignIn & SignUp/SignInPage";
import SignUpPage from "../0-SignIn & SignUp/SignUpPage";
import UsersList from "./1-Users/UsersList";
import Dashboard from "./2-DashBoard/Dashboard";

export default function Admin() {
    return (
        <Routes>
            <Route path="/" element={<UsersList/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
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