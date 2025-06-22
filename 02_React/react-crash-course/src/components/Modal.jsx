import { useNavigate } from 'react-router-dom';
import classes from "./Modal.module.css";

function Modal( { children } ){
  const navigate = useNavigate();

  function closeHandler(){
    // 이동할 경로로 이동
    // 메인으로 이동할경우 보통 / 을쓰는데, 전단계 경로로이동할경우,
    // / 대신 .. 등의 명령어를 사용해도 된다
    navigate( '..' );
  }
  return (
    <>
      <div className={ classes.backdrop } onClick={closeHandler} />
      <dialog open className={classes.modal}>
        { children }
      </dialog>
    </>
  )
}
export default Modal;