/**
 * - 오직 서버에서만 실행될 수 있도록 보장해주는 역할을 한다
 * --> ( server action 을 생성하고, 사용할 경우 )
 *
 */
'use server';
import {redirect} from "next/navigation";
import {saveMeal} from '@/lib/meals';
import {revalidatePath} from "next/cache";

function isInvalidText(text) {
  return !text || '' === text.trim();
}

/**
 * - 해당 함수는 서버쪽에서 실행된다
 * @param prevState - useFormState 에 담아서 사용할때는, 이전 상태값을 파라미터에 추가하여 전송한다
 * @param formData
 * @returns {Promise<{message: string}>}
 */
export async function shareMeal(prevState , formData) {
  // 각각의 name 필드에 있는 값들을 키로 get 으로 가져올 수 있다
  const meal = {
    title: formData.get('title'),  // formData 의 get 메서드로 접근할 수 있다
    summary: formData.get('summary'),
    instructions: formData.get('instructions'),
    image: formData.get('image'),
    creator: formData.get('name'), // name 필드를 creator 로 매핑
    creator_email: formData.get('email'),
  }
  // 서버측 유효성검사 추가
  if (isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.creator_email.includes('@') ||
    !meal.image || 0 === meal.image.size
  ) {
    return {
      message : 'input 값이 유효하지 않습니다.'
    };
  }
  // meal db 에 저장 및 public 폴더에 이미지 저장
  await saveMeal(meal);
  // /meals 페이지는 캐싱처리시 validate 검사를 다시수행하라고 지정( 중첩 페이지는 영향을 받지 않는다 )
  revalidatePath( '/meals' );
  redirect('/meals');
}