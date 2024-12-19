import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { Cog6ToothIcon } from '@heroicons/react/24/solid'
import { IconButton } from '@material-tailwind/react'
import {
  Sidenav,
  DashboardNavbar,
  Configurator,
  Footer
} from '@/widgets/layout'
import routes from '@/routes'
import { useMaterialTailwindController, setOpenConfigurator } from '@/context'
import { useDispatch } from 'react-redux'
import { Suspense, useEffect } from 'react'
import { SyncLoader } from 'react-spinners'
import { getData, getToken } from '@/helper/tokenHelper'
import { setSearch } from '@/store/slice/headerSlice'
import { setUserName } from '@/store/slice/userSlice'

export function Dashboard() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [controller, dispatch] = useMaterialTailwindController()

  const { sidenavType } = controller
  const dispatchh = useDispatch()

  useEffect(() => {
    if (!getToken()) {
      navigate('/auth/sign-in')
    }
    dispatchh(setSearch(''))
  }, [pathname])

  useEffect(() => {
    setTimeout(() => {
      dispatchh(setUserName('Amit '))
    }, 4000)
  }, [])

  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav
        routes={routes}
        brandImg={
          sidenavType === 'black' ? '/img/logo-ct.png' : '/img/logo-ct-dark.png'
        }
      />
      <div className="p-4 xl:ml-80">
        <DashboardNavbar />
        <Configurator />
        <IconButton
          size="lg"
          color="white"
          className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
          ripple={false}
          onClick={() => setOpenConfigurator(dispatch, true)}
        >
          <Cog6ToothIcon className="h-5 w-5" />
        </IconButton>

        <Suspense
          fallback={
            <>
              <div
                className="flex items-center justify-center w-full"
                style={{ height: '80vh' }}
              >
                <SyncLoader size={14} color="#3b3b3b" />
              </div>
            </>
          }
        >
          <Routes>
            {routes.map(
              ({ layout, pages }) =>
                layout === 'dashboard' &&
                pages.map(({ path, element }) => (
                  <Route exact path={path} element={element} />
                ))
            )}
          </Routes>
        </Suspense>

        <div className="text-blue-gray-600">
          <Footer />
        </div>
      </div>
    </div>
  )
}

Dashboard.displayName = '/src/layout/dashboard.jsx'

export default Dashboard
