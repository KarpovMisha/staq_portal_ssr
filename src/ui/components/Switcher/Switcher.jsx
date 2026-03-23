'use client';

import Switch from 'react-switch';
import SunIcon from '@/ui/icons/sun.svg';
import MoonIcon from '@/ui/icons/moon.svg';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectIsDarkMode, switcherActions, toggleTheme } from '@/store/slices/switcher';

export default function Switcher() {
  const handleDiameter = 17;
  const height = 11;
  const width = 27;
  const dispatch = useAppDispatch();
  const isSwitcherOpen = useAppSelector(selectIsDarkMode);
  const primaryColor = '#823CD7';
  // const primaryColor = themeConfig['--project-primary-docs-color'] || '#823CD7';

  function handleChange () {
    dispatch(toggleTheme(!isSwitcherOpen));
  }
  return (
    <div style={{ paddingLeft: '10px' }}>
      <Switch
        checked={isSwitcherOpen}
        onChange={handleChange}
        onColor="#4B4D5B"
        onHandleColor={primaryColor}
        offColor="#D2D3D6"
        offHandleColor={primaryColor}
        handleDiameter={handleDiameter}
        uncheckedIcon={false}
        checkedIcon={false}
        uncheckedHandleIcon={<SunIcon />}
        checkedHandleIcon={<MoonIcon />}
        height={height}
        width={width}
      />
    </div>
  );
}
