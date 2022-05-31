import {
  createContext, useReducer, useContext,
} from 'react';
import jwtDecode from 'jwt-decode';
import AuthReducer from './reducer';

const AuthStateContext = createContext();
const AuthDispatchContext = createContext();

export const token = localStorage.getItem('currentUser')
  ? JSON.parse(localStorage.getItem('currentUser'))
  : '';
export const userDetails = token ? jwtDecode(token) : '';

const initialState = {
  userDetails: '' || userDetails,
  token: '' || token,
  loading: false,
  errorMessage: null,
};

export function useAuthState() {
  const context = useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error('useAuthState must be used within a AuthProvider');
  }

  return context;
}

export function useAuthDispatch() {
  const context = useContext(AuthDispatchContext);
  if (context === undefined) {
    throw new Error('useAuthDispatch must be used within a AuthProvider');
  }

  return context;
}

export function AuthProvider({ children }) {
  const [user, dispatch] = useReducer(AuthReducer, initialState);

  return (
    <AuthStateContext.Provider value={user}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
}
