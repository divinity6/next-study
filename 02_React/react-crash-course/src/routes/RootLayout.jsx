import { Outlet } from "react-router-dom";
import MainHeader from "../components/MainHeader.jsx";

/**
 * - 다른 라우터들을 감싸는 공유되는 라우트
 * @returns {JSX.Element}
 * @constructor
 */
function RootLayout(){
  return (
    <>
      <MainHeader />
      {/*
        Vue 의 <slot /> 처럼 컴포넌트가 어디 렌더링되어야 할지 알려주는 컴포넌트
       */}
      <Outlet />
    </>
  )
}

export default RootLayout;