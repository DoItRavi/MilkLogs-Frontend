import { Outlet } from "react-router-dom";
import { useMediaQuery } from "@uidotdev/usehooks";
import { useClickOutside } from "@/hooks/use-click-outside";
import { Topbar } from "../../src/components/dashboard/Topbar";
import { Sidebar } from "../../src/components/dashboard/Sidebar";
import { cn } from "../../src/lib/utils";
import { useEffect, useRef, useState } from "react";

const Dashboard = () => {
  const isLargeDesktop = useMediaQuery("(min-width: 1024px)");
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [collapsed, setCollapsed] = useState(!isLargeDesktop);
  const sidebarRef = useRef(null);

  useEffect(() => {
    setCollapsed(!isLargeDesktop);
  }, [isLargeDesktop]);

  useClickOutside([sidebarRef], () => {
    if (isMobile && !collapsed) {
      setCollapsed(true);
    }
  });

  return (
    <div className="min-h-screen bg-background">
      <div
        className={cn(
          "pointer-events-none fixed inset-0 -z-10 bg-black opacity-0 transition-opacity",
          !collapsed &&
            "max-md:pointer-events-auto max-md:z-50 max-md:opacity-30"
        )}
      />
      <Sidebar ref={sidebarRef} collapsed={collapsed} />
      <div
        className={cn(
          "transition-[margin] duration-300",
          collapsed ? "md:ml-[70px]" : "md:ml-[240px]"
        )}
      >
        <Topbar collapsed={collapsed} setCollapsed={setCollapsed} />
        <div className="h-[calc(100vh-60px)] overflow-y-auto overflow-x-hidden p-6 outlet-bg">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
