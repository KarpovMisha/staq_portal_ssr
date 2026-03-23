import type { Metadata } from 'next';
import { ToastContainer } from 'react-toastify';
import { cookies } from 'next/headers';

import { getAuthState } from '@/auth/auth';
import StoreProvider from '../store/StoreProvider';
import { AuthProvider } from '../ui/components/auth-provider';
import ReactQueryProvider from '@/providers/ReactQueryProvider';
import Modals from '../ui/components/Modals/ModalsContainer';
import { abcWhyte, spaceGrotesk } from './fonts';
import '@/ui/styles/variables.scss';
import '@/ui/styles/index.scss';
import 'flag-icons/css/flag-icons.min.css';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const isDark = cookieStore.get('isDarkTheme')?.value === 'true';

  const auth = await getAuthState();

  return (
    <html
      lang="en"
      className={`${abcWhyte.variable} ${spaceGrotesk.variable} ${isDark ? 'dark-theme' : ''}`}
    >
      <head>
        {/* <link rel="stylesheet" href="https://assets.calendly.com/assets/external/widget.css" /> */}
      </head>
      <body>
        <AuthProvider
          initialAuthenticated={auth.authenticated}
          initialUser={auth.user}
        >
          <ReactQueryProvider>
            <StoreProvider>
              <div id="root">
                <ToastContainer
                  hideProgressBar={false}
                  draggable={false}
                  closeButton={false}
                  closeOnClick={false}
                />
                {children}
                <Modals />
              </div>
            </StoreProvider>
          </ReactQueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
