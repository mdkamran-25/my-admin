// Game On Off Starline Settings Page

import { Layout } from "../../components/layout/Layout";
import { BackButton } from "../../components/common/BackButton";

export const GameOnOffStarline = () => {
  return (
    <Layout>
      <BackButton />
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Game On Off Starline
        </h1>
        <p className="text-gray-600">
          Control starline game availability settings.
        </p>
      </div>
    </Layout>
  );
};
