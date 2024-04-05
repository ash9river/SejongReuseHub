import MainLayout from 'layouts/MainLayout';
import MapLayout from 'layouts/MapLayout';
import PostLayout from 'layouts/PostLayout';
import ErrorPage from 'pages/ErrorPage';
import HomePage from 'pages/HomePage';
import MapPage from 'pages/MapPage';
import PostViewPage from 'pages/PostViewPage';
import TmpPage from 'pages/TmpPage';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { store } from 'store';

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
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
