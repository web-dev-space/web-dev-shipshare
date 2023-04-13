import {Route, Routes} from "react-router";
import ParcelMainPage from "./Buyer/1-Parcels/Parcel-Main";
import ShipmentMainPage from "./Buyer/2-Shipments/Shipment-Main";
import {Group} from "./Buyer/3-Groups";
import {Community} from "./Buyer/4-Community";
import {Account} from "./Buyer/5-Account";
import {Help} from "./Buyer/6-Help";
import {useSelector} from "react-redux";
import Dashboard from "./Admin/2-DashBoard/Dashboard";
import UserList from "./Admin/1-Users/UserList";
import ParcelMain from "./Buyer/1-Parcels/Parcel-Main";
import ShipmentsMainMerchant from "./Merchant/2-Shipments/Shipment-MainMerchant";
import GroupMainMerchant from "./Merchant/3-Groups/GroupMain-Merchant";
import ChangeWarehouse from "./Merchant/4-Account/ChangeWarehouseAddress";
import GroupDetailMerchant from "./Merchant/3-Groups/GroupDetail-Merchant";


export function MainIndex() {
    const currentUser = useSelector(state => state.auth.currentUser);
    if (currentUser === null)
        return (
            <Routes>
                <Route path="/parcels" element={<ParcelMainPage />} />
                <Route path="/shipments" element={<ShipmentMainPage />} />
                <Route path="/groups/*" element={<Group />} />
                <Route path="/community/*" element={<Community />} />
                <Route path="/account/*" element={<Account />} />
                <Route path="/help/*" element={<Help />} />
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
            </Routes>
    )
    else if (currentUser.role === "merchant")
        return (
            <Routes>
                <Route path="/" element={<Dashboard/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/parcels" element={<ParcelMain/>}/>
                <Route path="/shipments" element={<ShipmentsMainMerchant/>}/>
                <Route path="/groups/*" element={<GroupMainMerchant/>}/>
                <Route path="/groups/group-details" element={<GroupDetailMerchant/>}/>
                <Route path="/community/*" element={<Community/>}/>
                <Route path="/account/*" element={<Account/>}/>
                <Route path="/account/change-warehouse-address" element={<ChangeWarehouse/>}/>
                <Route path="/help/*" element={<Help/>}/>
            </Routes>
        )
    else if (currentUser.role === "admin")
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
                <Route path="/change-warehouse-address" element={<ChangeWarehouse/>} />
                <Route path="/help/*" element={<Help />} />
            </Routes>
    )
}