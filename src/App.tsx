import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/auth";
import { Login, VerifyOTP } from "./pages/Auth";
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
import { BidHistory } from "./pages/BidHistory";
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
import { FundingPlayer, PlayerFunding } from "./pages/FundingPlayer";
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
      <AuthProvider>
        <ToastContainer />
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/withdraw-request"
            element={
              <ProtectedRoute>
                <WithdrawRequest />
              </ProtectedRoute>
            }
          />
          <Route
            path="/withdraw-history"
            element={
              <ProtectedRoute>
                <WithdrawHistory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/deposit-request"
            element={
              <ProtectedRoute>
                <DepositRequest />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user-profile/:userId"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <UserList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user-segments"
            element={
              <ProtectedRoute>
                <UserSegments />
              </ProtectedRoute>
            }
          />
          <Route
            path="/wallet-details"
            element={
              <ProtectedRoute>
                <WalletDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-money-history"
            element={
              <ProtectedRoute>
                <AddMoneyHistory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-money-manually"
            element={
              <ProtectedRoute>
                <AddMoneyManually />
              </ProtectedRoute>
            }
          />
          <Route
            path="/withdraw-money-manually"
            element={
              <ProtectedRoute>
                <WithdrawMoneyManually />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user-game-profit-loss"
            element={
              <ProtectedRoute>
                <UserGameProfitLoss />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user-points-history"
            element={
              <ProtectedRoute>
                <UserPointsHistory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bid-history"
            element={
              <ProtectedRoute>
                <BidHistory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user-profit-loss"
            element={
              <ProtectedRoute>
                <UserProfitLoss />
              </ProtectedRoute>
            }
          />
          <Route
            path="/game-report"
            element={
              <ProtectedRoute>
                <GameReport />
              </ProtectedRoute>
            }
          />
          <Route
            path="/win-report"
            element={
              <ProtectedRoute>
                <WinReport />
              </ProtectedRoute>
            }
          />
          <Route
            path="/withdraw-money-history"
            element={
              <ProtectedRoute>
                <WithdrawMoneyHistory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profit-loose"
            element={
              <ProtectedRoute>
                <ProfitLoose />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profit-loose-starline"
            element={
              <ProtectedRoute>
                <ProfitLooseStarline />
              </ProtectedRoute>
            }
          />
          <Route
            path="/result-report"
            element={
              <ProtectedRoute>
                <ResultReport />
              </ProtectedRoute>
            }
          />
          <Route
            path="/report-generation"
            element={
              <ProtectedRoute>
                <ReportGeneration />
              </ProtectedRoute>
            }
          />
          <Route
            path="/report-generation-starline"
            element={
              <ProtectedRoute>
                <ReportGenerationStarline />
              </ProtectedRoute>
            }
          />
          <Route
            path="/win-history"
            element={
              <ProtectedRoute>
                <WinHistory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/win-history-starline"
            element={
              <ProtectedRoute>
                <WinHistoryStarline />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-game"
            element={
              <ProtectedRoute>
                <AddGame />
              </ProtectedRoute>
            }
          />
          <Route
            path="/game-cancel"
            element={
              <ProtectedRoute>
                <GameCancel />
              </ProtectedRoute>
            }
          />
          <Route
            path="/funding-player"
            element={
              <ProtectedRoute>
                <FundingPlayer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/player-funding/:userId"
            element={
              <ProtectedRoute>
                <PlayerFunding />
              </ProtectedRoute>
            }
          />
          <Route
            path="/activity-logs"
            element={
              <ProtectedRoute>
                <ActivityLogs />
              </ProtectedRoute>
            }
          />

          {/* Settings Routes */}
          <Route
            path="/settings/profile"
            element={
              <ProtectedRoute>
                <ProfileSettings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings/game-on-off"
            element={
              <ProtectedRoute>
                <GameOnOff />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings/game-on-off-starline"
            element={
              <ProtectedRoute>
                <GameOnOffStarline />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings/rules-set"
            element={
              <ProtectedRoute>
                <RulesSet />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings/block-upi"
            element={
              <ProtectedRoute>
                <BlockUpi />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings/upi-ar"
            element={
              <ProtectedRoute>
                <UpiAR />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings/notice-board"
            element={
              <ProtectedRoute>
                <NoticeBoard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings/personal-notice-board"
            element={
              <ProtectedRoute>
                <PersonalNoticeBoard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings/video"
            element={
              <ProtectedRoute>
                <VideoSettings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings/block-device-list"
            element={
              <ProtectedRoute>
                <BlockDeviceList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings/game-rate"
            element={
              <ProtectedRoute>
                <GameRate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings/all-result"
            element={
              <ProtectedRoute>
                <AllResult />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
