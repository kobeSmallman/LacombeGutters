import { Metadata } from 'next';
import ServiceAreaContent from './ServiceAreaContent';

export const metadata: Metadata = {
  title: 'Service Areas | Lacombe Gutters',
  description: 'We proudly serve all of Central Alberta, from Leduc to Airdrie (north-south) and Stettler to Nordegg (east-west)',
  alternates: {
    canonical: 'https://www.lacombeguttersltd.com/service-areas',
  },
};

export default function ServiceAreasPage() {
  return <ServiceAreaContent />;
}
