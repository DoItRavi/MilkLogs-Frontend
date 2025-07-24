import {
  ChartColumn,
  Home,
  CalendarPlus,
  CalendarSync,
  Calculator,
} from "lucide-react";

export const navbarLinks = [
  {
    title: "Dashboard",
    links: [
      {
        label: "Home",
        icon: Home,
        path: "/consumer/dashboard/home",
      },
    ],
  },
  {
    title: "Analytics",
    links: [
      {
        label: "View Analytics",
        icon: ChartColumn,
        path: "/consumer/dashboard/analytics",
      },
    ],
  },
  {
    title: "Actions",
    links: [
      {
        label: "Add Entry",
        icon: CalendarPlus,
        path: "/consumer/dashboard/add-entry",
      },
      {
        label: "Update Entry",
        icon: CalendarSync,
        path: "/consumer/dashboard/update-entry",
      },
    ],
  },
  {
    title: "Bills",
    links: [
      {
        label: "Calculate Bills",
        icon: Calculator,
        path: "/consumer/dashboard/calculate-bill",
      },
    ],
  },
];
