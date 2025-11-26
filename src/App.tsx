import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { WithdrawRequest } from "./pages/WithdrawRequest";
import { UserProfile } from "./pages/UserProfile";
import { UserList } from "./pages/UserList";
import { ProfitLoose } from "./pages/ProfitLoose";
import { ResultReport } from "./pages/ResultReport";
import { ReportGeneration } from "./pages/ReportGeneration";
import { WinHistory } from "./pages/WinHistory";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/withdraw-request" element={<WithdrawRequest />} />
        <Route path="/user-profile/:userId" element={<UserProfile />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/profit-loose" element={<ProfitLoose />} />
        <Route path="/result-report" element={<ResultReport />} />
        <Route path="/report-generation" element={<ReportGeneration />} />
        <Route path="/win-history" element={<WinHistory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
