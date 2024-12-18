import { useLocation, Link } from "react-router-dom";
import { Navbar, Typography, Button, IconButton, Breadcrumbs, Input, Menu, MenuHandler, MenuList, MenuItem, Avatar, } from "@material-tailwind/react";
import { UserCircleIcon, Cog6ToothIcon, BellIcon, ClockIcon, CreditCardIcon, Bars3Icon, } from "@heroicons/react/24/solid";
import { useMaterialTailwindController, setOpenConfigurator, setOpenSidenav, } from "@/context";
import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "@/store/slice/headerSlice";

export function DashboardNavbar() {
  const { url } = useSelector((state) => state.header)
  const [controller, dispatch] = useMaterialTailwindController();
  const dispatchh = useDispatch()
  const { search } = useSelector((state) => state.header)


  const { profile, username } = useSelector((state) => state.user.data)


  
  const { fixedNavbar, openSidenav } = controller;
  const { pathname } = useLocation();
  const [layout, page] = pathname.split("/").filter((el) => el !== "");

  return (
    <Navbar
      color={fixedNavbar ? "white" : "transparent"}
      className={`rounded-xl transition-all ${fixedNavbar
        ? "sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5"
        : "px-0 py-1"
        }`}
      fullWidth
      blurred={fixedNavbar}
    >
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        <div className="capitalize">
          <Breadcrumbs
            className={`bg-transparent p-0 transition-all ${fixedNavbar ? "mt-1" : ""
              }`}
          >
            <Link to={`/${layout}`}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100"
              >
                {layout}
              </Typography>
            </Link>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {page}
            </Typography>
          </Breadcrumbs>
          <Typography variant="h6" color="blue-gray">
            {page}
          </Typography>
        </div>

        <div className="flex items-center">
          {/* {
            url !== pathname &&
            <div className="mr-auto md:mr-4 md:w-56">
              <Input label="Search" type="search" value={search} onChange={(e) => dispatchh(setSearch(e.target.value))} />
            </div>
          } */}
          <IconButton
            variant="text"
            color="blue-gray"
            className="grid xl:hidden"
            onClick={() => setOpenSidenav(dispatch, !openSidenav)}
          >
            <Bars3Icon strokeWidth={3} className="h-6 w-6 text-blue-gray-500" />
          </IconButton>

          <Link to="/dashboard/settings">
            <Button
              variant="text"
              color="blue-gray"
              className="hidden capitalize items-center gap-1 font-12 px-4 xl:flex"
            >
              {
                profile ?
                  <Avatar className="h-6 w-6 mr-1" src={profile ? profile : "/img/team-2.jpeg"}
                    alt={username} size="sm" variant="rounded" />
                  :
                  <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />

              }
              <label className="capitalize">
                {username && username}
              </label>
            </Button>
            <IconButton
              variant="text"
              color="blue-gray"
              className="grid xl:hidden"
            >
              {
                profile ?
                  <img
                    className="h-8 max-w-[32px] rounded-full object-cover object-center"
                    src={profile}
                    alt="nature image"
                  /> :

                  <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
              }
            </IconButton>
          </Link>
          {/* <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
            John Doe
          </Button>
          <IconButton
            variant="text"
            color="blue-gray"
            className="grid xl:hidden"
          >
            <UserCircleIcon className="h-5 w-5 text-blue-gray-500" /> */}
          {/* </IconButton> */}
          <Menu>
            <MenuHandler>
              <IconButton variant="text" color="blue-gray">
                <BellIcon className="h-5 w-5 text-blue-gray-500" />
              </IconButton>
            </MenuHandler>
          </Menu>
        </div>
      </div>
    </Navbar>
  );
}

DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.jsx";

export default DashboardNavbar;
