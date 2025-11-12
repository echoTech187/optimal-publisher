// FlyonuiScript.tsx
'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import jQuery from "jquery";
import DataTable from "datatables.net-dt";
// Assign jQuery to window object for global access
declare global {
  interface Window {
    $: typeof jQuery;
    jQuery: typeof jQuery;
    DataTable: typeof DataTable; // Use a more specific type if available
    IStaticMethods: {
      autoInit: () => void;
    };
  }
}

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