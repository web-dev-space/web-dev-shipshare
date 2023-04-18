import {Route, Routes} from "react-router";
import LoginPage from "Pages/0-SignIn & SignUp/SignInPage";
import SignUpPage from "Pages/0-SignIn & SignUp/SignUpPage";
import {Account} from "Pages/Buyer/5-Account";
import {Help} from "Pages/Buyer/6-Help";
import {Community} from "Pages/Buyer/4-Community";

// replace below imports with merchant pages
import Dashboard from "Pages/Merchant/0-Dashboard/Dashboard";
import ShipmentsMainMerchant from "Pages/Merchant/2-Shipments/Shipment-MainMerchant"
import GroupMainMerchant from "Pages/Merchant/3-Groups/GroupMain-Merchant";
import ChangeWarehouse from "Pages/Merchant/4-Account/ChangeWarehouseAddress";
import ParcelMain from "../Buyer/1-Parcels/Parcel-Main";
import GroupDetailMerchant from "Pages/Merchant/3-Groups/GroupDetail-Merchant";


export default function Merchant() {
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

      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/signup" element={<SignUpPage/>}/>
    </Routes>
  );
}