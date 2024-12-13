import { Routes, Route } from "react-router-dom";
import { ServerStackIcon, RectangleStackIcon, } from "@heroicons/react/24/solid";
import { ForgetPassword, SignIn, SignUp } from "@/pages/auth";
// import routes from "@/routes";
const icon = {
  className: "w-5 h-5 text-inherit",
};
const routes = [
  {
    title: "auth page",
    layout: "auth",
    pages: [
      { icon: <ServerStackIcon {...icon} />, name: "sign in", path: "/sign-in", element: <SignIn />, },
      { icon: <RectangleStackIcon {...icon} />, name: "sign up", path: "/sign-up", element: <SignUp />, },
      { icon: <ServerStackIcon {...icon} />, name: "reset password", path: "/reset-password", element: <ForgetPassword />, },
    ],
  },
]

export function Auth() {

  return (
    <div className="relative min-h-screen w-full">
      <Routes>
        {routes.map(
          ({ layout, pages }) =>
            layout === "auth" &&
            pages.map(({ path, element }) => (
              <Route exact path={path} element={element} />
            ))
        )}
      </Routes>
    </div>
  );
}

Auth.displayName = "/src/layout/Auth.jsx";

export default Auth;
