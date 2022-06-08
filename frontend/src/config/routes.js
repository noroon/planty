import Register from '../pages/Register';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import AddPlant from '../pages/AddPlant';

export const routes = [
  {
    path: '/',
    element: Home,
  },
  {
    path: '/login',
    element: Login,
  },
  {
    path: '/register',
    element: Register,
  },
];

export const privateRoutes = [
  {
    path: '/profile',
    element: Profile,
  },
  {
    path: '/add-plant',
    element: AddPlant,
  },
];
