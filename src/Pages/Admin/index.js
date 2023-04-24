import LoginPage from "Pages/0-SignIn & SignUp/SignInPage";
import SignUpPage from "Pages/0-SignIn & SignUp/SignUpPage";
import UserList from "Pages/Admin/1-Users/UserList.js";
import Dashboard from "Pages/Admin/2-DashBoard/Dashboard";
import ParcelMain from "Pages/Buyer/1-Parcels/Parcel-Main";
import { Community } from "Pages/Buyer/4-Community";
import { Account } from "Pages/Buyer/5-Account";
import { Help } from "Pages/Buyer/6-Help";
import ShipmentsMainMerchant from "Pages/Merchant/2-Shipments/Shipment-MainMerchant";
import GroupMainMerchant from "Pages/Merchant/3-Groups/GroupMain-Merchant";
import ChangeWarehouse from "Pages/Merchant/4-Account/ChangeWarehouseAddress";
import { Route, Routes } from "react-router";

export default function Admin() {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/userlist" element={<UserList />} />
            <Route path="/parcels" element={<ParcelMain />} />
            <Route path="/shipments" element={<ShipmentsMainMerchant />} />
            <Route path="/groups/*" element={<GroupMainMerchant />} />
            <Route path="/community/*" element={<Community />} />
            <Route path="/account/*" element={<Account />} />
            <Route path="/account/change-warehouse-address" element={<ChangeWarehouse/>} />
            <Route path="/help/*" element={<Help />} />

            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<SignUpPage />} />
        </Routes>
    );
}