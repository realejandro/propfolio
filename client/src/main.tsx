import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import App from './App.jsx'
import { HomePage } from './pages/HomePage.js'
import { LoginPage } from './pages/LoginPage.js'
import { SignUpPage } from './pages/SignUpPage.js'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1 className='display-2'>Wrong page!</h1>,
    children: [
      {
        index: true,
        element: <HomePage/> 
      }, {
        path: '/login',
        element: <LoginPage/>
      },{
        path:'/signup',
        element: <SignUpPage/>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
