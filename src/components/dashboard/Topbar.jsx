import { LogOut, ChevronsLeft } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../store/slices/authSlice";

export const Topbar = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userObj = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/consumer/login", { replace: true });
  };
  return (
    <header className="sky-header relative z-10 flex h-[60px] items-center justify-between px-2 py-2">
      <div className="flex items-center gap-x-3">
        <button
          className="btn-ghost size-10"
          onClick={() => setCollapsed(!collapsed)}
        >
          <ChevronsLeft className={collapsed && "rotate-180"} />
        </button>
      </div>
      <div className="flex items-center gap-x-2">
        <NavLink
          key={"profile"}
          to={"/consumer/dashboard/profile"}
          className="flex items-center gap-x-2 rounded-full bg-sky-50 px-3 py-2 transition-all duration-200 hover:bg-sky-100 hover:shadow-sm"
        >
          <div className="size-10 overflow-hidden rounded-full ring-2 ring-sky-200">
            <img
              src={"/avatarIcon.avif"}
              alt="profile image"
              className="size-full object-cover"
            />
          </div>
          <div className="hidden md:flex flex-col text-start">
            <p className="text-sm font-semibold text-sky-800">
              {userObj?.username || "John Doe"}
            </p>
            <p className="text-sm text-sky-600 email-text">
              {userObj?.email || "abc@example.com"}
            </p>
          </div>
        </NavLink>
        <button
          onClick={handleLogout}
          className="flex items-center justify-center size-10 text-red-600 rounded-md hover:bg-red-100 hover:text-red-700 transition-colors"
        >
          <LogOut size={26} />
        </button>
      </div>
    </header>
  );
};
