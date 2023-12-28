import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { HomeLayout } from './layouts';
import { Base } from './pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Base />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
