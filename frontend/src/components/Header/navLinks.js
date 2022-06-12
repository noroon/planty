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
      title: 'Főoldal',
      path: '/',
      id: 'home',
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
  ],
};

export default navLinks;
