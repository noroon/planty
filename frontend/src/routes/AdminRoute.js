import { Navigate, Outlet } from 'react-router-dom';
import { useAuthState } from '../context';

export default function AdminRoute({ redirectPath = '/' }) {
  const user = useAuthState();

  if (!user.userDetails.isAdmin) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
}
