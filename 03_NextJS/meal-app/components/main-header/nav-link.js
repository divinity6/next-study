'use client';

import classes from "./nav-link.module.css";
import Link from "next/link";
import {usePathname} from "next/navigation";

/**
 * - 되도록 서버컴포넌트의 처리부하량을 줄이기 위하여,
 *   클라이언트에서 해당 컴포넌트들이 렌더링되도록 처리.
 */

export default function NavLink( { href , children } ){

  const path = usePathname();
  return (
    <Link
      href={href}
      className={
        path.startsWith( href )
          ? `${ classes.link } ${ classes.active }` :
          `${ classes.link }` }>
      { children }
    </Link>
  );
}