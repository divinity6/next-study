import { useLoaderData } from "react-router-dom";
import Post from "./Post";
import classes from "./PostsList.module.css";

/**
 * - Component 함수코드는 반드시 JSX 를 반환해야 한다
 *   ( Promise 를 반환하면 안된다 )
 * @returns {JSX.Element}
 * @constructor
 */
function PostsList() {

  /**
   * - 이런식으로 상태를 갱신하면 무한루프가 발생한다
   * --> state 를 갱신하면, 컴포넌트 함수가 리액트에 의해 다시 실행된다
   * --> 즉, 다시 fetch 요청도 실행되기 때문에, 무한루프가 발생하는것이다
   *
   * - 그래서 useEffect 를 사용한다
   *
   * --> 현재는 UI-Component 의 상태를 갱신하지 않고, react-route-dom 에서
   *     관리하기 때문에, useState 를 사용하지 않는다
   */
  // fetch( 'http://localhost:8080/posts' ).then( res => res.json() ).then( data => {
  //   setPosts( data.posts );
  // } );
  const posts = useLoaderData();
  return (
    <>
      { 0 < posts.length &&
        <ul className={classes.posts}>
          {posts.map(post => (
            <Post
              key={post.id}
              id={post.id}
              author={post.author}
              body={post.body}
            />
          ))}
        </ul>
      }
      { 0 === posts.length &&
        <div style={{ textAlign : 'center' , color : 'white' }}>
          <h2>There are no posts yet.</h2>
          <p>Start adding some!</p>
        </div>
      }
    </>
  );
}

export default PostsList;