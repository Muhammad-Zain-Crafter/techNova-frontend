import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/home/Home'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Products from './pages/product/Products'
import Cart from './pages/cart/Cart'
import ProductDetails from './components/product/ProductDetails'
import Dashboard from './pages/admin/Dashboard'


const router = createBrowserRouter([
  {
    path: "/",
    element: <div>
      <Navbar/>
      <Home/>
      <Footer/>
    </div>
  },
  {
    path: "/login",
    element: <div>
      <Login/>
    </div>
  },
  {
    path: "/register",
    element: <div>
      <Register/>
    </div>
  },
  {
    path: "/products",
    element: <div>
      <Navbar/>
      <Products/>
      <Footer/>
    </div>
  },
  {
    path: "/products/:id",
    element: <div>
      <Navbar/>
      <ProductDetails/>
      <Footer/>
    </div>
  },
  {
    path: "/cart",
    element: <div>
      <Navbar/>
      <Cart/>
      <Footer/>
    </div>
  },
  {
    path: "/admin/dashboard",
    element: <div>
      <Navbar/>
      <Dashboard/>
      <Footer/>
    </div>
  }
])
function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <RouterProvider router={router}>

      </RouterProvider>
    </div>

  )
}

export default App
