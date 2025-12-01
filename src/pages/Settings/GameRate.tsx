// Game Rate Settings Page

import { memo, useState, useCallback } from "react";
import { Layout } from "../../components/layout/Layout";
import { BackButton } from "../../components/common/BackButton";
import toast from "react-hot-toast";

interface GameType {
  id: number;
  type: string;
  price: number;
  multiply: number;
}

// Game Price data
const gameTypes: GameType[] = [
  { id: 1, type: "singleank", price: 9.5, multiply: 10 },
  { id: 2, type: "jodi", price: 95, multiply: 10 },
  { id: 3, type: "singlepana", price: 150, multiply: 10 },
  { id: 4, type: "doublepana", price: 300, multiply: 10 },
  { id: 5, type: "triplepana", price: 600, multiply: 10 },
  { id: 6, type: "halfsangam", price: 1200, multiply: 10 },
  { id: 7, type: "fullsangam", price: 12000, multiply: 10 },
];

// Starline Game Price data
const starlineTypes: GameType[] = [
  { id: 1, type: "singleank", price: 10, multiply: 10 },
  { id: 2, type: "singlepana", price: 150, multiply: 10 },
  { id: 3, type: "doublepana", price: 300, multiply: 10 },
  { id: 4, type: "triplepana", price: 600, multiply: 10 },
];

// Jackpot Game Price data
const jackpotTypes: GameType[] = [
  { id: 1, type: "jodi", price: 100, multiply: 10 },
];

interface GamePriceSectionProps {
  title: string;
  gameTypes: GameType[];
  selectedType: string;
  onSelectType: (type: string) => void;
  priceValue: string;
  onPriceChange: (value: string) => void;
  onUpdate: () => void;
  dropdownOptions: string[];
}

const GamePriceSection = memo(
  ({
    title,
    gameTypes,
    selectedType,
    onSelectType,
    priceValue,
    onPriceChange,
    onUpdate,
    dropdownOptions,
  }: GamePriceSectionProps) => (
    <div className="mb-8">
      {/* Section Header */}
      <div className="bg-yellow-400 py-3 px-4 mb-4">
        <h2 className="text-2xl font-bold text-center text-gray-800 italic">
          {title}
        </h2>
      </div>

      {/* Game Play Dropdown */}
      <div className="mb-4 px-2">
        <label className="block text-gray-700 font-medium mb-2">
          Game Play
        </label>
        <select
          value={selectedType}
          onChange={(e) => onSelectType(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {dropdownOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* Price Input */}
      <div className="mb-4 px-2">
        <label className="block text-gray-700 font-medium mb-2">
          Price per 10 Rs.
        </label>
        <input
          type="text"
          value={priceValue}
          onChange={(e) => onPriceChange(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Update Button */}
      <div className="mb-4 px-2">
        <button
          onClick={onUpdate}
          className="px-6 py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 transition-colors"
        >
          update
        </button>
      </div>

      {/* Price Table */}
      <div className="px-2 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-orange-400 text-gray-800">
              <th className="p-3 text-center font-medium border border-orange-500">
                <div>Sn.</div>
                <div>no</div>
              </th>
              <th className="p-3 text-center font-medium border border-orange-500">
                <div>Game</div>
                <div>Type</div>
              </th>
              <th className="p-3 text-center font-medium border border-orange-500">
                Price
              </th>
              <th className="p-3 text-center font-medium border border-orange-500">
                multiply
              </th>
              <th className="p-3 text-center font-medium border border-orange-500">
                <div>Grand</div>
                <div>Amount</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {gameTypes.map((game) => (
              <tr key={game.id} className="bg-white border-b border-gray-200">
                <td className="p-3 text-center border border-gray-200">
                  {game.id}
                </td>
                <td className="p-3 text-center border border-gray-200">
                  {game.type}
                </td>
                <td className="p-3 text-center border border-gray-200">
                  {game.price}
                </td>
                <td className="p-3 text-center border border-gray-200">
                  {game.multiply}
                </td>
                <td className="p-3 text-center border border-gray-200">
                  {game.price * game.multiply}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
);

GamePriceSection.displayName = "GamePriceSection";

export const GameRate = memo(() => {
  // Game Price state
  const [gameSelectedType, setGameSelectedType] = useState("singleank");
  const [gamePrice, setGamePrice] = useState("9.5");

  // Starline state
  const [starlineSelectedType, setStarlineSelectedType] = useState("singleank");
  const [starlinePrice, setStarlinePrice] = useState("10");

  // Jackpot state
  const [jackpotSelectedType, setJackpotSelectedType] = useState("jodi");
  const [jackpotPrice, setJackpotPrice] = useState("100");

  const handleGameUpdate = useCallback(() => {
    toast.success(`Game price updated for ${gameSelectedType}`);
  }, [gameSelectedType]);

  const handleStarlineUpdate = useCallback(() => {
    toast.success(`Starline price updated for ${starlineSelectedType}`);
  }, [starlineSelectedType]);

  const handleJackpotUpdate = useCallback(() => {
    toast.success(`Jackpot price updated for ${jackpotSelectedType}`);
  }, [jackpotSelectedType]);

  return (
    <Layout>
      <BackButton />
      <div className="bg-gray-100 min-h-screen">
        {/* Game Price Section */}
        <GamePriceSection
          title="Game Price"
          gameTypes={gameTypes}
          selectedType={gameSelectedType}
          onSelectType={setGameSelectedType}
          priceValue={gamePrice}
          onPriceChange={setGamePrice}
          onUpdate={handleGameUpdate}
          dropdownOptions={[
            "singleank",
            "jodi",
            "singlepana",
            "doublepana",
            "triplepana",
            "halfsangam",
            "fullsangam",
          ]}
        />

        {/* Starline Game Price Section */}
        <GamePriceSection
          title="Starline Game Price"
          gameTypes={starlineTypes}
          selectedType={starlineSelectedType}
          onSelectType={setStarlineSelectedType}
          priceValue={starlinePrice}
          onPriceChange={setStarlinePrice}
          onUpdate={handleStarlineUpdate}
          dropdownOptions={[
            "singleank",
            "singlepana",
            "doublepana",
            "triplepana",
          ]}
        />

        {/* Jackpot Game Price Section */}
        <GamePriceSection
          title="Jackpot Game Price"
          gameTypes={jackpotTypes}
          selectedType={jackpotSelectedType}
          onSelectType={setJackpotSelectedType}
          priceValue={jackpotPrice}
          onPriceChange={setJackpotPrice}
          onUpdate={handleJackpotUpdate}
          dropdownOptions={["jodi"]}
        />
      </div>
    </Layout>
  );
});

GameRate.displayName = "GameRate";
