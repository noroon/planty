import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';

import { routes, privateRoutes, adminRoutes } from './config/routes';
import { AuthProvider } from './context';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.element />}
            />
          ))}
          <Route element={<PrivateRoute />}>
            {privateRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<route.element />}
              />
            ))}
            <Route element={<AdminRoute />}>
              {adminRoutes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={<route.element />}
                />
              ))}
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
