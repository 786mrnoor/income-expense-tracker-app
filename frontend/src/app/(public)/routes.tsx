import { lazy } from "react";
import { Route } from "react-router";

const Login = lazy(() => import("./login/page"));
const Signup = lazy(() => import("./signup/page"));

export const PublicRoutes =
  <Route path="/">
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    {/* <Route path="*" element={<NotFound />} /> */}
  </Route>