import {Route, Router, Routes} from "react-router";
import ChangePassword from "./Change-Password";
import AccountInfo from "./Account-Info";

export function Account() {
    return (
        <div>
            <Routes>
                <Route path="/"    element={<AccountInfo/>}/>
                <Route path="change-password"    element={<ChangePassword/>}/>
                <Route path="account-info" element={<AccountInfo/>}/>
            </Routes>
        </div>
    )
}