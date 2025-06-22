import classes from './page.module.css';
import Image from "next/image";
import {getMeal} from "@/lib/meals";
import {notFound} from "next/navigation";

/**
 * - 동적 메타데이터를 추가할 경우에는 다음과 같이 메타데이터를 추가할 수 있다
 *
 * --> metadata 값이 존재한다면, metadata 를 적용하고 없다면,
 *     generateMetadata 를 찾아 실행시킨다
 *
 * --> 반드시 반환값은 metadata 값이어야 한다
 *
 * --> 페이지 컴포넌트에 전달하는 인자와 같은 인자를 파라미터로 받는다
 */
export async function generateMetadata( { params } ){

  const meal = getMeal( params.mealSlug );

  if ( !meal ){
    // 해당 컴포넌트가 실행되는것을 멈추고 트리에서 가장가까운 notFound 페이지로 이동시킨다
    notFound();
  }
  return {
    title : meal.title,
    description : meal.summary,
  }
}

export default function MealDetailsPage( { params } ){

  const meal = getMeal( params.mealSlug );
  if ( !meal ){
    // 해당 컴포넌트가 실행되는것을 멈추고 트리에서 가장가까운 notFound 페이지로 이동시킨다
    notFound();
  }
  // 줄바꿈 원상복구처리
  meal.instructions = meal.instructions.replace( /\n/g , '<br />' );

  return (
    <>
      <header className={ classes.header }>
        <div className={ classes.image }>
          <Image src={`https://hoon-nextjs-demo-users-image.s3.amazonaws.com/${ meal.image }`} fill alt={meal.title} />
        </div>
        <div className={ classes.headerText }>
          <h1>{ meal.title }</h1>
          <p className={ classes.creator }>
            by <a href={`mailto:${ meal.creator_email }`}>{ meal.creator }</a>
          </p>
          <p className={ classes.summary }>{ meal.summary }</p>
        </div>
      </header>
      <main>
        <p
          className={ classes.instructions }
          dangerouslySetInnerHTML={ {
            __html : meal.instructions,
          } }>
        </p>
      </main>
    </>
  )
}