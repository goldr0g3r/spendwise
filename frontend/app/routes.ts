import { type RouteConfig, index } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  {
    path: "/about",
    file: "pages/about.tsx",
  },
] satisfies RouteConfig;
