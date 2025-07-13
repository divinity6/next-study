## Caching


- next 는 캐싱정책을 매우 공격적으로 진행한다
  - 정확히말하면, 네가지 다른 영역에서 데이터나 페이지를 캐싱한다
  

- 요청을 기억한다
  - ( 동일한 요청을 가진, 데이터 요청을 저장하여, 중복 요청을 방지한다 )
  - NextJS 서버에서 처리되는, 단일 요청동안에만 발생한다


- NextJS 에 관리되는 메모리 데이터 캐시가 존재한다
  - 이는 요청캐시와는 다르다
  - ( 데이터소스가 변경되지 않을 경우, 데이터를 저장하고 재사용한다 )
  - 데이터가 변경되지 않는한, 요청자체를 완전히 피하는것이다
  - ( 어플리케이션의 성능을 더 빠르게한다 )
  - 사용자가 수동으로 revalidate 할때까지 지속된다


- NextJS 는 전체 라우트캐시( FullRouteCache )도 관리한다
  - 페이지에서 사용될 수 있는 데이터를 캐시하고 저장하고 재사용하는 것 뿐만아니라,
  - 전체 페이지, 전체 HTML 코드 및 전체 React 서버 컴포넌트 페이로드를 내부적으로 관리하고,
  - 해당 페이지들을 렌더링한다
  - 따라서, 데이터의 추가적인 왕복을 피하는 것 뿐만아니라, HTML 이 다시 리렌더링 되는것을 완전히 피한다
  - ( 페이지를 재사용할 수 있기 때문에, 더욱 빠르게 만든다 )
  - 데이터 캐시가 재검증될때까지 지속되며, 업데이트된 데이터가 있을때만 페이지가 다시 렌더링된다


- 마지막으로 Router 캐시가 존재한다
  - 다른점은 다른 3가지 캐시들은 모두 서버측에서 관리된다
  - 반면, 라우트 캐시는 클라이언트 측에서 관리되는 캐시이다
  - NextJS 는 브라우저 메모리에 일부 React 서버 컴포넌트 페이로드를 저장하여, 
  - 페이지간 이동이 더 빨리 일어날 수 있도록 한다
  - ( 전체 라우트 캐시가 있더라도, NextJS 는 캐시된 페이지를 가져오기 위해, NextJS 서버에 요청을 보내야 한다 - 요청자체를 피할수도 있다 )
  - 다른 도메인으로 이동했다 돌아올때 무효화된다

https://nextjs.org/docs/app/guides/caching

---

- 필요할때, 최신데이터가 표시되도록 NextJS 에 캐시된 데이터를 재검증하거나 버리도록 요청할 수 있다


- 또한, 어떤데이터가 캐싱될 것인지, 관리하는 방법도 체크한다

---

### NextJS 요청 기억

- NextJS 는 중복 요청을 방지하는 메커니즘이 있다
  - 그러나, 이매커니즘은 요청이 동일한 설정으로 전송될때만 활성화된다
  - 즉, headers 나 body 등 설정값이 동일한 요청일 경우에만, 해당 메커니즘을 이용한다


- 두 요청이 정확히 같은 구성을 가질때, Next 는 불필요한 요청을 피하고, 필요한 하나의 요청을 보내고
  - 필요한 응답을 애플리케이션의 모든 부분에서 재사용한다
  - ( 그런데, 브라우저에서 명시적으로 새로고침을 할 경우에는 데이터를 각각불러오는데...? )
  - 아이거... 개발자모드에서 캐싱방지하고 요청하는거켜놔서그럼...

---

### DataCache

- NextJS 에서 fetch 등으로 데이터를 가져올때, 
  - 응답 데이터를 내부적으로 관리1되는, 
  - 서버측 캐시에 저장하고 계속해서 그 데이터를 재사용한다
  - ( 더이상, 그 데이터11를 재사용하지 말라고 지시할때까지... revalidate 등... )


- Next 는 기본 fetch 함수를 오버라이딩한다
  - 따라서, { cache } 속성에 다음과같은 설정을 할 수 있 ㅎ
  - force-cache : 가능한한 캐싱되어 재사용 요청
  - no-store : 해당하는 fetch 함수만 캐시되지말라고 요청하는것( 항상 새 요청으로 새 데이터 사용 )
  - 또는,  { next: { revalidate: 5, } } 등으로 5초동안 캐시를하라고 시간을 지정할 수 있다
    - 데이터를 영구적으로 사용하지 않으면서, 캐싱을 진행하기에 자주 사용한다


- page,layout 등에 설정한 revalidate 설정은 fetch 에 설정한 revalidate 재검증과 동일한 목적을 지닌다


- 즉, fetch 에 특별히 각각 revalidate 설정을 따로 줄것이 아니라면, 
  - page 자체에 revalidate 를 설정하여,
  - 구성하는것이 구조적이다


- 또는, dynamic 처럼 전체 예약어를 구성할 수 있다
````javascript
/**
 * - dynamic 은 Next 가 찾는 예약어,
 *
 * - "force-dynamic" 은 fetch 의 cache : no-store 와 같이
 *    캐시설정을 하지않는것이다
 * - default( "auto" ) : 자동으로 next 에서 설정
 * - "force-static" : 새로운 데이터를 전혀가져오지 않음
 */
````

- 또는 페이지 전체에서는 캐싱을 사용하고 싶지만, 특정 컴포넌트에서는 사용하고 싶지 않다며
- noStore 함수를 이용하여, 특정 컴포넌트의 요청에대한 캐싱을 사용하지 않을 수 있다


- 예) 특정 page 의 요청에는 caching 처리해야하나, 해당페이지의 특정 컴포넌트의 요청에는 caching 처리를 하지않아야할 때,
````javascript
import { unstable_noStore } from "next/cache";

// 컴포넌트 내부
unstable_noStore();
- ````

---
### Full Route Cache

- 전체라우트 캐시는 빌드시, 생성되고 초기화되는데, build 를 하게되면, NextJS 가 


- 어플리케이션의 모든 페이지를 미리 렌더링하게된다
  - ( 동적 파라미터가 있는 동적페이지는 예외 )
  - 그외에 미리렌더링할 수 있는 모든 페이지는 미리 렌더링한다


- 그러나, 아래와 같은 예약어를 사용하면, 해당 페이지를 prerender 하지 않고, 항상 해당페이지를 다시 렌더링한다
  - ( 항상 최신 데이터를 가져온다는 것을 보장한다 )
````javascript
export const dynamic = 'force-dynamic';
````

- dynamic 지시어나, noStore 등은 캐싱을 전적으로 비활성화하거나, 특정 캐싱시간을 설정한다


- revalidatePath 는 NextJS 에 지시하여, 필요할때 특정 캐시부분을 재검증한다
  - ( 시간을 설정하거나, 영구적으로 비활성화하는것보단 효율적일 수 있다 )
  - 즉, nextJS 에게 명시적인 시점에 캐싱하라고 지시하는 것이다

````javascript
// 해당 페이지만 재검증
revalidatePath('/messages');

// 해당 페이지의 중첩된 path 까지 재검증
revalidatePath('/messages', 'layout');
````

- revalidateTag 를 이용하여, NextJS 에서 사용하는 fetch 요청들에 
  - tag 를 달아, 해당 tag 가 달린 요청들을 재검증시킬 수 도 있다

````javascript
// revalidateTag 로 msg 가 변경될때는 재호출
const response = await fetch('http://localhost:8080/messages', {
  next: {tags: ['msg']},
});

// Next server
// 요청중 msg 태그인 요청들 재검증
revalidateTag('msg');
````
---

### DataCaching

- next( 서버 ) 에서, DB 를 업데이트하거나, 새로운 정보를 받아오는 api 등은 일반적으로 next 에서,
  - 캐싱되지 않는데, 따라서, 한페이지내에 동일한 요청이 2번들어올 경우, 캐싱되지 않고, 2번 실행된다


- react 에서 제공하는 cache 를 이용하여, DB 를 업데이트하거나, 
  - 새로운 정보를 받아오는 등의 행동을 캐싱처리할 수 있다


- 이 cache 함수는 함수가 처음실행될때, 반환했던 데이터를 캐싱하여 반환해준다


- 애플리케이션의 어디에 위치하든, 단일 요청주기내에 있디면 캐싱하여, 해당응답을 재사용한다

````javascript
import { cache } from "react";
// db 에서 메시지를 가져오는 함수를 캐싱처리

// react 에서 제공하는 cache 함수
export const getMessages = cache(function getMessages() {
  console.log('<< Fetching messages from db >>');
  return db.prepare('SELECT * FROM messages').all();
});

````

- React 에서 cache 를 이용하여, 동일한 요청을 캐싱하여 처리했다.


- Next( 서버 ) 에서 제공하는 unstable_cache 는 함수가 반환하는 데이터를 
  - NextJS 의 데이터 캐시에서 캐싱할 수 있도록 한다


- 또한, NextCache( unstable_cache ) 는 항상 Promise 를 반환한다
  - 반환되는 데이터를 Promise 객체로 한번 래핑한다

````javascript
import { cache } from "react";
import { unstable_cache as nextCache } from "next/cache";
// db 에서 메시지를 가져오는 함수를 캐싱처리

// react 에서 제공하는 cache 함수
// next 에서 제공하는 unstable_cache 함수를 이용하여, 패이지를 새로고침해도 캐싱된 데이터 사용
export const getMessages = nextCache( cache(function getMessages() {
  console.log('<< Fetching messages from db >>');
  return db.prepare('SELECT * FROM messages').all();
  // 내부적으로 캐싱된 데이터를 식별하는 키를 2번째 인자로 받는다( revalidateTag key 가 아니다 )
}) , ['messages' ] );
````

- 또한, 위처럼 next 의 unstable_cache 함수를 이용하면, 새로고침해도 해당 요청자체를 서버에서 캐싱처리하기 때문에,


- 애초에 첫 요청을 보내고나서, 다시보내지 않는다


- 또한, 2번째 인자로 데이터를 내부적으로 사용하는 데이터 key 를 받을 수 있다( revalidateTag 의 key 는 아니다 )


- 이 방식대로 캐싱을하면, 데이터를 추가하거나 변경했을 경우, 해당 페이지를 다시방문해도 새로운 데이터가 불러와지지 않는다
  - 따라서, NextJS 에 해당하는 함수가 반환하는 데이터가 변경되었다고 알려야한다


- 새메시지를 추가한 이후, revalidatePath 를 이용하여, 해당페이지의 데이터 전체를 다시가져올 수 있또

---

- 또한, unstable_cache 를 이용할때, 3번째인자로, revalidate 설정이나( 다시 재실행되어야하는 시간 ),tag 를 지정할 수 있다 

````javascript
// actions 함수
import { cache } from "react";
import { unstable_cache as nextCache } from "next/cache";

// react 에서 제공하는 cache 함수
// next 에서 제공하는 unstable_cache 함수를 이용하여, 패이지를 새로고침해도 캐싱된 데이터 사용
export const getMessages = nextCache( cache(function getMessages() {
  console.log('<< Fetching messages from db >>');
  return db.prepare('SELECT * FROM messages').all();
  // 내부적으로 캐싱된 데이터를 식별하는 키를 2번째 인자로 받는다( revalidateTag key 가 아니다 )
}) , ['messages' ] , {
  revalidate: 5,
  tags : ["msg"],
});
````

- 이렇게 태그를 설정하고, revalidateTag 를 설정하면, 캐시된 데이터( 캐시된 응답값 )을 삭제하고, 
- 해당 태그가 있는 데이터 소스에서 다시 데이터를 가져온다

````javascript
// 사용하는 page , component 등
import {revalidateTag} from "next/cache";

export default function NewMessagePage() {

  async function createMessage(formData) {
    'use server';
    const message = formData.get('message');
    addMessage(message);
    revalidateTag('msg');
    redirect('/messages');
  }
  
  return (<form action={createMessage} />);
}
````

- 즉, 위의코드에서 msg 태그를 설정한, unstable_cache 코드들의 캐시를 삭제하고, 전부 새로 가져온다


- Next 는 매우 공격적인 캐싱을 진행하며, 
- 필요할때, 데이터를 다시 가져와서 페이지가 다시 렌더링되어야할때,
- 데이터를 다시가져와야할 때, 이를 보장할 수 있는 도구와 옵션을 알면된다!