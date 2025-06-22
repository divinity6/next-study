import logo from '@/assets/logo.png';
import Link from 'next/link';

export default function Header() {
  return (
    <header id="main-header">
      <Link href="/">
        <img src={logo.src} alt="로고" />
      </Link>
      <nav>
        <ul>
          <li>
            <Link href="/feed">피드</Link>
          </li>
          <li>
            <Link className='cta-link' href="/new-post">피드 생성</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
