import HeroSection from '../components/home/HeroSection';
import StatsGrid from '../components/home/StatsGrid';
import ExplorerLinks from '../components/home/ExplorerLinks';
import FeaturedDesigns from '../components/home/FeaturedDesigns';

export default function HomePage() {
  return (
    <div className="p-6 space-y-10 max-w-7xl mx-auto">
      <HeroSection />
      <StatsGrid />
      <ExplorerLinks />
      <FeaturedDesigns />
    </div>
  );
}
