import {DUMMY_NEWS} from "@/dummy-news";
import {notFound} from "next/navigation";
import Link from "next/link";

export default function NewsDetailPage( { params } ){

  const newsSlug = params.slug;
  const newsItem = DUMMY_NEWS.find( newsItem => newsItem.slug === newsSlug );
  if ( !newsItem ){
    notFound();
  }
  return (
    <article className="news-article">
      <header>
        {/* 동적 라우트 내부, 중첩된 라우트로 접근할 수 있게 해준다 */}
        <Link href={`/news/${newsItem.slug}/image`}>
          <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
        </Link>
        <h1>{ newsItem.title }</h1>
        <time dateTime={newsItem.date}>{newsItem.date}</time>
      </header>
      <p>{ newsItem.content }</p>
    </article>
  );
}