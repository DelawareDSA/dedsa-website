import FAQ from './components/FAQ';
import JoinHero from './components/JoinHero';
import MembershipOptions from './components/MembershipOptions';
import WhyJoinDSA from './components/WhyJoinDSA';

export default function JoinPage() {
  return (
    <div className="bg-dsa-red-t4 min-h-screen">
      <div className="container-page py-12">
        <JoinHero />
        <WhyJoinDSA />
        <MembershipOptions />
        <FAQ />
      </div>
    </div>
  );
}
