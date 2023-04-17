import { Route, Routes } from "react-router";
import ParcelMainPage from "Pages/Buyer/1-Parcels/Parcel-Main";
import ShipmentMainPage from "Pages/Buyer/2-Shipments/Shipment-Main";
import { Group } from "Pages/Buyer/3-Groups";
import { Community } from "Pages//Buyer/4-Community";
import { Account } from "Pages/Buyer/5-Account";
import { Help } from "Pages/Buyer/6-Help";
import { useSelector } from "react-redux";
import DashboardMerchant from "Pages/Merchant/0-Dashboard/Dashboard.js";
import DashboardAdmin from "Pages/Admin/2-DashBoard/Dashboard";
import UserList from "Pages/Admin/1-Users/UserList";
import ParcelMain from "Pages/Buyer/1-Parcels/Parcel-Main";
import ShipmentsMainMerchant from "Pages/Merchant/2-Shipments/Shipment-MainMerchant";
import GroupMainMerchant from "Pages/Merchant/3-Groups/GroupMain-Merchant";
import ChangeWarehouse from "Pages/Merchant/4-Account/ChangeWarehouseAddress";
import GroupDetailMerchant from "Pages/Merchant/3-Groups/GroupDetail-Merchant";
import Page404 from "third-party/ErrorPages/Page404";
import Page403 from "third-party/ErrorPages/Page403";


export function MainIndex() {
    const currentUser = useSelector(state => state.auth.currentUser);
    if (currentUser === null)
        return (
            <Routes>
                <Route path="/parcels" element={<ParcelMainPage />} />
                <Route path="/shipments" element={<ShipmentMainPage />} />
                <Route path="/groups/*" element={<Group />} />
                <Route path="/community/*" element={<Community />} />
                <Route path="/help/*" element={<Help />} />

                <Route path="/userlist" element={<Page403 />} />
                <Route path="/dashboard" element={<Page403 />} />
                <Route path="/account/change-warehouse-address" element={<Page403 />} />
                <Route path="/account/*" element={<Page403 />} />
                <Route path="/*" element={<Page404 />} />
            </Routes>
        );
    else if (currentUser.role === "buyer")
        return (
            <Routes>
                <Route path="/parcels" element={<ParcelMainPage />} />
                <Route path="/shipments" element={<ShipmentMainPage />} />
                <Route path="/groups/*" element={<Group />} />
                <Route path="/community/*" element={<Community />} />
                <Route path="/account/*" element={<Account />} />
                <Route path="/help/*" element={<Help />} />

                <Route path="/userlist" element={<Page403 />} />
                <Route path="/dashboard" element={<Page403 />} />
                <Route path="/account/change-warehouse-address" element={<Page403 />} />
                <Route path="/*" element={<Page404 />} />
            </Routes>
        )
    else if (currentUser.role === "merchant")
        return (
            <Routes>
                <Route path="/" element={<DashboardMerchant />} />
                <Route path="/dashboard" element={<DashboardMerchant />} />
                <Route path="/parcels" element={<ParcelMain />} />
                <Route path="/shipments" element={<ShipmentsMainMerchant />} />
                <Route path="/groups/*" element={<GroupMainMerchant />} />
                <Route path="/groups/group-details" element={<GroupDetailMerchant />} />
                <Route path="/community/*" element={<Community />} />
                <Route path="/account/*" element={<Account />} />
                <Route path="/account/change-warehouse-address" element={<ChangeWarehouse />} />
                <Route path="/help/*" element={<Help />} />

                <Route path="/userlist" element={<Page403 />} />
                <Route path="/*" element={<Page404 />} />
            </Routes>
        )
    else if (currentUser.role === "admin")
        return (
            <Routes>
                <Route path="/" element={<DashboardAdmin />} />
                <Route path="/dashboard" element={<DashboardAdmin />} />
                <Route path="/userlist" element={<UserList />} />
                <Route path="/parcels" element={<ParcelMain />} />
                <Route path="/shipments" element={<ShipmentsMainMerchant />} />
                <Route path="/groups/*" element={<GroupMainMerchant />} />
                <Route path="/groups/group-details" element={<GroupDetailMerchant />} />
                <Route path="/community/*" element={<Community />} />
                <Route path="/account/*" element={<Account />} />
                <Route path="/account/change-warehouse-address" element={<ChangeWarehouse/>} />
                <Route path="/help/*" element={<Help />} />
                <Route path="/*" element={<Page404 />} />
            </Routes>
        )
}