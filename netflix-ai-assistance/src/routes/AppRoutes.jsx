import { createBrowserRouter } from 'react-router-dom';
import Login from '../components/Login';
import BodyLayout from '../components/BodyLayout';
import Home from '../components/Browse';

const AppRoutes = createBrowserRouter(
  [
    {
      path: '/',
      element: <BodyLayout />,
      children: [
        { index: true, element: <Login /> },
        { path: 'browse', element: <Home /> },
      ],
    },
  ],
  {
    future: { // This is exactly what the warning suggests adding
      v7_startTransition: true, // You've already done this!
    },
  }
);


export default AppRoutes;
