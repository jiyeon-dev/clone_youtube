import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { HomeLayout } from './layouts';
import { Base, Results, Watch, Subscriptions, Channels } from './pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Base />,
      },
      {
        path: 'results',
        index: true,
        element: <Results />,
      },
      {
        path: 'watch',
        index: true,
        element: <Watch />,
      },
    ],
  },
  {
    path: '/feed',
    element: <HomeLayout />,
    children: [
      {
        path: 'subscriptions',
        index: true,
        element: <Subscriptions />,
      },
      {
        path: 'channels',
        index: true,
        element: <Channels />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
