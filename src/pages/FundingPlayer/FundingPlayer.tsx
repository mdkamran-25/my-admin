// Funding Player Page - search and manage player funding

import { memo, useState, useCallback } from "react";
import { Layout } from "../../components/layout/Layout";
import { BackButton } from "../../components/common/BackButton";

interface Player {
  sno: number;
  username: string;
  phone: string;
  recharge: number | string;
  withdrawal: number | string;
  wallet: number | string;
}

export const FundingPlayer = memo(() => {
  const [searchByName, setSearchByName] = useState("");
  const [searchByPhone, setSearchByPhone] = useState("");

  // Mock data - replace with API call
  const players: Player[] = [
    {
      sno: 1,
      username: "jamirnajirmujawar",
      phone: "7821041081",
      recharge: 3000,
      withdrawal: 226500,
      wallet: 139,
    },
    {
      sno: 2,
      username: "imran",
      phone: "9921037475",
      recharge: 4800,
      withdrawal: 137000,
      wallet: 6088,
    },
    {
      sno: 3,
      username: "dilip",
      phone: "9921960190",
      recharge: "null",
      withdrawal: 124150,
      wallet: 2850.5,
    },
    {
      sno: 4,
      username: "nagesh",
      phone: "7659041094",
      recharge: "null",
      withdrawal: 81000,
      wallet: 0.5,
    },
    {
      sno: 5,
      username: "mdkhan",
      phone: "7676660885",
      recharge: "null",
      withdrawal: 73000,
      wallet: 0,
    },
    {
      sno: 6,
      username: "shobha",
      phone: "8010943408",
      recharge: "null",
      withdrawal: 69600,
      wallet: 0,
    },
    {
      sno: 7,
      username: "Ajay",
      phone: "7974995531",
      recharge: 127000,
      withdrawal: 66598,
      wallet: 10000,
    },
    {
      sno: 8,
      username: "dev",
      phone: "9806092298",
      recharge: 49000,
      withdrawal: 64000,
      wallet: 2160.5,
    },
    {
      sno: 9,
      username: "deepak",
      phone: "7879778795",
      recharge: "null",
      withdrawal: 64000,
      wallet: 50.5,
    },
    {
      sno: 10,
      username: "PBhoi",
      phone: "8073924065",
      recharge: "null",
      withdrawal: 62000,
      wallet: 4000,
    },
    {
      sno: 11,
      username: "6184",
      phone: "6361657630",
      recharge: 1000,
      withdrawal: 60900,
      wallet: 2,
    },
  ];

  const handleClear = useCallback(() => {
    setSearchByName("");
    setSearchByPhone("");
    console.log("Cleared search fields");
  }, []);

  return (
    <Layout>
      <BackButton />
      
      {/* Search Section */}
      <div className="bg-white rounded-xl p-4 mb-4 shadow-sm">
        {/* Search by Name */}
        <div className="mb-3">
          <input
            type="text"
            value={searchByName}
            onChange={(e) => setSearchByName(e.target.value)}
            placeholder="Search by Name"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Search by Phone */}
        <div className="mb-4">
          <input
            type="text"
            value={searchByPhone}
            onChange={(e) => setSearchByPhone(e.target.value)}
            placeholder="Search by Phone"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Clear Button */}
        <button
          onClick={handleClear}
          className="py-3 px-8 bg-green-500 text-white rounded-lg text-base font-semibold hover:bg-green-600 transition-colors shadow-md"
        >
          Clear
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <div className="min-w-[700px]">
            {/* Table Header - First Row */}
            <div className="bg-yellow-500 grid grid-cols-2 gap-0 text-sm font-bold text-gray-800">
              <div className="text-center py-3 border-r border-yellow-600">
                s.no.
              </div>
              <div className="text-center py-3">username</div>
            </div>

            {/* Table Body */}
            <div>
              {players.map((player) => (
                <div key={player.sno}>
                  {/* Player Info Row */}
                  <div className="grid grid-cols-2 gap-0 border-b border-gray-200">
                    <div className="text-center py-4 font-medium text-gray-700 border-r border-gray-200">
                      {player.sno}
                    </div>
                    <div className="text-center py-4">
                      <div className="font-semibold text-gray-800">
                        {player.username}
                      </div>
                      <div className="text-gray-600 text-sm mt-1">
                        {player.phone}
                      </div>
                    </div>
                  </div>

                  {/* Table Header for Actions */}
                  <div className="bg-yellow-500 grid grid-cols-6 gap-0 text-xs font-bold text-gray-800">
                    <div className="text-center py-2 border-r border-yellow-600">
                      Call
                    </div>
                    <div className="text-center py-2 border-r border-yellow-600">
                      WP
                    </div>
                    <div className="text-center py-2 border-r border-yellow-600">
                      Recharge
                    </div>
                    <div className="text-center py-2 border-r border-yellow-600">
                      Withdrawal
                    </div>
                    <div className="text-center py-2 border-r border-yellow-600">
                      Wallet
                    </div>
                    <div className="text-center py-2">View</div>
                  </div>

                  {/* Action Row */}
                  <div className="grid grid-cols-6 gap-0 border-b-4 border-gray-300">
                    {/* Call */}
                    <div className="text-center py-3 border-r border-gray-200">
                      <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                        Call
                      </button>
                    </div>

                    {/* WP */}
                    <div className="text-center py-3 border-r border-gray-200">
                      <button className="text-blue-500 hover:text-blue-600 font-medium text-sm">
                        Wp
                      </button>
                    </div>

                    {/* Recharge */}
                    <div className="text-center py-3 border-r border-gray-200">
                      <span className="inline-block px-4 py-1.5 rounded bg-green-600 font-bold text-white text-sm">
                        {player.recharge}
                      </span>
                    </div>

                    {/* Withdrawal */}
                    <div className="text-center py-3 border-r border-gray-200">
                      <span className="inline-block px-4 py-1.5 rounded bg-red-600 font-bold text-white text-sm">
                        {player.withdrawal}
                      </span>
                    </div>

                    {/* Wallet */}
                    <div className="text-center py-3 border-r border-gray-200">
                      <span className="inline-block px-4 py-1.5 rounded bg-blue-600 font-bold text-white text-sm">
                        {player.wallet}
                      </span>
                    </div>

                    {/* View */}
                    <div className="text-center py-3">
                      <button className="text-gray-600 hover:text-gray-800">
                        <svg
                          className="w-5 h-5 mx-auto"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path
                            fillRule="evenodd"
                            d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
});

FundingPlayer.displayName = "FundingPlayer";
