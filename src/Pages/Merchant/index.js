import { Route, Routes } from "react-router";
import LoginPage from "Pages/0-SignIn & SignUp/SignInPage";
import SignUpPage from "Pages/0-SignIn & SignUp/SignUpPage";
import MerchantParcelMain from "Pages/Merchant/1-Parcels/MerchantParcel-Main";
import { Account } from "Pages/Buyer/5-Account";
import { Help } from "Pages/Buyer/6-Help";
import { Community } from "Pages/Buyer/4-Community";
import GroupMainMerchant from "Pages/Merchant/3-Groups/GroupMain-Merchant";

// replace below imports with merchant pages
import { Group } from "Pages/Buyer/3-Groups";
// import ShipmentMainPage from "Pages/Buyer/2-Shipments/Shipment-Main";
import DiscoverMerchantPage from "Pages/Merchant/4-Community/Discover/Merchant-Main.js"
import ShipmentsMainMerchant from "Pages/Merchant/2-Shipments/Shipment-MainMerchant"
import GroupDetailPage from "../Buyer/3-Groups/GroupDetail";

export default function Merchant() {
  return (
    <Routes>
      <Route path="/" element={<MerchantParcelMain/>}/>
      <Route path="/parcels" element={<MerchantParcelMain/>}/>
      <Route path="/shipments" element={<ShipmentsMainMerchant/>}/>
      <Route path="/groups/*" element={<GroupMainMerchant/>}/>
      <Route path="/groups/group-details" element={<GroupDetailPage/>}/>
      <Route path="/community/*" element={<Community/>}/>
      <Route path="/account/*" element={<Account/>}/>
      <Route path="/help/*" element={<Help/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/signup" element={<SignUpPage/>}/>
    </Routes>
  );
}