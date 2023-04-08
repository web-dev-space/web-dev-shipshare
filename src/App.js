import {BrowserRouter} from 'react-router-dom';
// theme
import ThemeProvider from './third-party/theme';
// components
import SnackbarProvider from "./third-party/components/snackbar";
import {
  ThemeSettings,
  SettingsProvider,
} from "./third-party/components/settings";
import {MotionLazyContainer} from "./third-party/components/animate";
import ScrollToTop from "./third-party/components/scroll-to-top";

import SnackbarProvider from './third-party/components/snackbar';
import {ThemeSettings, SettingsProvider} from './third-party/components/settings';
import {MotionLazyContainer} from './third-party/components/animate';
import ScrollToTop from './third-party/components/scroll-to-top';
import ParcelMainPage from "./Pages/1-Parcels/Parcel-Main";
import ShipmentMainPage from "./Pages/2-Shipments/Shipment-Main.js";
import {Route, Routes} from "react-router";
import {Group} from "./Pages/3-Groups";
import {Account} from "./Pages/5-Account";
import {Community} from "./Pages/4-Community";
import {Help} from "./Pages/6-Help";
import {faCube} from "@fortawesome/free-solid-svg-icons";
import {library} from "@fortawesome/fontawesome-svg-core";
import {Provider} from "react-redux";
import store from "./redux/store";
import {Route, Routes} from "react-router";
import {Group} from "./Pages/3-Groups";
import {Account} from "./Pages/5-Account";
import {Community} from "./Pages/4-Community";
import {Help} from "./Pages/6-Help";
import {faCube} from "@fortawesome/free-solid-svg-icons";
import {library} from "@fortawesome/fontawesome-svg-core";
import LoginPage from "./Pages/0-SignIn & SignUp/SignInPage";
import SignUpPage from "./Pages/0-SignIn & SignUp/SignUpPage";

// ----------------------------------------------------------------------

export default function App() {
  library.add(faCube);

  return (
    <SettingsProvider>
      <Provider store={store}>
        <BrowserRouter>
          <ScrollToTop/>
          <MotionLazyContainer>
            <ThemeProvider>
              <ThemeSettings>
                <SnackbarProvider>
                  {/*---------------Main Routers----------------*/}
                  <Routes>
                    <Route path="/" element={<ParcelMainPage/>}/>
                    <Route path="/parcels" element={<ParcelMainPage/>}/>
                    <Route path="/shipments" element={<ShipmentMainPage/>}/>
                    <Route path="/groups/*" element={<Group/>}/>
                    <Route path="/community/*" element={<Community/>}/>
                    <Route path="/account/*" element={<Account/>}/>
                    <Route path="/help/*" element={<Help/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/signup" element={<SignUpPage/>}/>
                  </Routes>
                  {/*------------------------------------*/}
                </SnackbarProvider>
              </ThemeSettings>
            </ThemeProvider>
          </MotionLazyContainer>
        </BrowserRouter>
      </Provider>
    </SettingsProvider>
  );
}
