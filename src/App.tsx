import MainLayout from 'layouts/MainLayout';
import MapLayout from 'layouts/MapLayout';
import PostLayout from 'layouts/PostLayout';
import ErrorPage from 'pages/ErrorPage';
import HomePage from 'pages/HomePage';
import MapPage from 'pages/MapPage';
import PostViewPage from 'pages/PostViewPage';
import PostPage from 'pages/PostPage';
import TmpPage from 'pages/TmpPage';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import PostAddPage from 'pages/PostAddPage';

declare global {
  interface Window {
    kakao: any;
  }
}
const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'postView',
        element: <PostLayout />,
        children: [
          {
            index: true,
            element: <PostViewPage />,
          },
          {
            path: 'Add',
            element: <PostAddPage />,
          },
        ],
      },
      {
        path: 'map',
        element: <MapLayout />,
        children: [
          {
            index: true,
            element: <MapPage />,
          },
        ],
      },
      {
        path: 'tmp',
        element: <TmpPage />,
      },
      {
        path: 'post',
        element: <PostPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
