import Link from "next/link";
import Image from "next/image";
// next 에서 import 하는 img 객체는 src 속성을 가지고, 해당 경로에 img 가 매핑된다
import LogoImg from "@/assets/logo.png";
import classes from "./main-header.module.css";
import MainHeaderBackground from "@/components/main-header/main-header-background";
import NavLink from "@/components/main-header/nav-link";

export default function MainHeader(){

  return (
    <>
      <MainHeaderBackground />
      <header className={ classes.header }>
        <Link className={classes.logo} href="/">
          <Image src={ LogoImg } alt="접시위에 담긴 음식" priority />
          NextLevel Food
        </Link>

        <nav className={ classes.nav }>
          <ul>
            <li>
              <NavLink href="/meals">Browse Meals</NavLink>
            </li>
            <li>
              <NavLink href="/community">Foodies Community</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}