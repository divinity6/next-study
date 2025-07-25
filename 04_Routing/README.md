## Routing 및 PageRendering


- Routing 과 PageRendering 을 좀 더 심층적으로 다뤄본다


- 라우팅 패턴을 탐색하며, 학습을 발전시키고, NextJS 프로젝트에서 파일이름 및 폴더구조를 생성하여, 라우팅 개념을 익힌다


- Client Component 와 Server Component 를 심층적으로 비교한다

---

### 병렬 라우트 설정

- next 에서는 병렬 라우트를 추가할 수 있다


- 일반적으로 Next 에서 Layout , 컴포넌트에 children props 를 전달하는데, 보통 해당 페이지의 컨텐츠가 된다


- 병렬 라우트에서는 디렉터리이름 '@' 뒤에 입력한 이름을 props 로 전달하여, children 처럼 조건부 렌더링을 사용할 수 있다
  - 단순히 두개의 컨텐츠를 두개 포함하려면 굳이 병렬라우트를 사용하지 않고, 컴포넌트2개를 포함시키면 된다


- 그러나, 특별한 상황에서는 필요하다
  - 자식 페이지에 접근했을때, 특정 부분은 상위 페이지 정보를 유지하고,
  - 다른 부분은 변경되어야 할 경우에는, 병렬 라우트를 이용한다
  - 예) /news/2024 로 접근시 상단에는 컨텐츠를 보여주고, 하단에는 최신뉴스를 보여줘야할 경우,
  - 병렬 라우트를 활용하게 된다면, 기본값으로 최신뉴스를 렌더링하고, 상단 부분만 변경하면 된다
  - 특정한 path 로 이동할 경우, 일정영역만 변경하고 싶을때, 병렬 라우트를 이용한다

- 동일한 페이지에 표시하는 병렬라우트는 원하는 경로를 모두 표시해야한다
  - 예 1번 병렬라우트에 자식 /news/2024 추가시
  - 2번 병렬라우트에도 자식 /news/2024 추가헤야함


- 이때, default 옵션을 통하여, 2번 병렬라우트는 기본값을 불러오게 할 수 있다
  - 예 1번 병렬라우트에 자식 /news/2024 추가시
  - 2번 병렬라우트에는 자식을 추가하지 않고 default.js 를 추가하여 렌더링하게함
  - 이 경우, page.js 는 필요없고, default 파일로 자식들을 렌더링하게 할 수 있다


- 즉, 특정 영역만 독립적으로 렌더링 시켜야 하거나, 에러나 분기처리를 해야하거나, 


- URL 상태에 따라 특정 부분을 변경하고 싶을때는, 병렬 라우트를 이용한다


- 번외로, 기본 layout 과 page 를 통해, 전용 병렬 라우트를 만들지않고,
  - 기본 라우트를 사용해 변하지않는 부분은 굳이 전용라우트를 만들지 않게 할 수도 있다

---

### catch-all 라우트

- [[...슬러그이름]] 으로 catch-all 라우트를 만들 수 있다


- 라우팅 기반으로 서비스할때는, catch-all 이 훨씬 수월하고 좋은 방법이다


- 해당 경로 이후 모든 경로의 세그먼트를 캐치한다
  - [ 슬러그이름 ] 일 경우에는 단일 세그먼트를 캐치하지만
  - [[...슬러그이름]] 는 하위 모든 세그먼트를 캐치한다


- 병렬 라우트일 경우에는, 병렬 라우트위치부터 변경하기 때문에,
- 병렬라우트의 page.js 나 렌더링하는 파일이 존재해선 안된다


- 병렬 라우트를 사용할때, news/2024/3 형태일 때, 2024 나 3 월에가도 특정 영역은 같은 형태를 보존해야할때, 


- 즉, 다양한 경로에 활성화될 페이지를 구성할때는, catch-all 라우트를 이용하여 구현할 수 있다


- 또한, 잘못된 페이지에 접근했을때도, 수정하도록 할 수 있다


- error.js 를 추가하여 에러 페이지를 핸들링 할 수 있다
  - 해당 컴포넌트은 클라이언트 컴포넌트여야 한다

---

### Next ServerComponent ClientComponent

- Server Component 는 서버에서만 렌더링되기 때문에, 컴포넌트의 전체 기능이 서버에서만 실행되며, 클라이언트에서는 실행되지 않는다


- 클라이언트 컴포넌트도 서버에서 먼저 렌더링( pre-rendered )되지만, 클라이언트사이드에서도 렌더링 될 수 있다 


- 오류 페이지의 경우에는, 클라이언트에서도 오류가 날 수 있으므로, 'use client'로 작성하는것이 좋다


- 특별한 이유가 없다면, 클라이언트 컴포넌트로 바꾸는것은 좋지않다.
  - 클라이언트에서서 코드를 로딩할 필요가 없다면, 실행할 이유가 없기 때문이다.
  - 뭐든지, 서버에서 렌더링하는것이 더 낫다.


- 따라서, client component 를 생성하고 싶다면, server component 를 변경하는대신, 해당하는 부분만 잘게 쪼개, 클라이언트 컴포넌트로 생성하는것이 권장되는 방식이다

---
### 인터셉팅 라우트

- 동적 라우트 안의 중첩된 라우트에서는 해당 동적 라우트의 파라미터( [slug] 등 )에 접근할 수 있다


- 기본적으로 인터셉팅 라우트는 내부 내비게이션의 요청을 가로챈다
  - 일반적으로 페이지를 새로고침하거나, 웹 외부에서 들어올때는, 다른페이지가 표시되게한다


- 인터셉팅 라우트는 대체 라우트로, 페이지 내부 링크를 통한 탐색 여부에 따라, 때때로 활성화 된다


- 같은 경로라도 접근하는 방식에 따라, 표시되는 페이지가 달라진다( 어디에서 접근하는지에 따라...!! )


- 표기법은 접근하고자하는 라우트 경로 이름앞에 소괄호()를 추가한 디렉터리를 생성한다.
  - 소괄호 내부에 해당 라우트 경로가 같은 경로면 (.)을, 한단계위에있으면 (..)을, 두단계위면(..)(..)을 사용한다
  - 예) news -> (.)news
  - 참고로 해당 경로는 폴더구조 경로가아닌 라우트 경로이기때문에, 병렬라우트에서는 주의해야한다


- 즉, 페이지 접근방식에 따라, 불러오는 페이지가 달라진다
  - 이 방식은 병렬라우트와 결합했을때, 유용하다

---

### Routing Group


- 소괄호() 로 감싼 디렉터리 생성하고 식별자를 추가한후, 해당 디렉터리 안에 page 및 page 디렉터리를 옮기면, 
  - 그룹 라우트로 사용된다( 해당 그룹 라우팅 폴더는 새로운 페이지나, 라우팅을 생성하지 않는다 )
  - (content),(marketing) 등등...


- RouteGroup 을 통해 전용 레이아웃을 생성할 수 있다
  - 시작페이지에는 특정 레이아웃을 사용하고싶지않거나, 특정한 그룹에만 레이아웃을 적용하고 싶다면, RoutingGroup 을 이용한다


- RouteGroup 을 설정하면, 다른페이지들은 RouteGroup 과 같은 수준에 둘 수 없다
  - RouteGroup 안에 속하도록 처리해야 한다
  - 그러나, 같은 level 에 layout 은 필수적으로 포함되어야 한다

---

### RouteHandler

- Route 관련하여, RouteHandler 기능을 사용할 수 있다


- page.js 대신 route.js 파일을 생성하여 라우트 핸들러로 이용한다


- route.js 는 HTTP 메서드를 내보낼수 있다


- RouteHandler 의 핵심은 화면에 렌더링되지않는 페이지를 반환하는 라우트를 설정하는 것이다


- 따라서, 보통 라우트핸들러 페이지에서는 JSON 데이터를 반환하거나, 수신되는 JSON 데이터를 수락하고, JSON 응답을 반환한다


- RouteHandler 의 목적은 API 같은 라우트를 생성하여, 데이터 생성, 저장하는 등의 작업을 클라이언트에서 내부적으로 호출하는것이다


- 모바일 앱이나 페이지에서 전체 페이지 콘텐츠를 렌더링하는 것이 아니라, 내부적으로 일부 데이터만 저장할 수 도 있다


- Next 앱에서는 일반적으로 많이 쓰이진 않지만, 도움이 많이된다
  - 모바일 앱에서 Next.js 에 요청을 보낼 경우, 해당 기능을 많이 사용한다
  - RouteHandler 를 구축하여, 외부 클라이언트로 커뮤니케이션을 처리할 수 있다

---

### middleware

- Next server 에 들어오는 요청을 차단하거나 처리할수도있지만,


- 해당 미들웨어의 주요목적은 수신하는 요청을 살펴보고 변경하거나 차단하고 인증관련처리를 추가하고 다른페이지로 리다이렉션시키는것이다


- 미들웨어는 페이지, 라우트등 전체 웹사이트에 전송된 요청에서 실행할 코드를 설정하도록 허용한다


- 따라서, 해당 요청 블록을 검사하거나, 리다이렉션 시킬 수 있다