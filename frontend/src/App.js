import './App.css';
import React from 'react';
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
  // Route,
  // Link,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Header from './components/Header';
import Root from './routes/root';
import Login from './routes/login';
import ErrorPage from './routes/error-page';
// import logo from './logo.svg';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: async () => {
      const { token } = window.localStorage;

      if (!token) {
        return redirect('/login');
      }

      return null;
    },
  },
  {
    path: 'login',
    element: <Login />,
    errorElement: <ErrorPage />,
  },
]);

const App = () => (
  <React.StrictMode>
    <Header />
    <RouterProvider router={router} />
  </React.StrictMode>
);

export default App;
