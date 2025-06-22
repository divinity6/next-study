import {getLatestNews} from "@/lib/news";
import NewsList from "@/components/news-list";

export default async function LatestNewsPage(){

  const latestNews = await getLatestNews();
  console.log('<< 병렬 라우트 렌더링 >>' );
  return (
    <>
      <h1>Latest News</h1>
      <NewsList news={latestNews} />
    </>
  );
}