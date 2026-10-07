'use client';

import { forwardRef, memo, useEffect, useImperativeHandle, useRef } from 'react';

interface TurnstileProps {
  siteKey: string;
  onVerify: (token: string) => void;
  onError?: () => void;
  onExpire?: () => void;
  theme?: 'light' | 'dark' | 'auto';
  size?: 'normal' | 'compact';
}

// Tokens are single-use: once the server has checked one, a retry needs a fresh
// token. reset() gets one in place without reloading the page (which would lose
// attached photos).
export interface TurnstileHandle {
  reset: () => void;
}

declare global {
  interface Window {
    turnstile: {
      render: (element: HTMLElement, options: Record<string, unknown>) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId: string) => void;
    };
    onloadTurnstileCallback?: () => void;
  }
}

// Memoize to prevent re-renders
const CloudflareTurnstile = memo(forwardRef<TurnstileHandle, TurnstileProps>(({
  siteKey,
  onVerify,
  onError,
  onExpire,
  theme = 'auto',
  size = 'normal'
}, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const renderedRef = useRef(false);

  useImperativeHandle(ref, () => ({
    reset: () => {
      if (!window.turnstile || !widgetIdRef.current) return;
      try {
        window.turnstile.reset(widgetIdRef.current);
      } catch (error) {
        console.error('Turnstile reset error:', error);
      }
    },
  }), []);

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
}),
// Custom comparison - never re-render
() => true
);

CloudflareTurnstile.displayName = 'CloudflareTurnstile';

export default CloudflareTurnstile;
