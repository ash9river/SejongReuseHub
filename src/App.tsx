import MainLayout from 'layouts/MainLayout';
import HomePage from 'pages/HomePage';
import MapPage from 'pages/MapPage';
import PostViewPage from 'pages/PostViewPage';
import TmpPage from 'pages/TmpPage';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { store } from 'store';

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
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
