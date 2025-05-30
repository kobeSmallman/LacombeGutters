import { notFound } from 'next/navigation';

export default function CityGuttersPage() {
  notFound();
}

export function generateStaticParams() {
  return [];
}