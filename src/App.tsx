import { LazyExoticComponent, Suspense, lazy, useLayoutEffect, ReactNode, ReactElement } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Homepage from './screens/HomePage/Homepage'
import IndexPage from './screens'
const LoginPage = lazy(() => import('@/screens/Authpage'))
const RestaurantPage = lazy(() => import('./screens/RestaurantPage'))
const NotCompletePage = lazy(() => import('./screens/Errorpage/NotCompleted'))

// const LocationWrapper = (
//   { children }: { children: ReactElement }
// ) => {
//   const location = useLocation();

//   useLayoutEffect(() => {
//     document.documentElement.scrollTo(0, 0)
//   }, [location.pathname])

//   return children
// };

function App() {

  const SuspenceComponent =
    (Component: LazyExoticComponent<React.FC<{}>>, props?: object) => {
      return (
        <Suspense fallback={<div>loading...</div>}>
          <Component {...props} />
        </Suspense>)
    }

  return (
    <BrowserRouter>
      {/* <LocationWrapper> */}
      <Routes>
        <Route path='/' element={<IndexPage />}>
          <Route index element={<Homepage />} />
          <Route path='/categories/:id' element={<Homepage />} />
          <Route path='restaurant/:id' element={SuspenceComponent(RestaurantPage)} />
          <Route path='/*' element={SuspenceComponent(NotCompletePage)} />
        </Route>
        <Route path='/login' element={SuspenceComponent(LoginPage)} />
      </Routes>
      {/* </LocationWrapper> */}
    </BrowserRouter>
  )
}

export default App
