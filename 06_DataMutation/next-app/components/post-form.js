"use client";
import {useFormState} from "react-dom";
import FormSubmit from "@/components/form-submit";

export default function PostForm({ action }){

  // form 의 상태와 action 을 사용한다
  const [state, formAction] = useFormState(action, {});

  return (
    <>
      <h1>Create a new post</h1>
      <form action={formAction}>
        <p className="form-control">
          <label htmlFor="title">타이틀</label>
          <input type="text" id="title" name="title" />
        </p>
        <p className="form-control">
          <label htmlFor="image">이미지</label>
          <input
            type="file"
            accept="image/png, image/jpeg"
            id="image"
            name="image"
          />
        </p>
        <p className="form-control">
          <label htmlFor="content">컨텐츠</label>
          <textarea id="content" name="content" rows="5"/>
        </p>
        <p className="form-actions">
          <FormSubmit/>
        </p>
        {state.errors && (
          <ul className="form-errors">
            {state.errors.map( error => <li key={error}>{error}</li> )}
          </ul>
        )}
      </form>
    </>
  );
}