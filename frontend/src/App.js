import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import PrivateRoute from './routes/PrivateRoute';
import AdminRoute from './routes/AdminRoute';

import { routes, privateRoutes, adminRoutes } from './routes/routes.config.js';
import { AuthProvider } from './context';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />}>
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
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
