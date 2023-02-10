import { LazyExoticComponent, Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Homepage from './screens/HomePage/Homepage'
import './App.css'

const LoginPage = lazy(() => import('@/screens/Authpage'))
const RestaurantPage = lazy(() => import('./screens/RestaurantPage'))

function App() {
  const SuspenceComponent =
    (Component: LazyExoticComponent<React.FC<{}>>, props?: object) => {
      return (
        <Suspense fallback={null}>
          <Component {...props} />
        </Suspense>)
    }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage />}>
          <Route path='/catories/:id' element={<Homepage />} />
          <Route path='restaurant/:id' element={<RestaurantPage />} />
        </Route>
        <Route path='/login' element={SuspenceComponent(LoginPage)} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
