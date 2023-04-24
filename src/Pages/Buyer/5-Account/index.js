import { Route, Routes } from "react-router";
import AccountInfo from "./AccountInfo";
import ChangePassword from "./Change-Password";

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