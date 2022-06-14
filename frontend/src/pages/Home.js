import PlantRequest from '../components/PlantRequest';
import Plants from '../components/Plants';
import { useAuthState } from '../context';

export default function Home() {
  const user = useAuthState();
  return (
    <div data-testid="home-container" className="container">
      <Plants />
      {!user.userDetails.isAdmin && <PlantRequest />}
    </div>
  );
}
