"use client";
import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default icons inside Next.js
if (typeof window !== "undefined") {
  // @ts-expect-error - _getIconUrl is an internal Leaflet property that needs to be cleared
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "/images/marker-icon-2x.png",
    iconUrl: "/images/marker-icon.png",
    shadowUrl: "/images/marker-shadow.png",
  });
}

interface Props {
  bounds: [number, number][];
  center: [number, number];
  highlight?: [number, number] | null;
  userLocation?: [number, number] | null;
  defaultIcon?: unknown;
  zoom?: number;
  className?: string;
}
export default function MapComponent({
  bounds,
  center,
  highlight,
  zoom = 8,
  className = "h-[500px] w-full",
}: Props) {
  const divRef   = useRef<HTMLDivElement>(null);
  const mapRef   = useRef<L.Map | null>(null);
  const polyRef  = useRef<L.Polygon | null>(null);
  const markRef  = useRef<L.Marker | null>(null);

  // initial mount
  useEffect(() => {
    if (!divRef.current || mapRef.current) return;

    const map = L.map(divRef.current, { 
      zoomControl: false,
      zoom: zoom,
      center: center
    });
    
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
      maxZoom: 19,
    }).addTo(map);
    
    L.control.zoom({ position: "bottomright" }).addTo(map);

    // Add the polygon with proper styling
    const poly = L.polygon(bounds, {
      color: "#215e7d",
      fillColor: "#93c5fd",
      fillOpacity: 0.35,
      weight: 2,
    }).addTo(map);

    // Fit the map to show the entire polygon with some padding, but only once
    const handleLoad = () => {
      map.fitBounds(poly.getBounds().pad(0.1));
      map.off('load', handleLoad);
    };
    
    map.on('load', handleLoad);
    
    polyRef.current = poly;
    mapRef.current = map;
  }, [bounds, center, zoom]);

  // highlight marker & auto‑pan whenever highlight changes
  useEffect(() => {
    if (!mapRef.current) return;

    // remove previous marker
    if (markRef.current) {
      mapRef.current.removeLayer(markRef.current);
      markRef.current = null;
    }

    if (highlight) {
      const m = L.marker(highlight, {
        icon: L.divIcon({
          html: "📍",
          className: "user-marker",
          iconSize: [30, 30],
          iconAnchor: [15, 30],
        }),
      }).addTo(mapRef.current);
      markRef.current = m;
      
      // Set view to show both the service area and the highlighted location
      const bounds = polyRef.current?.getBounds();
      if (bounds) {
        const highlightPoint = L.latLng(highlight[0], highlight[1]);
        const newBounds = L.latLngBounds(bounds.getSouthWest(), bounds.getNorthEast())
          .extend(highlightPoint);
        mapRef.current.fitBounds(newBounds.pad(0.1), { animate: true });
      } else {
        mapRef.current.setView(highlight, 11, { animate: true });
      }
    }
  }, [highlight]);

  return <div ref={divRef} className={className} />;
}
