import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { WithdrawRequest } from "./pages/WithdrawRequest";
import { WithdrawHistory } from "./pages/WithdrawHistory";
import { DepositRequest } from "./pages/DepositRequest";
import { UserProfile } from "./pages/UserProfile";
import { UserList } from "./pages/UserList";
import { UserSegments } from "./pages/UserSegments";
import { WalletDetails } from "./pages/WalletDetails";
import { AddMoneyHistory } from "./pages/AddMoneyHistory";
import { AddMoneyManually } from "./pages/AddMoneyManually";
import { WithdrawMoneyManually } from "./pages/WithdrawMoneyManually";
import { UserGameProfitLoss } from "./pages/UserGameProfitLoss";
import { UserPointsHistory } from "./pages/UserPointsHistory";
import { UserProfitLoss } from "./pages/UserProfitLoss";
import { GameReport } from "./pages/GameReport";
import { WinReport } from "./pages/WinReport";
import { WithdrawMoneyHistory } from "./pages/WithdrawMoneyHistory";
import { ProfitLoose } from "./pages/ProfitLoose";
import { ProfitLooseStarline } from "./pages/ProfitLooseStarline";
import { ResultReport } from "./pages/ResultReport";
import { ReportGeneration } from "./pages/ReportGeneration";
import { ReportGenerationStarline } from "./pages/ReportGenerationStarline";
import { WinHistory } from "./pages/WinHistory";
import { WinHistoryStarline } from "./pages/WinHistoryStarline";
import { AddGame } from "./pages/AddGame";
import { GameCancel } from "./pages/GameCancel";
import { FundingPlayer } from "./pages/FundingPlayer";
import { ActivityLogs } from "./pages/ActivityLogs";
import { ToastContainer } from "./components/common/Toast";
import {
  ProfileSettings,
  GameOnOff,
  GameOnOffStarline,
  RulesSet,
  BlockUpi,
  UpiAR,
  NoticeBoard,
  PersonalNoticeBoard,
  VideoSettings,
  BlockDeviceList,
  GameRate,
  AllResult,
} from "./pages/Settings";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/withdraw-request" element={<WithdrawRequest />} />
        <Route path="/withdraw-history" element={<WithdrawHistory />} />
        <Route path="/deposit-request" element={<DepositRequest />} />
        <Route path="/user-profile/:userId" element={<UserProfile />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/user-segments" element={<UserSegments />} />
        <Route path="/wallet-details" element={<WalletDetails />} />
        <Route path="/add-money-history" element={<AddMoneyHistory />} />
        <Route path="/add-money-manually" element={<AddMoneyManually />} />
        <Route
          path="/withdraw-money-manually"
          element={<WithdrawMoneyManually />}
        />
        <Route path="/user-game-profit-loss" element={<UserGameProfitLoss />} />
        <Route path="/user-points-history" element={<UserPointsHistory />} />
        <Route path="/user-profit-loss" element={<UserProfitLoss />} />
        <Route path="/game-report" element={<GameReport />} />
        <Route path="/win-report" element={<WinReport />} />
        <Route
          path="/withdraw-money-history"
          element={<WithdrawMoneyHistory />}
        />
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
        <Route path="/win-history-starline" element={<WinHistoryStarline />} />
        <Route path="/add-game" element={<AddGame />} />
        <Route path="/game-cancel" element={<GameCancel />} />
        <Route path="/funding-player" element={<FundingPlayer />} />
        <Route path="/activity-logs" element={<ActivityLogs />} />

        {/* Settings Routes */}
        <Route path="/settings/profile" element={<ProfileSettings />} />
        <Route path="/settings/game-on-off" element={<GameOnOff />} />
        <Route
          path="/settings/game-on-off-starline"
          element={<GameOnOffStarline />}
        />
        <Route path="/settings/rules-set" element={<RulesSet />} />
        <Route path="/settings/block-upi" element={<BlockUpi />} />
        <Route path="/settings/upi-ar" element={<UpiAR />} />
        <Route path="/settings/notice-board" element={<NoticeBoard />} />
        <Route
          path="/settings/personal-notice-board"
          element={<PersonalNoticeBoard />}
        />
        <Route path="/settings/video" element={<VideoSettings />} />
        <Route
          path="/settings/block-device-list"
          element={<BlockDeviceList />}
        />
        <Route path="/settings/game-rate" element={<GameRate />} />
        <Route path="/settings/all-result" element={<AllResult />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
