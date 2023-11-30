import SideNav from "../sidenav/SideNav";

export default function Layout({ children }) {
  return (
    <main className="flex flex-row max-w-[2000px] mx-auto px-0 lg:px-0">
      <SideNav />
      <section className="w-full lg:w-full lg:px-0">{children}</section>
    </main>
  );
}
