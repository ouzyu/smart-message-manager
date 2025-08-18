import { LayoutDashboard, Settings, Download, LogOut, PanelLeft, ChevronLeft, Sidebar } from 'lucide-react';
import { IconButton } from '@/components/button/IconButton';

interface IconSidebarProps {
  onToggleDetailPanel: () => void;
  isDetailPanelOpen: boolean;
}

export function IconSidebar({ onToggleDetailPanel, isDetailPanelOpen }: IconSidebarProps) {
  return (
    <div
      className={`h-full bg-muted border-r flex flex-col transition-[width] duration-300 ${
        isDetailPanelOpen ? 'w-64' : 'w-15'
      }`}
    >
      <div className="py-4 border-b">
        <div className="flex items-center overflow-hidden">
          <div className="w-15 flex justify-center flex-shrink-0">
            <IconButton
              icon={isDetailPanelOpen ? ChevronLeft : PanelLeft}
              variant={'sidebar'}
              onClick={onToggleDetailPanel}
              title={isDetailPanelOpen ? 'パネルを閉じる' : 'パネルを開く'}
            />
          </div>
          {isDetailPanelOpen && <span className="text-sm font-semibold truncate">閉じる</span>}
        </div>
      </div>

      <div className="flex-1 py-4">
        <div className="space-y-2">
          <div className="flex items-center overflow-hidden">
            <div className="w-15 flex justify-center flex-shrink-0">
              <IconButton icon={LayoutDashboard} variant={'sidebar'} title="ダッシュボード" />
            </div>
            {isDetailPanelOpen && <span className="text-sm truncate">ダッシュボード</span>}
          </div>

          <div className="flex items-center overflow-hidden">
            <div className="w-15 flex justify-center flex-shrink-0">
              <IconButton icon={Settings} variant={'sidebar'} title="設定" />
            </div>
            {isDetailPanelOpen && <span className="text-sm truncate">設定</span>}
          </div>

          <div className="flex items-center overflow-hidden">
            <div className="w-15 flex justify-center flex-shrink-0">
              <IconButton icon={Download} variant={'sidebar'} title="インストール" />
            </div>
            {isDetailPanelOpen && <span className="text-sm truncate">インストール</span>}
          </div>
        </div>
      </div>

      <div className="pb-4">
        <div className="flex items-center overflow-hidden">
          <div className="w-15 flex justify-center flex-shrink-0">
            <IconButton icon={LogOut} variant={'sidebar'} title="ログアウト" />
          </div>
          {isDetailPanelOpen && <span className="text-sm truncate">ログアウト</span>}
        </div>
      </div>
    </div>
  );
}
