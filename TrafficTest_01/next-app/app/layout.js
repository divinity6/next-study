import Header from '@/components/header';
import './globals.css';

export const metadata = {
  title: '부하테스트_1',
  description: '부하테스트를 실행하는 페이지입니다',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
