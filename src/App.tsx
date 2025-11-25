import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { WithdrawRequest } from "./pages/WithdrawRequest";
import { UserProfile } from "./pages/UserProfile";
import { UserList } from "./pages/UserList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/withdraw-request" element={<WithdrawRequest />} />
        <Route path="/user-profile/:userId" element={<UserProfile />} />
        <Route path="/users" element={<UserList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
