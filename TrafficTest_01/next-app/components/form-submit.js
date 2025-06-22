"use client";
import { useFormStatus } from "react-dom";

export default function FormSubmit(){

  const status = useFormStatus();
  if (status.pending){
    return (<p>피드 생성중...</p>);
  }
  return (
    <>
      <button type="reset">초기화</button>
      <button>작성하기</button>
    </>
  );
}