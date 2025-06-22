import { Link , Form , redirect } from 'react-router-dom';
import Modal from "../components/Modal";
import classes from './NewPost.module.css';

function NewPost( { onAddPost } ) {

  return (
    <Modal>
      <Form method="post" className={classes.form}>
        <p>
          <label htmlFor="body">Text</label>
          <textarea id="body" name="body" required rows={3} />
        </p>
        <p>
          <label htmlFor="name">Your name</label>
          <input type="text" id="name" name="author" required />
        </p>
        <p className={classes.actions}>
          <Link to=".." type='button'>Cancel</Link>
          <button type='submit'>Submit</button>
        </p>
      </Form>
    </Modal>
  );
}

export default NewPost;

export async function action( { request } ){

  /**
   * - action 의 파라미터의 request 객체안에는, <From /> 에서
   *   입력받은 데이터를 가져올 수 있다
   */
  const formData = await request.formData();
  const postData = Object.fromEntries( formData );

   await fetch( 'http://localhost:8080/posts' , {
    method : 'POST',
    body :JSON.stringify( postData ),
    headers : {
      'Content-type' : 'application/json',
    }
  } );
  // 데이터를 서버에 업데이트하고 나면, 해당하는 링크로 리다이렉트 시킨다
  const response = redirect( '/' );
  // 이때, redirect 응답 객체를 반환하면, 리액트 라우터는 해당 경로로 리다이렉트 시켜준다
  return response;
}