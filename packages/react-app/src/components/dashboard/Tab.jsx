import { NavLink } from "react-router-dom";

const Tab = ({ tabs }) => {
  return (
    <nav className="space-x-6 pb-3 font-mont">
      {tabs.map(tab => {
        return (
          <NavLink
            to={tab.href}
            className={({ isActive }) => {
              return isActive ? "text-black font-semibold" : "text-textgrey";
            }}
          >
            {tab.name}
          </NavLink>
        );
      })}
    </nav>
  );
};

export default Tab;
