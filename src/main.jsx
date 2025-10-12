import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './Store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import {Protected,Home,Login,Signup,MyStore,Product,PushProduct,EditProduct,Cart,SellerInfo} from "./tools.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
        {  
           index:true,
            path: "/",
            element:<Home/>
        },
        {
            path: "/login",
            element: (
                <Protected authentication={false}>
                    <Login />
                </Protected>
            ),
        },
        {
            path: "/signup",
            element: (
                <Protected authentication={false}>
                    <Signup />
                </Protected>
            ),
        },
        {
            path: "/my-store",
            element: (
                <Protected authentication>
                    {" "}
                    <MyStore />
                </Protected>
            ),
        },
        {
            path: "/add-product",
            element: (
                <Protected authentication>
                    {" "}
                    <PushProduct />
                </Protected>
            ),
        },
        {
            path: "/product/:slug/:id",
            element: (
                <Protected authentication>
                    {" "}
                    <Product />
                </Protected>
            ),
        },
        {
            path: "/edit-product/:slug/:id",
            element: (
             <Protected authentication ={true}>
                <EditProduct />
             </Protected>
            )
        },
        {
            path: "/cart",
            
            element: <Cart />,
        },
        {
          path: "/sellerInfo/:slug",
          element: (
            <Protected authentication ={true}>
                <SellerInfo/>
            </Protected>
          )
        }
    ],
},
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)