import React from "react";
//import './App.css';
import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import Home from "./compnents/home/Home";
//import BarChart from "./compnents/barchart/BarChart";
import RootLayout from "./RootLayout";

function App() {
 
  const browserRouter=createBrowserRouter([{
    path:'',
    element:<RootLayout />,
    children:[
      {
        path:'/',
        element:<Home />
      },
      // {
      //   path:'barchart',
      //   element:<BarChart/>
      // }
      


    ]

  }])
  return (
   <div>
   
   <RouterProvider router={browserRouter} />
   </div>
  )
}

export default App
