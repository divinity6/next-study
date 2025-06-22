'use client';
/**
 * - 내비게이션 요청을 가로챌 경우 보여줄 페이지
 */
import {DUMMY_NEWS} from "@/dummy-news";
import {notFound, useRouter} from "next/navigation";

/**
 * - 동적 라우트 안의 중첩된 페이지 처리시에는,
 *   동적라우트의 slug 값을 사용할 수 있다
 */
export default function InterceptedImagePage({params}) {

  const router = useRouter();
  const newsItemSlug = params.slug;
  const newsItem = DUMMY_NEWS.find( newsItem => newsItem.slug === newsItemSlug );
  if ( !newsItem ){
    notFound();
  }
  return (
    <>
      <div className="modal-backdrop" onClick={ router.back } />
      <dialog className="modal" open>
        <div className="fullscreen-image">
          <img src={`/images/news/${ newsItem.image }`} alt={newsItem.title} />
        </div>
      </dialog>
    </>
  );
}