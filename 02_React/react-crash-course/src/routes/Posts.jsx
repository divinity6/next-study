import { Outlet } from "react-router-dom";
import PostsList from "../components/PostsList";


function Posts() {

  return (
    // 반드시 단일 wrapped component 를 반환해야한다
    <>
      <Outlet />
      <main>
        <PostsList />
      </main>
    </>
  );
}

export default Posts;

/**
 * - 일반적으로 React-Router 에서사용하는 loader 는 같은 loader 이름을 사용하여 정의한다
 */
export async function loader(){
  const res = await fetch( 'http://localhost:8080/posts' );
  const resData = await res.json();
  return resData.posts;
}