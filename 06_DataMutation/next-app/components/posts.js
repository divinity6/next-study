"use client";
import { useOptimistic } from 'react';
import { formatDate } from '@/lib/format';
import LikeButton from './like-icon';
import { togglePostLikeStatus } from "@/actions/posts";

function Post({ post, action }) {
  return (
    <article className="post">
      <div className="post-image">
        <img src={post.image} alt={post.title} />
      </div>
      <div className="post-content">
        <header>
          <div>
            <h2>{post.title}</h2>
            <p>
              Shared by {post.userFirstName} on{' '}
              <time dateTime={post.createdAt}>
                {formatDate(post.createdAt)}
              </time>
            </p>
          </div>
          <div>
            <form action={action.bind(null, post.id)} className={post.isLiked ? 'liked' : ''}>
              <LikeButton />
            </form>
          </div>
        </header>
        <p>{post.content}</p>
      </div>
    </article>
  );
}

export default function Posts({ posts }) {
  /**
   * - 서버측에서 업데이트를 처리하기전에, 클라이언트의 업데이트를 수행한다
   * --> 첫번째는 업데이트된 상태값, 두번째는 2번째로 전달된 함수이다
   *
   * updateOptimisticPosts 함수의 첫번째 인자는 자동으로 이전 posts 상태값을 넘겨준다
   */
  const [optimisticPosts, updateOptimisticPosts] = useOptimistic(posts, (prevPosts,updatedPostId) => {

    const updatedPostIndex = prevPosts.findIndex( post => post.id === updatedPostId );
    // 업데이트된 게시물이 없다면 기존값을 그대로 반환
    if ( -1 === updatedPostIndex ){
      return prevPosts;
    }
    const updatedPost = { ...prevPosts[ updatedPostIndex ] };
    // 좋아요수가 늘어났다면, 1을 증가시키고, 감소했다면 1을 뺀다
    updatedPost.likes = updatedPost.likes + ( updatedPost.isLiked ? -1 : 1);
    updatedPost.isLiked = !updatedPost.isLiked;
    const newPosts = [...prevPosts];
    newPosts[ updatedPostIndex ] = updatedPost;
    return newPosts;
  });
  if (!posts || posts.length === 0) {
    return <p>There are no posts yet. Maybe start sharing some?</p>;
  }

  /**
   * - 낙관적 업데이트 실행
   * @param postId
   */
  async function updatePost(postId){
    // 먼저 낙관적 업데이트 실행
    updateOptimisticPosts(postId);
    // 서버작업이 끝나고 next 가 동기화실행
    await togglePostLikeStatus(postId);
  }

  return (
    <ul className="posts">
      {optimisticPosts.map((post) => (
        <li key={post.id}>
          <Post post={post} action={updatePost} />
        </li>
      ))}
    </ul>
  );
}
