import { Suspense } from 'react';

import Posts from '@/components/posts';
import { getPosts } from '@/lib/posts';

async function LatestPosts() {
  const latestPosts = await getPosts(2);
  return <Posts posts={latestPosts} />;
}

export default async function Home() {
  return (
    <>
      <h1>안녕하세요!</h1>
      <p>피드들을 확인해보세요.</p>
      <section id="latest-posts">
      <Suspense fallback={<p>로딩중...</p>}>
        <LatestPosts />
      </Suspense>
      </section>
    </>
  );
}
