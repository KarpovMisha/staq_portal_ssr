import SettingsNavigation from "@/features/Dashboard/Settings/SettingsNavigation/SettingsNavigation";
import style from './layout.module.scss';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className={style.settings}>
      <SettingsNavigation />
      <div>{children}</div>
    </section>
  );
}
