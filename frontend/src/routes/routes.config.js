import {
  Register,
  Home,
  Login,
  Profile,
  AddPlant,
  PlantProfile,
  PlantRequests,
  AddPottingMix,
  PottingMixes,
  MyCollection,
} from './pages';

export const routes = [
  {
    path: '',
    element: Home,
  },
  {
    path: 'login',
    element: Login,
  },
  {
    path: 'register',
    element: Register,
  },
  {
    path: 'plant/:id',
    element: PlantProfile,
  },
];

export const privateRoutes = [
  {
    path: 'profile',
    element: Profile,
  },
  {
    path: 'potting-mixes',
    element: PottingMixes,
  },
  {
    path: 'add-potting-mix',
    element: AddPottingMix,
  },
  {
    path: 'my-collection',
    element: MyCollection,
  },
];

export const adminRoutes = [
  {
    path: 'add-plant',
    element: AddPlant,
  },
  {
    path: 'plant-requests',
    element: PlantRequests,
  },
];
