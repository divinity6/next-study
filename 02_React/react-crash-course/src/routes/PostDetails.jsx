import { useLoaderData, Link } from 'react-router-dom';

import Modal from '../components/Modal';
import classes from './PostDetails.module.css';

function PostDetails() {

  // loader 에서 반환한 post 데이터를 가지고와서 여부에 따라 처리한다
  const post = useLoaderData();
  if (!post) {
    return (
      <Modal>
        <main className={classes.details}>
          <h1>Could not find post</h1>
          <p>Unfortunately, the requested post could not be found.</p>
          <p>
            <Link to=".." className={classes.btn}>
              Okay
            </Link>
          </p>
        </main>
      </Modal>
    );
  }
  return (
    <Modal>
      <main className={classes.details}>
        <p className={classes.author}>{post.author}</p>
        <p className={classes.text}>{post.body}</p>
      </main>
    </Modal>
  );
}

export default PostDetails;

/**
 * - 동적으로 설정한 /: 경로 값은 loader 함수의 params 객체안에서 해당 키값으로 찾아올 수 있다
 */
export async function loader( { params } ){

  const response = await fetch( `http://localhost:8080/posts/${ params.id }` );
  const resData = await response.json();
  return resData.post;
}