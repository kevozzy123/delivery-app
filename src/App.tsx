import { LazyExoticComponent, Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Homepage from './screens/HomePage/Homepage'
import IndexPage from './screens'
const LoginPage = lazy(() => import('@/screens/Authpage'))
const RestaurantPage = lazy(() => import('./screens/RestaurantPage'))
const NotCompletePage = lazy(() => import('./screens/Errorpage/NotCompleted'))

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
      <Routes>
        <Route path='/' element={<IndexPage />}>
          <Route index element={<Homepage />} />
          <Route path='/categories/:id' element={<Homepage />} />
          <Route path='restaurant/:id' element={<RestaurantPage />} />
          <Route path='/*' element={SuspenceComponent(NotCompletePage)} />
        </Route>
        <Route path='/login' element={SuspenceComponent(LoginPage)} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
