import {DUMMY_NEWS} from "@/dummy-news";
import {notFound} from "next/navigation";

/**
 * - 동적 라우트 안의 중첩된 페이지 처리시에는,
 *   동적라우트의 slug 값을 사용할 수 있다
 */
export default function ImagePage({params}) {

  const newsItemSlug = params.slug;
  const newsItem = DUMMY_NEWS.find( newsItem => newsItem.slug === newsItemSlug );
  if ( !newsItem ){
    notFound();
  }
  return (
    <div className="fullscreen-image">
      <img src={`/images/news/${ newsItem.image }`} alt={newsItem.title} />
    </div>
  );
}