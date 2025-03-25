import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import App from './App.jsx'
import { HomePage } from './pages/HomePage'
import PropertyPage from './pages/PropertyPage'
import  AddPropertyPage from './pages/AddPropertyPage'
import TestPage from './pages/TestPage';


const router = createBrowserRouter([

  {
    path: '/',
    element: <App />,
    errorElement: <h1 className='display-2'>Wrong page!</h1>,
    children: [
      {
        index: true,
        element: <HomePage />  // HomePage handles login & signup
      },
      {
         path: '/properties',
         element: <PropertyPage />  // Page for managing users saved properties
      },
      { path: '/addproperty', 
        element: <AddPropertyPage /> // Page for adding a new property
      },
      {
        path: '/test',
        element: <TestPage />, //Page to test components
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)

