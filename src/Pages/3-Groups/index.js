import {Route, Router, Routes} from "react-router";
import GroupMain from "./Group-Main";
import FormGroup from "./FormGroupPageOne";

export function Group() {
    return (
        <div>
            <Routes>
                <Route path="/"    element={<GroupMain/>}/>
                <Route path="/group"    element={<GroupMain/>}/>
                <Route path="/form-new-group" element={<FormGroup/>}/>
            </Routes>
        </div>
    )
}