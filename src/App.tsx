import MainLayout from 'layouts/MainLayout';
import HomePage from 'pages/HomePage';
import MapPage from 'pages/MapPage';
import PostViewPage from 'pages/PostViewPage';
import TmpPage from 'pages/TmpPage';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'postView',
        element: <PostViewPage />,
      },
      {
        path: 'map',
        element: <MapPage />,
      },
      {
        path: 'tmp',
        element: <TmpPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
