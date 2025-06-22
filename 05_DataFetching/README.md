## DataFetching


- 더는 코드내에서 하드코딩하지않는것을 의미한다


- 다른 데이터 소스에서 데이터를 로드한다


- 데이터를 어떻게 가져오고, 어디서 가져올 수 있는지 배우게 된다
  - ( 외부 API 에서 파일을 가져오고, 데이터베이스나 다른소스에서 로드하는법 )


- useEffect 로 리액트 앱에서는 서버데이터를 가져오는 일반적인 방법을 사용하지만, 이방법은 최선의 방법은 아니다
  - SEO 에서 소스에 데이터들을 가져오지 않고 스크립트로 가져오기 때문이다


- Next 서버 컴포넌트는 JSX 뿐만 아니라, Promise 객체도 반환할 수 있다
- 즉, 서버쪽에서 직접 데이터를 가져와 서버컴포넌트에서 반환하는것이 훨씬좋다
  - 서버컴포넌트는 비동기 함수로 동작해도 괜찮기 때문에 직접가져와서 반환하는것이 낫다

````javascript
export default async function NewsPage() {
  
  /**
   * - 서버컴포넌트에서는 fetch 함수를 직접불러서 호출할수 있다
   *
   * 1. Node.js 에서 지원하기 때문,
   *
   * 2. Next.js 가 이 fetch 함수를 확장하여, 추가 캐싱관련 기능을 추가했기 때문이다
   */
  const response = await fetch(`http://localhost:8080/news`);
  if (!response.ok){
    throw new Error(`news 데이터를 가져오는데 실패했습니다`);
  }
  const news = await response.json();
  return (
    <>
      <h1>News Page</h1>
      <NewsList news={news}/>
    </>
  );
}
````

- 그러나, 위방식보다, next 서버에 직접 sql 등을 설치한다면, next 에서 곧바로 데이터를 가져오는게 더 좋다

````javascript
export default function NewsPage() {

  const news = getAllNews();
  return (
    <>
      <h1>News Page</h1>
      <NewsList news={news}/>
    </>
  );
}
````

- React ServerComponent 가 있기 때문에, 가능한 방법이다
- 외부 API 를 사용하고 있지 않을 경우에는 위처럼 Next.js 내에서 데이터를 직접 데이터베이스에서 가져올 수 있다

---

- 중첩 병렬 라우팅을 사용할때는, loading.js 를 추가해도 fallback 을 받지못한다


- 왜냐하면, 이미 해당 페이지는 그려졌고, 영역단위가 새로변경되는 개념이기 때문에, 페이지 전체에대한 loading fallback 은 돌아오지 않는다
  - 이경우, react 에서 제공하는 Suspense 컴포넌트로 래핑하여, 원하는 부분의 폴백을 적용할 수 있다
  - 이 컴포넌트는 server component 에서도 사용가능하다