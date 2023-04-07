import {Route, Router, Routes} from "react-router";
import GroupMain from "./Group-Main";
import FormGroup from "./FormGroupPage";
import GroupDetail from "./GroupDetail";


export function Group() {
    return (
        <div>
            <Routes>
                <Route path="/"    element={<GroupMain/>}/>
                {/*<Route path="/group"    element={<GroupMain/>}/>*/}
                <Route path="/form-new-group" element={<FormGroup/>}/>
              <Route path="/group-details" element={<GroupDetail/>}/>
            </Routes>
        </div>
    )
}