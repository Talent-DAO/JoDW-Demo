function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const SidebarItem = ({ item }) => {
  return (
    <a
      key={item.name}
      href={item.href}
      className={classNames(
        item.current ? "bg-bgred text-primary" : "text-black hover:bg-bgred",
        "group flex items-center px-2 py-2 text-sm font-medium rounded-md hover:text-primary",
      )}
    >
      <item.icon
        className={classNames(
          item.current ? "text-primary" : "text-black group-hover:text-primary",
          "mr-3 flex-shrink-0 h-6 w-6",
        )}
        aria-hidden="true"
      />
      {item.name}
    </a>
  );
};

export default SidebarItem;
