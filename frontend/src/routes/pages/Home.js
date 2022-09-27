import RequestForm from '../../components/RequestForm';
import Plants from '../../components/Plants';
import { useAuthState } from '../../context';

export default function Home() {
  const { userDetails } = useAuthState();
  return (
    <div data-testid="home-container" className="container">
      <Plants />
      {userDetails && !userDetails.isAdmin && <RequestForm />}
    </div>
  );
}
