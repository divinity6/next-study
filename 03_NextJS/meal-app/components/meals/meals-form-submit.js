'use client';
import { useFormStatus } from 'react-dom';
export default function MealsFormSubmit(){

  /**
   * - form 의 제줄등의 상태에 따라 status 의 pending 상태가 변화하는 hook 이다
   *
   * --> form 안의 컴포넌트에서만 동작한다
   */
  const { pending } = useFormStatus();

  return (
    // 제출중이라면 버튼을 비활성화하고, 아니면 활성화한다
    <button disabled={pending}>
      { pending ? '제출중...' : 'Meal 공유하기' }
    </button>
  );
}