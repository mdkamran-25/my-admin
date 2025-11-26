import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { WithdrawRequest } from "./pages/WithdrawRequest";
import { UserProfile } from "./pages/UserProfile";
import { UserList } from "./pages/UserList";
import { ProfitLoose } from "./pages/ProfitLoose";
import { ProfitLooseStarline } from "./pages/ProfitLooseStarline";
import { ResultReport } from "./pages/ResultReport";
import { ReportGeneration } from "./pages/ReportGeneration";
import { ReportGenerationStarline } from "./pages/ReportGenerationStarline";
import { WinHistory } from "./pages/WinHistory";
import { AddGame } from "./pages/AddGame";
import { GameCancel } from "./pages/GameCancel";
import { FundingPlayer } from "./pages/FundingPlayer";
import { ActivityLogs } from "./pages/ActivityLogs";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/withdraw-request" element={<WithdrawRequest />} />
        <Route path="/user-profile/:userId" element={<UserProfile />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/profit-loose" element={<ProfitLoose />} />
        <Route
          path="/profit-loose-starline"
          element={<ProfitLooseStarline />}
        />
        <Route path="/result-report" element={<ResultReport />} />
        <Route path="/report-generation" element={<ReportGeneration />} />
        <Route
          path="/report-generation-starline"
          element={<ReportGenerationStarline />}
        />
        <Route path="/win-history" element={<WinHistory />} />
        <Route path="/add-game" element={<AddGame />} />
        <Route path="/game-cancel" element={<GameCancel />} />
        <Route path="/funting-player" element={<FundingPlayer />} />
        <Route path="/activity-logs" element={<ActivityLogs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
