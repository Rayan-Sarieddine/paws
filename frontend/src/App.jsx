import "./styles/index.css";
import { Route, Routes } from "react-router-dom";
//Page imports
import Checkout from "./domain/pages/Checkout";
import AdoptAll from "./domain/pages/AdoptAll";
import Adopt from "./domain/pages/Adopt";
import AdoptPet from "./domain/pages/AdoptPet";
import AdoptRequest from "./domain/pages/AdoptRequest";
import Chat from "./domain/pages/Chat";
import CheckoutSuccess from "./domain/pages/CheckoutSuccess";
import Error from "./domain/pages/Error";
import ForgotPassword from "./domain/pages/ForgotPassword";
import FoundReporting from "./domain/pages/FoundReporting";
import Home from "./domain/pages/Home";
import LogIn from "./domain/pages/LogIn";
import LostFoundManual from "./domain/pages/LostFoundManual";
import LostFoundMain from "./domain/pages/LostFoundMain";
import LostFoundManualClaim from "./domain/pages/LostFoundManualClaim";
import LostFoundMatch from "./domain/pages/LostFoundMatch";
import LostFoundNoMatch from "./domain/pages/LostFoundNoMatch";
import LostFoundSearching from "./domain/pages/LostFoundSearching";
import LostReporting from "./domain/pages/LostReporting";
import Shop from "./domain/pages/Shop";
import ShopItem from "./domain/pages/ShopItem";
import SignUp from "./domain/pages/SignUp";
//
import { Provider } from "react-redux";
import { store } from "./core/dataSource/localDataSource/store";
import Terms from "./domain/pages/Terms";
import Editprofile from "./domain/pages/EditProdile";
function App() {
  return (
    <div className="app">
      <Provider store={store}>
        <Routes>
          <Route path="/adopt" element={<Adopt />} />
          <Route path="/adopt-all" element={<AdoptAll />} />
          <Route path="/adopt-details" element={<AdoptPet />} />
          <Route path="/adopt-request" element={<AdoptRequest />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout-success" element={<CheckoutSuccess />} />
          <Route path="/error" element={<Error />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/found-reporting" element={<FoundReporting />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/lost-found-main" element={<LostFoundMain />} />
          <Route path="/lost-found-manual" element={<LostFoundManual />} />
          <Route
            path="/lost-found-manual-claim"
            element={<LostFoundManualClaim />}
          />
          <Route path="/lost-found-match" element={<LostFoundMatch />} />
          <Route path="/lost-found-no-match" element={<LostFoundNoMatch />} />
          <Route
            path="/lost-found-searching"
            element={<LostFoundSearching />}
          />
          <Route path="/lost-found-reporting" element={<LostReporting />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop:id" element={<ShopItem />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/edit" element={<Editprofile />} />
        </Routes>
      </Provider>
    </div>
  );
}

export default App;
