'use client';

import { createContext, useContext, useState } from 'react';
import PreLoader from '@/components/PreLoader';
import SmoothScroll from '@/components/SmoothScroll';
import DraggableNav from '@/components/DraggableNav';

type AppReadyContextType = {
  preloaderDone: boolean;
};

const AppReadyContext = createContext<AppReadyContextType>({
  preloaderDone: false,
});

export const useAppReady = () => useContext(AppReadyContext);

export default function ClientShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [preloaderDone, setPreloaderDone] = useState(false);

  return (
    <AppReadyContext.Provider value={{ preloaderDone }}>
      <SmoothScroll>
        {children}
        <DraggableNav />
      </SmoothScroll>

      {!preloaderDone && (
        <PreLoader
          minMs={2000}
          onDone={() => {
            setPreloaderDone(true);
          }}
        />
      )}
    </AppReadyContext.Provider>
  );
}