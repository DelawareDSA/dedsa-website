import AboutHero from './components/AboutHero';
import DemocraticSocialism from './components/DemocraticSocialism';
import GetInvolved from './components/GetInvolved';
import NationalInfo from './components/NationalInfo';
import Timeline from './components/Timeline';
import { AboutPageProps } from './types';

export default function AboutPage(props: AboutPageProps) {
  return (
    <div className="py-12 pt-10 bg-dsa-red-t4">
      <div className="container-page">
        <h1 className="mb-4 text-4xl font-bold">About Delaware DSA</h1>
        <AboutHero missionStatement={props.missionStatement} />
        <Timeline
          foundingYear={props.foundingYear}
          yearsActive={props.yearsActive}
        />
        <DemocraticSocialism />
        <GetInvolved />
        <NationalInfo />
      </div>
    </div>
  );
}
