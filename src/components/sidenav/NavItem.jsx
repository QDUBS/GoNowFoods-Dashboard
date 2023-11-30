import Link from "next/link";

const NavItem = ({ icon, title, route }) => {
  return (
    <>
      <Link
        href={`${route}`}
        className="w-full h-12 flex items-center px-5 py-4 mt-8 cursor-pointer"
      >
        <div>{icon}</div>
        {title}
      </Link>
    </>
  );
};

export default NavItem;
