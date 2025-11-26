// Profile Settings Page

import { Layout } from "../../components/layout/Layout";

export const ProfileSettings = () => {
  return (
    <Layout>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Profile Settings
        </h1>
        <p className="text-gray-600">Manage your profile settings here.</p>
      </div>
    </Layout>
  );
};
