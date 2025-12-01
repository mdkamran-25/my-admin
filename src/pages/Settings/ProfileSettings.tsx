// Profile Settings Page

import { memo, useState, useCallback } from "react";
import { Layout } from "../../components/layout/Layout";
import { BackButton } from "../../components/common/BackButton";

export const ProfileSettings = memo(() => {
  // Contact Settings
  const [phoneNumber, setPhoneNumber] = useState("9179725740");
  const [whatsappNumber, setWhatsappNumber] = useState("9179725740");
  const [telegram, setTelegram] = useState("");

  // UPI Settings
  const [upi, setUpi] = useState("0796451A0222124.bqr@kotak");

  // Bonus & Payment Settings
  const [firstRechargeBonus, setFirstRechargeBonus] = useState("");
  const [paymentAccept, setPaymentAccept] = useState("IMB");
  const [paymentOptions, setPaymentOptions] = useState("");
  const [bonus, setBonus] = useState("20");

  // Recharge Limits
  const [minRecharge, setMinRecharge] = useState("199");
  const [maxRecharge, setMaxRecharge] = useState("5000");

  // Withdraw Settings
  const [minWithdraw, setMinWithdraw] = useState("500");
  const [withdrawWithInfo, setWithdrawWithInfo] = useState<"ON" | "OFF">("ON");
  const [moneyWithdrawStart, setMoneyWithdrawStart] = useState("5:30 pm");
  const [moneyWithdrawEnd, setMoneyWithdrawEnd] = useState("6:30 pm");
  const [withdrawOnOff, setWithdrawOnOff] = useState<"ON" | "OFF">("ON");
  const [processing, setProcessing] = useState<"ON" | "OFF">("ON");

  // Withdraw Limits
  const [withdrawCountLimit, setWithdrawCountLimit] = useState("2");
  const [withdrawTotalAmountLimit, setWithdrawTotalAmountLimit] =
    useState("200");
  const [maxWithdraw, setMaxWithdraw] = useState("99000");

  // Bid Settings
  const [minBid, setMinBid] = useState("5");
  const [maintainBalance, setMaintainBalance] = useState("-1");

  // System Settings
  const [upiType, setUpiType] = useState("QRCODE");
  const [loginOption, setLoginOption] = useState("OTP");
  const [forgetPassword, setForgetPassword] = useState("OTP");

  // Withdraw Hide Show UPI
  const [phonePe, setPhonePe] = useState(false);
  const [gPay, setGPay] = useState(false);
  const [paytm, setPaytm] = useState(false);
  const [bank, setBank] = useState(true);

  // Toast state
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 2000);
  };

  const handleUpdate = useCallback((field: string) => {
    showToast(`${field} updated successfully!`);
  }, []);

  const handleRefresh = useCallback(() => {
    console.log("Refreshing settings...");
  }, []);

  return (
    <Layout onRefresh={handleRefresh}>
      <BackButton />

      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-pulse">
          {toast}
        </div>
      )}

      {/* Contact Section */}
      <div className="bg-white rounded-xl p-4 mb-4 shadow-sm">
        {/* Phone Number */}
        <div className="mb-4">
          <label className="block text-gray-800 font-medium mb-2">
            Phone Number
          </label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* WhatsApp Number */}
        <div className="mb-4">
          <label className="block text-gray-800 font-medium mb-2">
            WhatsApp number
          </label>
          <input
            type="text"
            value={whatsappNumber}
            onChange={(e) => setWhatsappNumber(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Telegram */}
        <div className="mb-4">
          <label className="block text-gray-800 font-medium mb-2">
            Telegram
          </label>
          <input
            type="text"
            value={telegram}
            onChange={(e) => setTelegram(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={() => handleUpdate("Contact info")}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
        >
          Update
        </button>
      </div>

      {/* UPI Section */}
      <div className="bg-white rounded-xl p-4 mb-4 shadow-sm">
        <div className="mb-4">
          <label className="block text-gray-800 font-medium mb-2">upi</label>
          <input
            type="text"
            value={upi}
            onChange={(e) => setUpi(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={() => handleUpdate("UPI")}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
        >
          Update
        </button>
      </div>

      {/* Bonus & Payment Section */}
      <div className="bg-white rounded-xl p-4 mb-4 shadow-sm">
        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* First Recharge Bonus */}
          <div>
            <label className="block text-gray-800 font-bold mb-2 text-sm">
              FIRST RECHARGE BONUS
            </label>
            <input
              type="text"
              value={firstRechargeBonus}
              onChange={(e) => setFirstRechargeBonus(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
            />
            <button
              onClick={() => handleUpdate("First Recharge Bonus")}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors text-sm"
            >
              Update
            </button>
          </div>

          {/* Payment Accept */}
          <div>
            <label className="block text-gray-800 font-bold mb-2 text-sm">
              PAYMENT ACCEPT
            </label>
            <select
              value={paymentAccept}
              onChange={(e) => setPaymentAccept(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
            >
              <option value="IMB">IMB</option>
              <option value="UPI">UPI</option>
              <option value="BOTH">BOTH</option>
            </select>
            <button
              onClick={() => handleUpdate("Payment Accept")}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors text-sm"
            >
              Update
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Payment Options */}
          <div>
            <label className="block text-gray-800 font-bold mb-2 text-sm">
              PAYMENT OPTIONS
            </label>
            <input
              type="text"
              value={paymentOptions}
              onChange={(e) => setPaymentOptions(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
            />
            <button
              onClick={() => handleUpdate("Payment Options")}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors text-sm"
            >
              Update
            </button>
          </div>

          {/* Bonus */}
          <div>
            <label className="block text-gray-800 font-bold mb-2 text-sm">
              BONUS
            </label>
            <input
              type="text"
              value={bonus}
              onChange={(e) => setBonus(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
            />
            <button
              onClick={() => handleUpdate("Bonus")}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors text-sm"
            >
              Update
            </button>
          </div>
        </div>
      </div>

      {/* Recharge Limits Section */}
      <div className="bg-white rounded-xl p-4 mb-4 shadow-sm">
        <div className="grid grid-cols-2 gap-4">
          {/* Min Recharge */}
          <div>
            <label className="block text-gray-800 font-bold mb-2 text-sm">
              MIN RECHARGE
            </label>
            <input
              type="text"
              value={minRecharge}
              onChange={(e) => setMinRecharge(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
            />
            <button
              onClick={() => handleUpdate("Min Recharge")}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors text-sm"
            >
              Update
            </button>
          </div>

          {/* Max Recharge */}
          <div>
            <label className="block text-gray-800 font-bold mb-2 text-sm">
              MAX RECHARGE
            </label>
            <input
              type="text"
              value={maxRecharge}
              onChange={(e) => setMaxRecharge(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
            />
            <button
              onClick={() => handleUpdate("Max Recharge")}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors text-sm"
            >
              Update
            </button>
          </div>
        </div>
      </div>

      {/* Withdraw Settings Section */}
      <div className="bg-white rounded-xl p-4 mb-4 shadow-sm">
        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* Min Withdraw */}
          <div>
            <label className="block text-gray-800 font-bold mb-2 text-sm">
              MIN WITHDRAW
            </label>
            <input
              type="text"
              value={minWithdraw}
              onChange={(e) => setMinWithdraw(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
            />
            <button
              onClick={() => handleUpdate("Min Withdraw")}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors text-sm"
            >
              Update
            </button>
          </div>

          {/* Withdraw With Info */}
          <div>
            <label className="block text-gray-800 font-bold mb-2 text-sm">
              WITHDRAWW WITH INFO
            </label>
            <div className="flex items-center gap-4 mb-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="withdrawWithInfo"
                  checked={withdrawWithInfo === "ON"}
                  onChange={() => setWithdrawWithInfo("ON")}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-gray-700">ON</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="withdrawWithInfo"
                  checked={withdrawWithInfo === "OFF"}
                  onChange={() => setWithdrawWithInfo("OFF")}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-gray-700">OFF</span>
              </label>
            </div>
            <button
              onClick={() => handleUpdate("Withdraw With Info")}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors text-sm"
            >
              Update
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* Money Withdraw Start */}
          <div>
            <label className="block text-gray-800 font-bold mb-2 text-sm">
              MONEY WITHDRAW START
            </label>
            <select
              value={moneyWithdrawStart}
              onChange={(e) => setMoneyWithdrawStart(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
            >
              <option value="5:30 pm">5:30 pm</option>
              <option value="6:00 pm">6:00 pm</option>
              <option value="6:30 pm">6:30 pm</option>
              <option value="7:00 pm">7:00 pm</option>
              <option value="7:30 pm">7:30 pm</option>
              <option value="8:00 pm">8:00 pm</option>
            </select>
            <button
              onClick={() => handleUpdate("Money Withdraw Start")}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors text-sm"
            >
              Update
            </button>
          </div>

          {/* Money Withdraw End */}
          <div>
            <label className="block text-gray-800 font-bold mb-2 text-sm">
              MONEY WITHDRAW END
            </label>
            <select
              value={moneyWithdrawEnd}
              onChange={(e) => setMoneyWithdrawEnd(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
            >
              <option value="6:00 pm">6:00 pm</option>
              <option value="6:30 pm">6:30 pm</option>
              <option value="7:00 pm">7:00 pm</option>
              <option value="7:30 pm">7:30 pm</option>
              <option value="8:00 pm">8:00 pm</option>
              <option value="8:30 pm">8:30 pm</option>
            </select>
            <button
              onClick={() => handleUpdate("Money Withdraw End")}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors text-sm"
            >
              Update
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Withdraw ON OFF */}
          <div>
            <label className="block text-gray-800 font-bold mb-2 text-sm">
              WITHDRAW ON OFF
            </label>
            <div className="flex items-center gap-4 mb-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="withdrawOnOff"
                  checked={withdrawOnOff === "ON"}
                  onChange={() => setWithdrawOnOff("ON")}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-gray-700">ON</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="withdrawOnOff"
                  checked={withdrawOnOff === "OFF"}
                  onChange={() => setWithdrawOnOff("OFF")}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-gray-700">OFF</span>
              </label>
            </div>
            <button
              onClick={() => handleUpdate("Withdraw ON OFF")}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors text-sm"
            >
              Update
            </button>
          </div>

          {/* Processing */}
          <div>
            <label className="block text-gray-800 font-bold mb-2 text-sm">
              PROCESSING
            </label>
            <div className="flex items-center gap-4 mb-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="processing"
                  checked={processing === "ON"}
                  onChange={() => setProcessing("ON")}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-gray-700">ON</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="processing"
                  checked={processing === "OFF"}
                  onChange={() => setProcessing("OFF")}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-gray-700">OFF</span>
              </label>
            </div>
            <button
              onClick={() => handleUpdate("Processing")}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors text-sm"
            >
              Update
            </button>
          </div>
        </div>
      </div>

      {/* Withdraw Limits Section */}
      <div className="bg-white rounded-xl p-4 mb-4 shadow-sm">
        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* Withdraw Count Limit */}
          <div>
            <label className="block text-gray-800 font-bold mb-2 text-sm">
              WITHDRAW COUNT LIMIT
            </label>
            <input
              type="text"
              value={withdrawCountLimit}
              onChange={(e) => setWithdrawCountLimit(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
            />
            <button
              onClick={() => handleUpdate("Withdraw Count Limit")}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors text-sm"
            >
              Update
            </button>
          </div>

          {/* Withdraw Total Amount Limit */}
          <div>
            <label className="block text-gray-800 font-bold mb-2 text-sm">
              WITHDRAW TOTAL AMOUNT LIMIT
            </label>
            <input
              type="text"
              value={withdrawTotalAmountLimit}
              onChange={(e) => setWithdrawTotalAmountLimit(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
            />
            <button
              onClick={() => handleUpdate("Withdraw Total Amount Limit")}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors text-sm"
            >
              Update
            </button>
          </div>
        </div>

        {/* Max Withdraw */}
        <div className="w-1/2 pr-2">
          <label className="block text-gray-800 font-bold mb-2 text-sm">
            MAX WITHDRAW
          </label>
          <input
            type="text"
            value={maxWithdraw}
            onChange={(e) => setMaxWithdraw(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
          />
          <button
            onClick={() => handleUpdate("Max Withdraw")}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors text-sm"
          >
            Update
          </button>
        </div>
      </div>

      {/* Bid Settings Section */}
      <div className="bg-white rounded-xl p-4 mb-4 shadow-sm">
        <div className="grid grid-cols-2 gap-4">
          {/* Min Bid */}
          <div>
            <label className="block text-gray-800 font-bold mb-2 text-sm">
              MIN BID
            </label>
            <input
              type="text"
              value={minBid}
              onChange={(e) => setMinBid(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
            />
            <button
              onClick={() => handleUpdate("Min Bid")}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors text-sm"
            >
              Update
            </button>
          </div>

          {/* Maintain Balance */}
          <div>
            <label className="block text-gray-800 font-bold mb-2 text-sm">
              MAINTAIN BALANCE
            </label>
            <input
              type="text"
              value={maintainBalance}
              onChange={(e) => setMaintainBalance(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
            />
            <button
              onClick={() => handleUpdate("Maintain Balance")}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors text-sm"
            >
              Update
            </button>
          </div>
        </div>
      </div>

      {/* System Settings Section */}
      <div className="bg-white rounded-xl p-4 mb-4 shadow-sm">
        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* UPI Type */}
          <div>
            <label className="block text-gray-800 font-bold mb-2 text-sm">
              UPI TYPE
            </label>
            <select
              value={upiType}
              onChange={(e) => setUpiType(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
            >
              <option value="QRCODE">QRCODE</option>
              <option value="INTENT">INTENT</option>
              <option value="BOTH">BOTH</option>
            </select>
            <button
              onClick={() => handleUpdate("UPI Type")}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors text-sm"
            >
              Update
            </button>
          </div>

          {/* Login Option */}
          <div>
            <label className="block text-gray-800 font-bold mb-2 text-sm">
              LOGIN OPTION
            </label>
            <select
              value={loginOption}
              onChange={(e) => setLoginOption(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
            >
              <option value="OTP">OTP</option>
              <option value="PASSWORD">PASSWORD</option>
              <option value="BOTH">BOTH</option>
            </select>
            <button
              onClick={() => handleUpdate("Login Option")}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors text-sm"
            >
              Update
            </button>
          </div>
        </div>

        {/* Forget Password */}
        <div className="w-1/2 pr-2">
          <label className="block text-gray-800 font-bold mb-2 text-sm">
            FORGET PASSWORD
          </label>
          <select
            value={forgetPassword}
            onChange={(e) => setForgetPassword(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
          >
            <option value="OTP">OTP</option>
            <option value="EMAIL">EMAIL</option>
            <option value="BOTH">BOTH</option>
          </select>
          <button
            onClick={() => handleUpdate("Forget Password")}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors text-sm"
          >
            Update
          </button>
        </div>
      </div>

      {/* Withdraw Hide Show UPI Section */}
      <div className="bg-white rounded-xl p-4 mb-4 shadow-sm">
        <h3 className="text-xl font-medium text-gray-800 italic mb-4">
          Withdraw hide Show Upi
        </h3>

        <div className="space-y-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={phonePe}
              onChange={(e) => setPhonePe(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded"
            />
            <span className="text-gray-700">phonepe :</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={gPay}
              onChange={(e) => setGPay(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded"
            />
            <span className="text-gray-700">gpay :</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={paytm}
              onChange={(e) => setPaytm(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded"
            />
            <span className="text-gray-700">paytm :</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={bank}
              onChange={(e) => setBank(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded"
            />
            <span className="text-gray-700">bank :</span>
          </label>
        </div>
      </div>
    </Layout>
  );
});

ProfileSettings.displayName = "ProfileSettings";
