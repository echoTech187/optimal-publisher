// FlyonuiScript.tsx
'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';


async function loadFlyonUI() {
  return import('flyonui/flyonui');
}

export default function FlyonuiScript() {
  const path = usePathname();

  useEffect(() => {
    const initFlyonUI = async () => {
      await loadFlyonUI();
    };

    initFlyonUI();
  }, []);

      useEffect(() => {
          if (
              window.HSStaticMethods &&
              typeof window.HSStaticMethods.autoInit === 'function'
          ) {
              // Delay the initialization to ensure DOM is fully loaded
              setTimeout(() => {
                  window.HSStaticMethods.autoInit();
              }, 100); // 100ms delay
          }
      }, [path]);
  return null;
}