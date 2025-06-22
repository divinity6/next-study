"use server";

import {redirect} from "next/navigation";
import {storePost, updatePostLikeStatus} from "@/lib/posts";
import {uploadImage} from "@/lib/aws";
import {revalidatePath} from "next/cache";

/**
 * - useFormState 로 전달되는 action 이다
 */
export async function createPost(prevState, formData) {

  const title = formData.get('title');
  const image = formData.get('image');
  const content = formData.get('content');

  let errors = [];
  if (!title || 0 === title.trim().length) {
    errors.push("제목이 필요합니다.");
  }
  if (!content || 0 === content.trim().length) {
    errors.push("컨텐츠가 필요합니다.");
  }
  if (!image || 0 === image.size) {
    errors.push("이미지가 필요합니다.");
  }
  // useFormState 를 이용하면, error 를 그냥 내보낼 수 있다
  if (0 < errors.length) {
    return {errors};
  }

  let imageUrl;
  try {
    imageUrl = await uploadImage(image);
  } catch (error) {
    throw new Error(`이미지를 업로드하지 못했습니다, 게시물을 만들지 못했습니다. 나중에 다시 시도하세요.`);
  }
  console.log('<< imageUrl >>', imageUrl);
  await storePost({
    imageUrl,
    title,
    content,
    userId: 1,
  });
  revalidatePath('/' , 'layout');
  redirect('/feed');
}

export async function togglePostLikeStatus(postId) {
  await updatePostLikeStatus(postId, 2);
  // 모든 페이지 재검증
  revalidatePath('/' , 'layout');
  // revalidatePath('/feed');
}