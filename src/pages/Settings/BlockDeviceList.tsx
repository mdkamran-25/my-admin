// Block Device List Settings Page

import { Layout } from "../../components/layout/Layout";
import { BackButton } from "../../components/common/BackButton";

export const BlockDeviceList = () => {
  return (
    <Layout>
      <BackButton />
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Block Device List
        </h1>
        <p className="text-gray-600">
          Manage blocked devices and device restrictions.
        </p>
      </div>
    </Layout>
  );
};
