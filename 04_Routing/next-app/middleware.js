import {NextResponse} from "next/server";

/**
 *- Next 에 들어오는 요청을 middleware 를 통해 처리할 수 도 있다.
 */
export function middleware(request) {
  console.log( '<< request >>' , request );
  // 요청을 평가한뒤 원래 목표로 보냄
  return NextResponse.next();

  // 요청을 평가한뒤 반려시킴
  // return NextResponse.redirect();
}

export const config = {
  matcher: '/news' // 해당하는 요청들만 middleware 를 실행시킴
};