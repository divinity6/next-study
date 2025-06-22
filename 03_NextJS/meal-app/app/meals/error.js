'use client';

export default function Error( { error } ){

  return (
    <main className="error">
      <h1>에러가 발생했습니다</h1>
      <p>식사 자료 로딩을 실패했습니다. 나중에 다시시도하세요.</p>
    </main>
  );
}