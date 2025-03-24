import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import App from './App.jsx'
import { HomePage } from './pages/HomePage'
import { SignedIn } from './pages/SignedIn'
import { TestComponent } from './components/TestComponent.js'

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
        path: '/dashboard',
        element: <SignedIn />  // Signed-in page for managing properties
      },
      {
        path:'/test',
        element:<TestComponent/> 
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)

