'use client';

/**
 * - 서버가 작동중일때 뿐만아닌, 클라이언트 사이드에서도 발생할 수 있다
 */
export default function FilterError({error}) {

  return (
    <div id="error">
      <h2>오류가 발생했습니다!</h2>
      <p>{ error.message }</p>
    </div>
  );
}