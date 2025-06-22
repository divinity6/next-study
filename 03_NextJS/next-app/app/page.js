import Link from "next/link";
import Header from '@/components/header';

export default function Home() {
  console.log( '<< 지금 실행중입니다... >>' );
  return (
    <main>
      <Header />
      <p>🔥 Let&apos;s get started! 🔥</p>
      <p><Link href="/about">About us</Link></p>
    </main>
  );
}
