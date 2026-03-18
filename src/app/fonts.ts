import localFont from 'next/font/local';
import { Space_Grotesk } from 'next/font/google';

export const abcWhyte = localFont({
  src: [
    { path: '../fonts/whyte/ABCWhyte-Regular.woff', weight: '400', style: 'normal' },
    { path: '../fonts/whyteBold/ABCWhyte-Medium.woff', weight: '500', style: 'normal' },
  ],
  variable: '--font-familly-whyte',
  display: 'swap',
});


export const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-familly-grotesk',
  display: 'swap',
});
