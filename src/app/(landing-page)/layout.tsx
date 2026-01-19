import { ReactNode } from "react";
// import NavBar from "./_components/nav-bar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <section className="no-scrollbar">
      {/* <NavBar /> */}
      <main>{children}</main>
    </section>
  );
}