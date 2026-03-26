'use client';

import Switch from 'react-switch';
import SunIcon from '@/ui/icons/sun.svg';
import MoonIcon from '@/ui/icons/moon.svg';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectIsDarkMode, toggleTheme } from '@/store/slices/switcher';
import styles from './Switcher.module.scss';

export default function Switcher() {
  const handleDiameter = 14;
  const height = 16;
  const width = 32;
  const dispatch = useAppDispatch();
  const isSwitcherOpen = useAppSelector(selectIsDarkMode);


  function handleChange () {
    dispatch(toggleTheme(!isSwitcherOpen));
  }
  return (
    <div style={{ paddingLeft: '10px' }}>
      <Switch
        checked={isSwitcherOpen}
        onChange={handleChange}
        onColor="#1F1F22"
        offColor="#F2F2F3"
        onHandleColor="#2C2C2F"
        offHandleColor="#ffffff"
        handleDiameter={handleDiameter}
        uncheckedIcon={false}
        checkedIcon={false}
        uncheckedHandleIcon={<div className={styles.switcher__icon}><SunIcon /></div>}
        checkedHandleIcon={<div className={styles.switcher__icon}><MoonIcon /></div>}
        height={height}
        width={width}
      />
    </div>
  );
}
