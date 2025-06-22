import Link from "next/link";

export default function NewsDetailLayout({children , modal}) {
  return (
    <>
      {modal}
      {children}
    </>
  );
}