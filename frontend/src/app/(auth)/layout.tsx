import { Outlet } from "react-router";
import Nav from "@/components/nav";
import { useEffect } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { fetchAccountList } from "@/redux/account/account.thunk";
import { fetchTagList } from "@/redux/tag/tags.thunk";
import { Toaster } from "react-hot-toast";

export default function AuthLayout() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAccountList());
    dispatch(fetchTagList());

  }, []);

  return (
    <>
      <Toaster />
      <Nav />
      {/* <Total /> */}
      <Outlet />
    </>
  );
}