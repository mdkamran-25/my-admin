// Block Device List Settings Page

import { memo, useState, useCallback, useMemo } from "react";
import { Layout } from "../../components/layout/Layout";
import { BackButton } from "../../components/common/BackButton";
import toast from "react-hot-toast";

interface Device {
  id: number;
  sn: number;
  phone: string;
  username: string;
  brandModel: string;
  deviceId: string;
  date: string;
  isActive: boolean;
}

const initialDevices: Device[] = [
  {
    id: 1,
    sn: 1,
    phone: "8660560985",
    username: "akash",
    brandModel: "OPPO CPH2629",
    deviceId: "AP3A.240617.008CPH2629",
    date: "2025-05-03 12:02:11",
    isActive: true,
  },
  {
    id: 2,
    sn: 2,
    phone: "9773830528",
    username: "nikhi",
    brandModel: "Redmi 2311DRN14I",
    deviceId: "AP3A.240905.015.A22311DRN14I",
    date: "2025-03-10 11:49:33",
    isActive: true,
  },
  {
    id: 3,
    sn: 3,
    phone: "8551811847",
    username: "Arvind",
    brandModel: "Redmi 2406ERN9CI",
    deviceId: "AQ3A.240912.0012406ERN9CI",
    date: "2025-03-10 00:46:52",
    isActive: true,
  },
  {
    id: 4,
    sn: 4,
    phone: "9784960999",
    username: "DINESH",
    brandModel: "samsung SM-A556E",
    deviceId: "BP2A.250605.031.A3SM-A556E",
    date: "2025-11-03 18:19:30",
    isActive: true,
  },
  {
    id: 5,
    sn: 5,
    phone: "9767149456",
    username: "aashish",
    brandModel: "vivo vivo 1818",
    deviceId: "RP1A.200720.012vivo 1818",
    date: "2025-03-11 23:34:51",
    isActive: true,
  },
];

export const BlockDeviceList = memo(() => {
  const [devices, setDevices] = useState<Device[]>(initialDevices);
  const [pageSize, setPageSize] = useState(500);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDevices = useMemo(() => {
    if (!searchQuery.trim()) return devices;
    const query = searchQuery.toLowerCase();
    return devices.filter(
      (device) =>
        device.phone.toLowerCase().includes(query) ||
        device.username.toLowerCase().includes(query) ||
        device.brandModel.toLowerCase().includes(query) ||
        device.deviceId.toLowerCase().includes(query)
    );
  }, [devices, searchQuery]);

  const handleChangeActive = useCallback((id: number, username: string) => {
    setDevices((prev) =>
      prev.map((device) =>
        device.id === id ? { ...device, isActive: !device.isActive } : device
      )
    );
    toast.success(`Status changed for ${username}`);
  }, []);

  return (
    <Layout>
      <BackButton />
      <div className="bg-gray-100 min-h-screen p-4">
        {/* Filter Bar */}
        <div className="flex items-center gap-4 mb-4">
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="px-3 py-2 border border-gray-300 rounded bg-white text-gray-700"
          >
            <option value={100}>100</option>
            <option value={250}>250</option>
            <option value={500}>500</option>
            <option value={1000}>1000</option>
          </select>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter Search"
            className="flex-1 px-4 py-2 border border-gray-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Device Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="p-3 text-left font-medium border border-blue-600">
                  SN
                </th>
                <th className="p-3 text-left font-medium border border-blue-600">
                  ph
                </th>
                <th className="p-3 text-left font-medium border border-blue-600">
                  username
                </th>
                <th className="p-3 text-left font-medium border border-blue-600">
                  <div>Brand</div>
                  <div>Model</div>
                </th>
                <th className="p-3 text-left font-medium border border-blue-600">
                  Device id
                </th>
                <th className="p-3 text-left font-medium border border-blue-600">
                  Date
                </th>
                <th className="p-3 text-left font-medium border border-blue-600">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredDevices.map((device) => (
                <tr
                  key={device.id}
                  className="bg-white border-b border-gray-200"
                >
                  <td className="p-3 border border-gray-200 text-gray-700">
                    {device.sn}
                  </td>
                  <td className="p-3 border border-gray-200 text-gray-700 font-medium">
                    {device.phone}
                  </td>
                  <td className="p-3 border border-gray-200 text-gray-700">
                    {device.username}
                  </td>
                  <td className="p-3 border border-gray-200 text-gray-700">
                    <div>{device.brandModel.split(" ")[0]}</div>
                    <div>{device.brandModel.split(" ").slice(1).join(" ")}</div>
                  </td>
                  <td className="p-3 border border-gray-200 text-gray-700 text-sm break-all">
                    {device.deviceId}
                  </td>
                  <td className="p-3 border border-gray-200 text-gray-700 text-sm whitespace-nowrap">
                    {device.date.split(" ")[0]}
                    <br />
                    {device.date.split(" ")[1]}
                  </td>
                  <td className="p-3 border border-gray-200">
                    <button
                      onClick={() =>
                        handleChangeActive(device.id, device.username)
                      }
                      className="px-3 py-2 bg-red-500 text-white text-sm font-medium rounded hover:bg-red-600 transition-colors"
                    >
                      <div>Change</div>
                      <div>Active</div>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredDevices.length === 0 && (
          <div className="text-center py-8 text-gray-500 bg-white mt-4 rounded">
            No devices found matching your search.
          </div>
        )}
      </div>
    </Layout>
  );
});

BlockDeviceList.displayName = "BlockDeviceList";
