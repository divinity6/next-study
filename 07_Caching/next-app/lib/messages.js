import { cache } from "react";
import { unstable_cache as nextCache } from "next/cache";
import sql from 'better-sqlite3';

const db = new sql('messages.db');

function initDb() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY, 
      text TEXT
    )`);
}

initDb();

export function addMessage(message) {
  db.prepare('INSERT INTO messages (text) VALUES (?)').run(message);
}

// react 에서 제공하는 cache 함수
// next 에서 제공하는 unstable_cache 함수를 이용하여, 패이지를 새로고침해도 캐싱된 데이터 사용
export const getMessages = nextCache( cache(function getMessages() {
  console.log('<< Fetching messages from db >>');
  return db.prepare('SELECT * FROM messages').all();
  // 내부적으로 캐싱된 데이터를 식별하는 키를 2번째 인자로 받는다( revalidateTag key 가 아니다 )
}) , ['messages' ] , {
  tags : ["msg"],
});

// export const getMessages = cache(function getMessages() {
//   console.log('<< Fetching messages from db >>');
//   return db.prepare('SELECT * FROM messages').all();
// });
