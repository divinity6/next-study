'use client';
import {useFormState} from "react-dom";
import ImagePicker from "@/components/meals/image-picker";
import classes from './page.module.css';
import {shareMeal} from "@/lib/actions";
import MealsFormSubmit from "@/components/meals/meals-form-submit";

export default function ShareMealPage() {

  /**
   * - server action 을 통해 제출된 상태를 관리한다
   *
   * --> 첫번째 인자는 server action,
   *
   * --> 두번째 인자는 초기값
   *
   * ( server action 이 return 되기 전까지의 값 )
   *
   * @return { state : any } - 초기값과 서버에서 반환한 응답값( 컴포넌트에 데이터를 출력하는데 사용한다 )
   * @return { formAction : any } - 서버 action 이고 이값을 form 의 action 에 연결한다
   */
  const [state, formAction] = useFormState(shareMeal, {message: null});

  return (
    <>
      <header className={classes.header}>
        <h1>
          Share your <span className={classes.highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <main className={classes.main}>
        <form className={classes.form} action={formAction}>
          <div className={classes.row}>
            <p>
              <label htmlFor="name">Your name</label>
              <input type="text" id="name" name="name" required/>
            </p>
            <p>
              <label htmlFor="email">Your email</label>
              <input type="email" id="email" name="email" required/>
            </p>
          </div>
          <p>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" required/>
          </p>
          <p>
            <label htmlFor="summary">Short Summary</label>
            <input type="text" id="summary" name="summary" required/>
          </p>
          <p>
            <label htmlFor="instructions">Instructions</label>
            <textarea
              id="instructions"
              name="instructions"
              rows="10"
              required
            ></textarea>
          </p>
          <ImagePicker lable="당신의 이미지" name="image"/>
          {state.message && <p>{state.message}</p>}
          <p className={classes.actions}>
            <MealsFormSubmit/>
          </p>
        </form>
      </main>
    </>
  );
}