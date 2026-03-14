import { Routes } from "react-router";
import { AuthRoutes } from "./(auth)/routes";
import { PublicRoutes } from "./(public)/routes";

export const AppRoutes =
  <Routes>
    {AuthRoutes}
    {PublicRoutes}
  </Routes>