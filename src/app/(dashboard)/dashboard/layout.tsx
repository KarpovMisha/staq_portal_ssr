import { Protected, TopBar } from '@/ui/components';
import DashboardSidebar from '@/ui/components/Sidebars/DashboardSidebar/DashboardSidebar';
import Sidebar from '@/ui/components/Sidebars/Sidebar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container">
      <div className="content">
        <Protected>
          <TopBar />
          <div className="main_layout">
            <div>
              <aside id="sidebar"><Sidebar /></aside>
              <main className="main_grid">{children}</main>
            </div>
          </div>
        </Protected>
      </div>
    </div>
  );
}
