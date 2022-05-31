import jwtDecode from 'jwt-decode';

export default function AuthReducer(initialState, action) {
  switch (action.type) {
    case 'REQUEST_LOGIN':
      return {
        ...initialState,
        loading: true,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...initialState,
        userDetails: jwtDecode(JSON.parse(localStorage.getItem('currentUser'))),
        token: JSON.parse(localStorage.getItem('currentUser')),
        loading: false,
      };
    case 'LOGOUT':
      return {
        ...initialState,
        userDetails: '',
        token: '',
      };

    case 'LOGIN_ERROR':
      return {
        ...initialState,
        loading: false,
        errorMessage: action.error,
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}
