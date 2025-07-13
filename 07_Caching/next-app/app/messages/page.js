import Messages from '@/components/messages';
import {getMessages} from "@/lib/messages";
// import { unstable_noStore } from "next/cache";
// export const revalidate = 5;

/**
 * - dynamic 은 Next 가 찾는 예약어,
 *
 * - "force-dynamic" 은 fetch 의 cache : no-store 와 같이
 *    캐시설정을 하지않는것이다
 * - default( "auto" ) : 자동으로 next 에서 설정
 * - "force-static" : 새로운 데이터를 전혀가져오지 않음
 */
// export const dynamic = 'force-dynamic';

export default async function MessagesPage() {
  // unstable_noStore();
  // const response = await fetch('http://localhost:8080/messages', {
  //   next: {tags: ['msg']},
  // });
  // const messages = await response.json();

  const messages = await getMessages();
  if (!messages || messages.length === 0) {
    return <p>No messages found</p>;
  }

  return <Messages messages={messages} />;
}
