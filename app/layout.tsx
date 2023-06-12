import './globals.css';
import { Figtree } from 'next/font/google';
//components
import Sidebar from '@/components/Sidebar';
import SupabaseProvider from '@/providers/SupabaseProvider';
import UserProvider from '@/providers/UserProvider';
import ModalProvider from '@/providers/ModalProvider';
import ToasterProvider from '@/providers/ToasterProvider';
import getSongsbyUserID from '@/actions/getSongsbyUserID';
import Player from '@/components/Player';
import getActiveProductwithPrices from '@/actions/getActiveProductwithPrices';

const font = Figtree({ subsets: ['latin'] });

export const metadata = {
  title: 'Beatboxx',
  description: 'Listen and upload your songs',
};

export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userSongs = await getSongsbyUserID();
  const products = await getActiveProductwithPrices();
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider products={products} />
            <Sidebar songs={userSongs}>{children}</Sidebar>
            <Player />
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
