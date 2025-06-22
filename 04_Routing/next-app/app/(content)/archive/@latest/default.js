import {getLatestNews} from "@/lib/news";
import NewsList from "@/components/news-list";

export default function LatestNewsPage(){

  const latestNews = getLatestNews();
  console.log('<< 병렬 라우트 렌더링 >>' );
  return (
    <>
      <h1>Latest News</h1>
      <NewsList news={latestNews} />
    </>
  );
}