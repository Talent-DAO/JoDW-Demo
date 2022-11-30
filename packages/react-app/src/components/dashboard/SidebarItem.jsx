import { NavLink } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const SidebarItem = ({ item }) => {
  return (
    <NavLink
      to={item.href}
      className={({ isActive }) =>
        classNames(
          isActive ? "bg-bgred text-primary" : "text-black hover:bg-bgred",
          "group flex items-center px-2 py-2 text-sm font-medium rounded-md hover:text-primary",
        )
      }
    >
      <item.icon
        className="mr-3 flex-shrink-0 h-6 w-6"
        aria-hidden="true"
      />
      {item.name}
    </NavLink>
  );
};

export default SidebarItem;
