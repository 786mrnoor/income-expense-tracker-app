import { Outlet } from "react-router";
import Nav from "@/components/nav";

export default function AuthLayout() {
  return (
    <>
      <Nav />
      {/* <Total /> */}
      <Outlet />
    </>
  );
}
