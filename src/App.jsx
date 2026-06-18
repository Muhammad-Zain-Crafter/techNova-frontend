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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateProduct from './pages/product/CreateProduct'

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
  },
  {
    path: "/admin/create-product",
    element: <div>
      <Navbar/>
      <CreateProduct/>
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
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
      />
    </div>
  )
}

export default App
