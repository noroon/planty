const navLinks = {
  visitor: [
    {
      title: 'Főoldal',
      path: '/',
      id: 'home',
    },
    {
      title: 'Regisztráció',
      path: '/register',
      id: 'register',
    },
    {
      title: 'Bejelentkezés',
      path: '/login',
      id: 'login',
    },
  ],

  registeredUser: [
    {
      title: 'Növények',
      path: '/',
      id: 'home',
    },
    {
      title: 'Földkeverékek',
      path: '/potting-mixes',
      id: 'potting-mixes',
    },
    {
      title: 'Adatlap',
      path: '/profile',
      id: 'my-profile',
    },
    {
      title: 'Kijelentkezés',
      path: '/',
      id: 'logout',
    },
  ],

  admin: [
    {
      title: 'Növény hozzáadása',
      path: '/add-plant',
      id: 'add-plant',
    },
    {
      title: 'Kérések',
      path: '/plant-requests',
      id: 'plant-requests',
    },
  ],
};

export default navLinks;
