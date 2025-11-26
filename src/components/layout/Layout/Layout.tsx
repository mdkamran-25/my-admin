// Layout component - common wrapper for all pages with Header and Sidebar

import { memo, useState, useCallback } from "react";
import type { ReactNode } from "react";
import { Header } from "../Header";
import { Sidebar } from "../Sidebar";

interface LayoutProps {
  children: ReactNode;
  onRefresh?: () => void;
  bgColor?: string;
  contentPadding?: string;
}

export const Layout = memo(
  ({
    children,
    onRefresh,
    bgColor = "bg-gray-100",
    contentPadding = "px-3 py-4",
  }: LayoutProps) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleMenuClick = useCallback(() => {
      setIsSidebarOpen((prev) => !prev);
    }, []);

    const handleCloseSidebar = useCallback(() => {
      setIsSidebarOpen(false);
    }, []);

    const handleRefresh = useCallback(() => {
      if (onRefresh) {
        onRefresh();
      }
    }, [onRefresh]);

    return (
      <div className={`min-h-screen ${bgColor}`}>
        <Sidebar isOpen={isSidebarOpen} onClose={handleCloseSidebar} />
        <Header onRefresh={handleRefresh} onMenuClick={handleMenuClick} />

        <main className={`max-w-7xl mx-auto ${contentPadding}`}>
          {children}
        </main>
      </div>
    );
  }
);

Layout.displayName = "Layout";
