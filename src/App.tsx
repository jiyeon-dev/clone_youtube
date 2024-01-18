import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { HomeLayout } from './layouts';
import {
  Base,
  Results,
  Watch,
  Subscriptions,
  Channels,
  Channel,
} from './pages';

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
        element: <Results />,
      },
      {
        path: 'watch',
        element: <Watch />,
      },
      {
        path: '/:customUrl/*',
        element: <Channel />,
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
