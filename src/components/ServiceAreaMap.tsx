"use client";
import dynamic from "next/dynamic";
import { useMemo } from "react";

export const SERVICE_POLYGON: [number, number][] = [
  [53.5461, -111.0000],   // 1  top‑east  (east wall)
  [53.5461, -113.4938],   // 2  Edmonton city centre
                          //    — keeps the top edge perfectly horizontal
                          //      from east wall across to Edmonton
  [52.5200, -116.2000],   // 3  Nordegg apex (adjusted position)
  [50.7233, -113.9826],   // 4  Okotoks / Calgary knee
  [50.8000, -111.0000],   // 5  bottom‑east (east wall)
]; // Leaflet auto‑closes back to point 1

export const polygonCenter = (): [number, number] => {
  const lats = SERVICE_POLYGON.map(p => p[0]);
  const lons = SERVICE_POLYGON.map(p => p[1]);
  return [
    (Math.min(...lats) + Math.max(...lats)) / 2,
    (Math.min(...lons) + Math.max(...lons)) / 2
  ];
};

interface MapComponentProps {
  bounds: [number, number][];
  center: [number, number];
  className?: string;
  highlight?: [number, number] | null;
}

const MapComponent = dynamic<MapComponentProps>(() => import("@/components/MapComponent"), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-gray-100 animate-pulse" />,
});

interface Props {
  highlight?: [number, number] | null;
  className?: string;
}
export default function ServiceAreaMap({ highlight, className }: Props) {
  const center = useMemo(polygonCenter, []);
  return (
    <MapComponent
      bounds={SERVICE_POLYGON}
      center={center}
      className={className ?? "h-[500px] w-full"}
      highlight={highlight}
    />
  );
}
