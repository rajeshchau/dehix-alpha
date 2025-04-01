import { Inter } from 'next/font/google';

import './globals.css';
import StoreProvider from './app/storeProvider';
import { AuthProvider } from './app/AuthContext';

import { ThemeProvider } from './components/theme-provider';
import { TooltipProvider } from './components/ui/tooltip';
import { Toaster } from './components/ui/toaster';
import NetworkProvider from './utils/NetworkProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Dehix',
  description: 'Freelancer platform',
};

export default function RootLayout({ children }) {
  return (
    <StoreProvider>
      <html lang="en">
        <body className={inter.className}>
          <AuthProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <TooltipProvider>
                <NetworkProvider>{children}</NetworkProvider>
              </TooltipProvider>
              <Toaster />
            </ThemeProvider>
          </AuthProvider>
        </body>
      </html>
    </StoreProvider>
  );
}
