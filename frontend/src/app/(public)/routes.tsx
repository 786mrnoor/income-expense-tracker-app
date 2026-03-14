import { Route } from "react-router";
import Login from "./login/page";
import Signup from "./signup/page";

export const PublicRoutes =
  <Route path="/">
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    {/* <Route path="*" element={<NotFound />} /> */}
  </Route>