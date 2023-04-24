import GroupMainMerchant from "Pages/Merchant/3-Groups/GroupMain-Merchant";
import { Route, Routes } from "react-router";
import Checkout from "./Checkout";
import FormGroup from "./FormGroupPage";
import GroupMain from "./Group-Main";
import GroupDetail from "./GroupDetail";


export function Group() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<GroupMain/>}/>
        <Route path="/merchant" element={<GroupMainMerchant/>}/>
        <Route path="/form-new-group" element={<FormGroup/>}/>
        <Route path="/group-details" element={<GroupDetail/>}/>
        <Route path="/group-details/checkout" element={<Checkout/>}/>
        <Route path="/checkout" element={<Checkout/>}/>
      </Routes>
    </div>
  )
}