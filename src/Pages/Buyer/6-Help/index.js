import { Route, Routes } from "react-router";
import CalculateFees from "./CalculateFees";
import TimeCost from "./TimeCost";
import TutorialPages from "./TutorialPages";
import Tutorials from "./Tutorials";
import Warehouse from "./Warehouse";

export function Help() {
    return (
        <div>
            <Routes>
                <Route path="/"    element={<CalculateFees/>}/>
                <Route path="/tutorials" element={<Tutorials/>}/>
                <Route path="/tutorial/pages" element={<TutorialPages/>}/>
                <Route path="/warehouse-address"    element={<Warehouse/>}/>
                <Route path="/time-costs" element={<TimeCost/>}/>
                <Route path="/calculate-fees" element={<CalculateFees/>}/>
            </Routes>
        </div>
    )
}