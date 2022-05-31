import { Navigate, Outlet } from 'react-router-dom';
import { useAuthState } from '../context';

export default function PrivateRoute({ redirectPath = '/' }) {
  const user = useAuthState();

  if (!user.userDetails) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
}
