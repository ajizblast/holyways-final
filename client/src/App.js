import "./style/holyways.css"
import Home from "./component/home/home";
import Profile from "./component/profile/profile";
import RaiseFund from "./component/raise-fund/raiseFund";
import FormFund from "./component/create-fund/createFund";
import DetailDonate from "./component/detail-donate/detailDonate";
import EditFund from "./component/edit-fund/editFund";
import { setAuthToken } from "./config/api";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import PrivateLogin from "./privateLogin";
if (localStorage.token) {
  setAuthToken(localStorage.token);
}
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/" element={<PrivateLogin />}>
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/raise-fund" element={<RaiseFund />} />
          <Route exact path="/create-fund" element={<FormFund />} />
          <Route exact path="/detail-donation/:id" element={<DetailDonate />} />
          <Route exact path="/edit-fund/:id" element={<EditFund />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;