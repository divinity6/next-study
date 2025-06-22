import MainHeader from "@/components/main-header/main-header";
import './globals.css';
import { headers } from 'next/headers';

export const metadata = {
  title: 'NextLevel 음식들',
  description: '맛있는 음식들, 커뮤니티에 좋아하는 음식들을 공유하세요.',
};

export const dynamic = 'force-static'; // 또는 'force-static', 'auto'

export default function RootLayout({ children }) {

  const allHeaders = headers();
  const headerObj = {};
  for (const [key, value] of allHeaders.entries()) {
    headerObj[key] = value;
  }

  console.log( '<< RootLayout >>' , {
    ts: new Date().toISOString(),
    pid: process.pid,
    headers: headerObj,
  } );
  return (
    <html lang="en">
      <body>
        <MainHeader />
        {children}
      </body>
    </html>
  );
}
