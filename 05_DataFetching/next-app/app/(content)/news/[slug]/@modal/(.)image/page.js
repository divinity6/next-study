/**
 * - 내비게이션 요청을 가로챌 경우 보여줄 페이지
 */
import {notFound} from "next/navigation";
import ModalBackdrop from "@/components/modal-backdrop";
import {getNewsItem} from "@/lib/news";

/**
 * - 동적 라우트 안의 중첩된 페이지 처리시에는,
 *   동적라우트의 slug 값을 사용할 수 있다
 */
export default async function InterceptedImagePage({params}) {

  const newsItemSlug = params.slug;
  const newsItem = await getNewsItem(newsItemSlug);
  if ( !newsItem ){
    notFound();
  }
  return (
    <>
      <ModalBackdrop />
      <dialog className="modal" open>
        <div className="fullscreen-image">
          <img src={`/images/news/${ newsItem.image }`} alt={newsItem.title} />
        </div>
      </dialog>
    </>
  );
}