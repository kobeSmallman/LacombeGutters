"use client"

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function NavigationEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleRouteChange = () => {
      setLoading(true);
      setTimeout(() => setLoading(false), 1000);
    };

    handleRouteChange();
  }, [pathname, searchParams]);

  return (
    <>
      {loading && (
        <div className="fixed top-0 left-0 w-full h-1 bg-secondary z-50">
          <div 
            className="h-full bg-primary" 
            style={{
              width: '100%',
              animation: 'loading 1s ease-in-out',
              transformOrigin: 'left',
            }}
          />
        </div>
      )}
    </>
  );
}
