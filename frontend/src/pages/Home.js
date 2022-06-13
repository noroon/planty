import PlantRequest from '../components/PlantRequest';
import Plants from '../components/Plants';

export default function Home() {
  return (
    <div data-testid="home-container" className="container">
      <Plants />
      <PlantRequest />
    </div>
  );
}
