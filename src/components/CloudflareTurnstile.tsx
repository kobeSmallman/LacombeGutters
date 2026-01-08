'use client';

import { useEffect, useRef, useState } from 'react';

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
    turnstile: any;
  }
}

const CloudflareTurnstile = ({
  siteKey,
  onVerify,
  onError,
  onExpire,
  theme = 'auto',
  size = 'normal'
}: TurnstileProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [status, setStatus] = useState('initializing');

  useEffect(() => {
    setMounted(true);
    console.log('[Turnstile] Component mounted');
  }, []);

  useEffect(() => {
    if (!mounted) return;

    console.log('[Turnstile] Starting initialization with siteKey:', siteKey);
    setStatus('loading script');

    let widgetId: string | null = null;

    const loadScript = () => {
      // Check if script already exists
      const existingScript = document.querySelector('script[src*="challenges.cloudflare.com/turnstile"]');
      if (existingScript) {
        console.log('[Turnstile] Script already exists, attempting to render');
        setStatus('script exists, rendering');
        renderWidget();
        return;
      }

      console.log('[Turnstile] Creating new script tag');
      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
      script.async = true;
      script.defer = true;
      
      script.onload = () => {
        console.log('[Turnstile] Script loaded successfully');
        setStatus('script loaded, rendering');
        renderWidget();
      };
      
      script.onerror = (error) => {
        console.error('[Turnstile] Failed to load script:', error);
        setStatus('script load failed');
        onError?.();
      };
      
      document.head.appendChild(script);
    };

    const renderWidget = () => {
      let attempts = 0;
      const checkInterval = setInterval(() => {
        attempts++;
        console.log(`[Turnstile] Render attempt ${attempts}`);
        
        if (typeof window !== 'undefined' && window.turnstile && containerRef.current) {
          clearInterval(checkInterval);
          console.log('[Turnstile] Window.turnstile found, rendering widget');
          setStatus('rendering widget');
          
          try {
            // Check if container is empty
            if (containerRef.current.children.length > 0) {
              console.log('[Turnstile] Container already has children, clearing');
              containerRef.current.innerHTML = '';
            }

            console.log('[Turnstile] Calling turnstile.render with:', {
              sitekey: siteKey,
              theme,
              size
            });

            widgetId = window.turnstile.render(containerRef.current, {
              sitekey: siteKey,
              callback: (token: string) => {
                console.log('[Turnstile] Success! Token received:', token.substring(0, 30) + '...');
                setStatus('verified');
                onVerify(token);
              },
              'error-callback': () => {
                console.error('[Turnstile] Error callback triggered - likely invalid site key or domain mismatch');
                setStatus('error - check site key/domain');
                onError?.();
              },
              'expired-callback': () => {
                console.log('[Turnstile] Token expired');
                setStatus('expired');
                onExpire?.();
              },
              theme,
              size
            });
            
            console.log('[Turnstile] Widget rendered with ID:', widgetId);
            setStatus('widget rendered');
          } catch (error) {
            console.error('[Turnstile] Error rendering widget:', error);
            setStatus('render error');
            onError?.();
          }
        } else {
          if (!window.turnstile) {
            console.log(`[Turnstile] Attempt ${attempts}: window.turnstile not yet available`);
          }
          if (!containerRef.current) {
            console.log(`[Turnstile] Attempt ${attempts}: container ref not available`);
          }
        }
      }, 100);

      // Stop checking after 5 seconds
      setTimeout(() => {
        if (attempts > 0) {
          console.error('[Turnstile] Timeout after 5 seconds and', attempts, 'attempts');
          setStatus('timeout');
          clearInterval(checkInterval);
          onError?.();
        }
      }, 5000);
    };

    loadScript();

    // Cleanup
    return () => {
      if (widgetId && typeof window !== 'undefined' && window.turnstile?.remove) {
        try {
          window.turnstile.remove(widgetId);
          console.log('[Turnstile] Widget cleaned up');
        } catch (e) {
          console.error('[Turnstile] Cleanup error:', e);
        }
      }
    };
  }, [mounted, siteKey, onVerify, onError, onExpire, theme, size]);

  if (!mounted) {
    return <div className="h-[65px]" />;
  }

  return (
    <div>
      <div ref={containerRef} />
    </div>
  );
};

export default CloudflareTurnstile;