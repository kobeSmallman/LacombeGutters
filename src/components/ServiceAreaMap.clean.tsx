'use client';

import React, { useEffect, useState, Suspense } from 'react';
import dynamic from 'next/dynamic';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Next.js
if (typeof window !== 'undefined') {
  // Fix for Leaflet default icon issue in Next.js
  const iconProto = L.Icon.Default.prototype as { _getIconUrl?: string };
  delete iconProto._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: '/images/marker-icon-2x.png',
    iconUrl: '/images/marker-icon.png',
    shadowUrl: '/images/marker-shadow.png',
  });
}

// Create a custom error boundary component
class MapErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean}> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Map Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="h-[500px] flex items-center justify-center bg-gray-50 border border-red-200 rounded-lg">
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="text-red-500 text-4xl mb-4">⚠️</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Map Loading Error</h3>
            <p className="text-gray-600 mb-4">We&apos;re having trouble loading the map. Please try refreshing the page.</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// Define the coordinates for Central Alberta (approximate bounding box)
const CENTRAL_ALBERTA_COORDS: [number, number][] = [
  [53.26, -116.58],  // Nordegg (NW corner)
  [53.26, -112.78], // East of Leduc (NE corner)
  [50.58, -112.78], // East of Airdrie (SE corner)
  [50.58, -116.58], // West of Airdrie (SW corner)
];

// Helper function to calculate center of polygon
const calculateCenter = (coords: [number, number][]): [number, number] => {
  const lats = coords.map(coord => coord[0]);
  const lngs = coords.map(coord => coord[1]);
  
  return [
    (Math.max(...lats) + Math.min(...lats)) / 2,
    (Math.max(...lngs) + Math.min(...lngs)) / 2
  ];
};

const ServiceAreaMapContent = () => {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [isClient, setIsClient] = useState(false);
  const center = calculateCenter(CENTRAL_ALBERTA_COORDS);
  
  useEffect(() => {
    setIsClient(true);
    
    // Try to get user's current location
    if (typeof window !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    }
  }, []);
  
  // Dynamically import the MapComponent only on client side
  const MapComponent = dynamic(
    () => import('@/components/MapComponent'),
    { 
      ssr: false,
      loading: () => (
        <div className="h-[500px] flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Loading map...</p>
          </div>
        </div>
      ),
    }
  );
  
  if (!isClient) {
    return (
      <div className="h-[500px] flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <MapComponent 
        center={center} 
        bounds={CENTRAL_ALBERTA_COORDS}
        userLocation={userLocation}
        defaultIcon={null}
      />
    </div>
  );
};

const ServiceAreaMap = () => {
  return (
    <MapErrorBoundary>
      <Suspense fallback={
        <div className="h-[500px] flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Loading map...</p>
          </div>
        </div>
      }>
        <ServiceAreaMapContent />
      </Suspense>
    </MapErrorBoundary>
  );
};

export default ServiceAreaMap;
