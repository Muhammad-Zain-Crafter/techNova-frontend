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
import Support from './pages/support/Support'
import GetProfile from './pages/profile/GetProfile'
import Address from './pages/address.jsx/Address'
import PlaceOrder from './components/order/PlaceOrder'
import MyOrders from './components/order/MyOrders'
import GetOrders from './pages/admin/GetOrders'
import Users from './pages/admin/Users'
import CreateProduct from './pages/admin/CreateProduct'

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
    path: "/profile",
    element: <div>
      <Navbar/>
      <GetProfile/>
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
    path: "/support",
    element: <div>
      <Navbar/>,
      <Support/>,
      <Footer/>
    </div>
  },
  {
    path: "/cart",
    element: <div>
      <Navbar/>
      <Cart/>
    </div>
  },
  {
    path: "/address",
    element: <div>
      <Navbar/>
      <Address/>
    </div>
  },
  {
    path: "place-order",
    element: <div>
      <Navbar/>
      <PlaceOrder/>
    </div>
  },
  {
    path: "orders",
    element: <div>
      <Navbar/>
      <MyOrders/>
    </div>
  },
  {
    path: "/admin/dashboard",
    element: <div>
      <Navbar/>
      <Dashboard/>
    </div>
  },
  {
    path: "/admin/create-product",
    element: <div>
      <Navbar/>
      <CreateProduct/>
    </div>
  },
  {
    path: "/admin/orders",
    element: <div>
      <Navbar/>
      <GetOrders/>
    </div>
  },
  {
    path: "/admin/users",
    element: <div>
      <Navbar/>
      <Users/>
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
