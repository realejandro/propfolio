import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App.jsx';
import { HomePage } from './pages/HomePage';
import PropertyPage from './pages/PropertyPage';
import AddPropertyPage from './pages/AddPropertyPage';
import ContactPage from './pages/ContactPage';
import RoomsPage from './pages/RoomsPage';
import AddRoomPage from './pages/AddRoomPage'; // ✅ NEW

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1 className='display-2'>Wrong page!</h1>,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '/properties',
        element: <PropertyPage />,
      },
      {
        path: '/addproperty',
        element: <AddPropertyPage />,
      },
      {
        path: '/contact',
        element: <ContactPage />,
      },
      {
        path: '/properties/:propertyId/rooms',
        element: <RoomsPage />, // NEW ROUTE
      },
      {
        path: '/properties/:propertyId/add-room',
        element: <AddRoomPage />, // NEW ROUTE
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
);


