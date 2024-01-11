import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { HomeLayout } from './layouts';
import { Base, Results, Watch } from './pages';

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
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
