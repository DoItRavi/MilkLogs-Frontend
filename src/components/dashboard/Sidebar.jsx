import { forwardRef } from "react";
import { NavLink } from "react-router-dom";
import { navbarLinks } from "./constants";
import { cn } from "../../lib/utils";

export const Sidebar = forwardRef(({ collapsed }, ref) => {
  const allLinks = navbarLinks.flatMap((group) => group.links);
  return (
    <aside
      ref={ref}
      className={cn(
        "fixed z-[100] flex h-full w-[240px] flex-col overflow-x-hidden bg-sidebar [transition:_width_300ms_cubic-bezier(0.4,_0,_0.2,_1),_left_300ms_cubic-bezier(0.4,_0,_0.2,_1),_background-color_150ms_cubic-bezier(0.4,_0,_0.2,_1)]  bg-[url('/bottleandglassExtended.png')] bg-center bg-contain bg-no-repeat bg-[length:100%_100%]",
        collapsed ? "md:w-[70px] md:items-center" : "md:w-[240px]",
        collapsed ? "max-md:-left-full" : "max-md:left-0"
      )}
    >
      <div className="flex items-center gap-x-3 p-4">
        <NavLink
          key={"milklogo"}
          to={"/consumer/dashboard/"}
          className="bg-white/95 p-1 lg:p-2 rounded-3xl shadow-md"
        >
          <img
            src="/milktablogo11.png"
            alt="milk logo"
            className="size-8 md:size-10"
          />
        </NavLink>
        {!collapsed && (
          <p className="text-xl font-bold text-sky-800 tracking-wide transition-colors">
            MilkLogs
          </p>
        )}
      </div>
      <div className="flex w-full flex-col gap-y-4 overflow-y-auto overflow-x-hidden p-3 [scrollbar-width:_thin]">
        {allLinks.map((link) => (
          <NavLink
            key={link.label}
            to={link.path}
            className={cn("sidebar-item", collapsed && "md:w-[45px]")}
          >
            <link.icon size={22} className="flex-shrink-0" />
            {!collapsed && <p className="whitespace-nowrap">{link.label}</p>}
          </NavLink>
        ))}
      </div>
    </aside>
  );
});
