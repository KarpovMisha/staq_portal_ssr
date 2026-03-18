import { HomeSidebar, TopBar } from '@/ui/components';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container">
      <div className="content">
        <TopBar page="home" />
        <div className="main_layout">
          <div>
            <aside id="sidebar"><HomeSidebar/></aside>
            <main className="main_grid">{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
}
