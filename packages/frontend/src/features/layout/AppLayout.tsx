'use client';

import { useState } from 'react';
import { Header } from './Header';
import { IconSidebar } from './IconSidebar';
import { Main } from './Main';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [isDetailPanelOpen, setIsDetailPanelOpen] = useState(false);

  const toggleDetailPanel = () => {
    setIsDetailPanelOpen(!isDetailPanelOpen);
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header />
      <div className="flex-1 flex min-h-0">
        <IconSidebar onToggleDetailPanel={toggleDetailPanel} isDetailPanelOpen={isDetailPanelOpen} />
        <Main>{children}</Main>
      </div>
    </div>
  );
}
