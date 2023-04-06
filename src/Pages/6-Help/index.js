import {Route, Router, Routes} from "react-router";
import CalculateFees from "./CalculateFees";
import Tutorials from "./Tutorials";
import Warehouse from "./Warehouse";
import TimeCost from "./TimeCost";

export function Help() {
    return (
        <div>
            <Routes>
                <Route path="/"    element={<CalculateFees/>}/>
                <Route path="/tutorials" element={<Tutorials/>}/>
                <Route path="warehouse-address"    element={<Warehouse/>}/>
                <Route path="time-costs" element={<TimeCost/>}/>
                <Route path="/calculate-fees" element={<CalculateFees/>}/>
            </Routes>
        </div>
    )
}