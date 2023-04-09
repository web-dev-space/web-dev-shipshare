import {Route, Router, Routes} from "react-router";
import GroupMain from "./Group-Main";
import FormGroup from "./FormGroupPage";
import GroupDetail from "./GroupDetail";
import Checkout from "./Checkout";
import GroupMainMerchant from "../../Merchant/3-Groups/GroupMain-Merchant";


export function Group() {
    return (
        <div>
            <Routes>
                <Route path="/"    element={<GroupMain/>}/>
              <Route path="/merchant"    element={<GroupMainMerchant/>}/>
                <Route path="/form-new-group" element={<FormGroup/>}/>
                <Route path="/group-details" element={<GroupDetail/>}/>
                <Route path="/checkout" element={<Checkout/>}/>
            </Routes>
        </div>
    )
}