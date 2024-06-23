import React from "react";
//import './App.css';
import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import Home from "./compnents/home/Home";
//import BarChart from "./compnents/barchart/BarChart";
import RootLayout from "./RootLayout";
import Login from "./compnents/login/Login";
import BarChart from "./compnents/barchart/BarChart";

function App() {
 
  const browserRouter=createBrowserRouter([{
    path:'',
    element:<RootLayout />,
    children:[
      {
        path:'/',
        element:<Home />
      },
      {
        path:'/ngo-login',
        element:<Login/>
      },
      {
        path:'/statics',
        element:<BarChart/>
      }
    ]

  }])
  return (
   <div>
   
   <RouterProvider router={browserRouter} />
   </div>
  )
}

export default App
