import {Route, Router, Routes} from "react-router";
import CalculateFees from "./CalculateFees";
import Tutorials from "./Tutorials";

export function Help() {
    return (
        <div>
            <Routes>
                <Route path="/"    element={<CalculateFees/>}/>
                <Route path="/tutorials" element={<Tutorials/>}/>
                {/*<Route path="warehouse-address"    element={<WarehouseAddress/>}/>*/}
                {/*<Route path="time-costs" element={<TimeAndCosts/>}/>*/}
                <Route path="/calculate-fees" element={<CalculateFees/>}/>
            </Routes>
        </div>
    )
}