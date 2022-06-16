import Register from '../pages/Register';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import AddPlant from '../pages/AddPlant';
import Plant from '../pages/Plant';
import PlantRequests from '../pages/PlantRequests';
import AddPottingMix from '../pages/AddPottingMix';
import PottingMixes from '../pages/PottingMixes';
import MyCollection from '../pages/MyCollection';

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
  {
    path: '/plant/:id',
    element: Plant,
  },
];

export const privateRoutes = [
  {
    path: '/profile',
    element: Profile,
  },
  {
    path: '/potting-mixes',
    element: PottingMixes,
  },
  {
    path: '/add-potting-mix',
    element: AddPottingMix,
  },
  {
    path: '/my-collection',
    element: MyCollection,
  },
];

export const adminRoutes = [
  {
    path: '/add-plant',
    element: AddPlant,
  },
  {
    path: '/plant-requests',
    element: PlantRequests,
  },
];
