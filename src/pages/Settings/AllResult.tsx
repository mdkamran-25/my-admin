// All Result Settings Page

import { memo } from "react";
import { Layout } from "../../components/layout/Layout";
import { BackButton } from "../../components/common/BackButton";

interface GameResult {
  id: number;
  gameName: string;
  result: string;
  openDate: string;
  openTime: string;
  closeDate: string | null;
  closeTime: string | null;
}

const gameResults: GameResult[] = [
  {
    id: 1,
    gameName: "MAIN BAZAR",
    result: "468-8-",
    openDate: "25/11/2025",
    openTime: "10:00:43 PM",
    closeDate: null,
    closeTime: null,
  },
  {
    id: 2,
    gameName: "RAJDHANI NIGHT",
    result: "689-3-",
    openDate: "25/11/2025",
    openTime: "09:43:06 PM",
    closeDate: null,
    closeTime: null,
  },
  {
    id: 3,
    gameName: "KALYAN NIGHT",
    result: "579-1-",
    openDate: "25/11/2025",
    openTime: "09:40:37 PM",
    closeDate: null,
    closeTime: null,
  },
  {
    id: 4,
    gameName: "MILAN NIGHT",
    result: "124-70-578",
    openDate: "25/11/2025",
    openTime: "09:08:33 PM",
    closeDate: "25/11/2025",
    closeTime: "11:11:23 PM",
  },
  {
    id: 5,
    gameName: "SUPREME NIGHT",
    result: "447-52-129",
    openDate: "25/11/2025",
    openTime: "08:52:33 PM",
    closeDate: "25/11/2025",
    closeTime: "10:51:12 PM",
  },
  {
    id: 6,
    gameName: "MADHUR NIGHT",
    result: "347-46-259",
    openDate: "25/11/2025",
    openTime: "08:42:24 PM",
    closeDate: "25/11/2025",
    closeTime: "10:39:16 PM",
  },
  {
    id: 7,
    gameName: "SUPREME NIGHT",
    result: "789-40-299",
    openDate: "14/11/2025",
    openTime: "08:53:18 PM",
    closeDate: "14/11/2025",
    closeTime: "10:52:07 PM",
  },
  {
    id: 8,
    gameName: "MADHUR NIGHT",
    result: "490-32-237",
    openDate: "14/11/2025",
    openTime: "08:43:53 PM",
    closeDate: "14/11/2025",
    closeTime: "10:39:16 PM",
  },
  {
    id: 9,
    gameName: "SRIDEVI NIGHT",
    result: "457-60-145",
    openDate: "14/11/2025",
    openTime: "07:18:49 PM",
    closeDate: "14/11/2025",
    closeTime: "08:22:00 PM",
  },
  {
    id: 10,
    gameName: "GOLDEN DAY",
    result: "470-10-389",
    openDate: "14/11/2025",
    openTime: "04:27:41 PM",
    closeDate: "14/11/2025",
    closeTime: "06:31:43 PM",
  },
  {
    id: 11,
    gameName: "KALYAN",
    result: "125-84-590",
    openDate: "14/11/2025",
    openTime: "03:55:56 PM",
    closeDate: "14/11/2025",
    closeTime: "05:56:47 PM",
  },
];

export const AllResult = memo(() => {
  return (
    <Layout>
      <BackButton />
      <div className="bg-gray-100 min-h-screen">
        {/* Results List */}
        <div className="divide-y divide-gray-200">
          {gameResults.map((game) => (
            <div key={game.id} className="bg-white p-4 flex">
              {/* Left Side - Game Name & Result */}
              <div className="flex-1 border-r border-gray-300 pr-4">
                <h3 className="text-lg font-bold text-blue-500 text-center">
                  {game.gameName}
                </h3>
                <p className="text-xl font-bold text-blue-500 text-center">
                  {game.result}
                </p>
              </div>

              {/* Right Side - Open/Close Times */}
              <div className="flex-1 pl-4">
                {/* Open Time */}
                <div className="text-center mb-2">
                  <span className="text-gray-700 font-medium">Open</span>
                  <div className="text-gray-700">{game.openDate}</div>
                  <div className="text-gray-700">{game.openTime}</div>
                </div>

                {/* Close Time */}
                <div className="text-center">
                  <span className="text-red-500 font-medium">Close</span>
                  {game.closeDate && game.closeTime ? (
                    <>
                      <div className="text-red-500">{game.closeDate}</div>
                      <div className="text-red-500">{game.closeTime}</div>
                    </>
                  ) : (
                    <div className="text-red-500">--</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {gameResults.length === 0 && (
          <div className="text-center py-8 text-gray-500 bg-white">
            No results available.
          </div>
        )}
      </div>
    </Layout>
  );
});

AllResult.displayName = "AllResult";
