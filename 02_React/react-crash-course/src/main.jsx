import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import RootLayout from "./routes/RootLayout";
import Posts , { loader as postsLoader } from './routes/Posts';
import NewPost , { action as newPostAction } from "./routes/NewPost";
import PostDetails , { loader as postDetailLoader } from "./routes/PostDetails";
import './index.css';

// 브라우저의 router 를 설정할 수 있는 함수다
const router = createBrowserRouter( [
  // Layout Route( 해당 레이아웃 라우트안에 정의한 라우트들을 품고 있는 개념 )
  {
    path : '/' , // 객체 하나하나가, 라우팅 페이지다 <우리-도메인/>
    element : <RootLayout /> ,
    children : [
      {
        path : '/' ,
        element : <Posts /> ,
        // 해당 경로의 router 가 활성화될때, loader 함수를 실행한다
        // 만약 해당 함수가 Promise 를 반환하면, 해당 Promise 가 해결된후,
        // element 를 렌더링한다
        loader : postsLoader,
        children : [
          {
            path : '/create-post' ,
            element : <NewPost />,
            action : newPostAction,
          },
          {
            /**
             * - : 를이용하여 동적으로 경로를 생성하게 할 수 있다.
             *
             * - 앞에 / 를 붙여 절대경로로 사용하게 할 수 있거나,
             *   생략하여 상대경로처럼 이용할 수 도 있다.
             */
            path : '/:id',
            element : <PostDetails />,
            loader : postDetailLoader,
          }
        ]
      },
    ]
  },
] );

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* app 대신 router provider 를 이용해, React 패스를 결정하고, 어디로 라우팅시킬지 결정한다 */}
    <RouterProvider router={ router } />
  </React.StrictMode>
)
