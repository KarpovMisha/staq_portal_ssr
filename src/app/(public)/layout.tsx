import { TopBar } from '@/ui/components';
import Sidebar from '@/ui/components/Sidebars/Sidebar';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container">
      <div className="content">
        <TopBar />
        <div className="main_layout">
          <div>
            <aside id="sidebar"><Sidebar /></aside>
            <main className="main_grid">{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
}
