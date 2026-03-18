import { Protected, TopBar } from '@/ui/components';
import DashboardSidebar from '@/ui/components/Sidebars/DashboardSidebar/DashboardSidebar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container">
      <div className="content">
        <Protected>
          <TopBar page="dashboard" />
          <div className="main_layout">
            <div>
              <aside id="sidebar"><DashboardSidebar/></aside>
              <main className="main_grid">{children}</main>
            </div>
          </div>
        </Protected>
      </div>
    </div>
  )
}
