import Posts from '@/components/posts';
import { getPosts } from '@/lib/posts';

export default async function FeedPage() {
  const posts = await getPosts();
  return (
    <>
      <h1>작성한 피드 리스트들...</h1>
      <Posts posts={posts} />
    </>
  );
}
