'use client';

import { memo, useEffect, useRef } from 'react';

interface TurnstileProps {
  siteKey: string;
  onVerify: (token: string) => void;
  onError?: () => void;
  onExpire?: () => void;
  theme?: 'light' | 'dark' | 'auto';
  size?: 'normal' | 'compact';
}

declare global {
  interface Window {
    turnstile: {
      render: (element: HTMLElement, options: Record<string, unknown>) => string;
      remove: (widgetId: string) => void;
    };
    onloadTurnstileCallback?: () => void;
  }
}

// Memoize to prevent re-renders
const CloudflareTurnstile = memo(({
  siteKey,
  onVerify,
  onError,
  onExpire,
  theme = 'auto',
  size = 'normal'
}: TurnstileProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const renderedRef = useRef(false);

  useEffect(() => {
    // Only run once
    if (renderedRef.current) return;
    
    const renderWidget = () => {
      if (!containerRef.current || widgetIdRef.current) return;
      
      try {
        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          callback: onVerify,
          'error-callback': onError,
          'expired-callback': onExpire,
          theme,
          size
        });
        renderedRef.current = true;
      } catch (error) {
        console.error('Turnstile render error:', error);
      }
    };

    // Check if script is already loaded
    if (window.turnstile) {
      renderWidget();
    } else {
      // Load script if not present
      if (!document.querySelector('script[src*="challenges.cloudflare.com/turnstile"]')) {
        window.onloadTurnstileCallback = renderWidget;
        const script = document.createElement('script');
        script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback';
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
      }
    }

    // No cleanup - let the widget persist
  }, []); // Empty deps - only run once

  return <div ref={containerRef} />;
}, 
// Custom comparison - never re-render
() => true
);

CloudflareTurnstile.displayName = 'CloudflareTurnstile';

export default CloudflareTurnstile;