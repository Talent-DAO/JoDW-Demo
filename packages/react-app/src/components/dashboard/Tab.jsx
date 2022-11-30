import { NavLink } from "react-router-dom";
import clsx from "clsx";

const Tab = ({ tabs, centered = false }) => {
  return (
    <nav className={clsx(centered ? "justify-center" : "", "space-x-6 pb-3 font-mont flex flex-row")}>
      {tabs.map(tab => {
        return (
          <NavLink
            to={tab.href}
            className={({ isActive }) => {
              return isActive ? "text-black font-semibold" : "text-textgrey";
            }}
          >
            <div className="flex flex-row space-x-1 items-center">
              {tab.Icon ? <tab.Icon className="w-4 h-5" /> : null}
              <span>{tab.name}</span>
            </div>
          </NavLink>
        );
      })}
    </nav>
  );
};

export default Tab;
