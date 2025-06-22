import Link from "next/link";
import { Suspense } from 'react';
import classes from "./page.module.css";
import MealsGrid from "@/components/meals/meals-grid";
import {getMeals} from "@/lib/meals";

export const metadata = {
  title: '모든 식사',
  description: '커뮤니티에서 공유한 맛있는 식사를 둘러보세요.',
};

/**
 * - 서버에서 실행되는 Component 이기 때문에,
 *   컴포넌트에서 직접 db 를 호출할 수 있다
 *
 * - 서버컴포넌트는 async 를 이용하여 비동기 컴포넌트로 변경될 수 있다
 *
 * --> 데이터를 가져오는 부분을 분리하였고, 이렇게 하면, 리액트에 내장된 컴포넌트로
 *     wrapping 할 수 있다
 */
async function Meals(){

  const meals = await getMeals();
  console.log( '<< Fetching meals >>' , meals.map( meal => meal.title ) );
  return <MealsGrid meals={ meals } />
}


export default  function MealsPage(){

  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious meals, created <span className={ classes.highlight }>by you</span>
        </h1>
        <p>
          Choose your favorite recipe and cook it yourself. It is easy and fun!
        </p>
        <p className={ classes.cta }>
          <Link href="/meals/share">
            Share Your Favorite Recipe
          </Link>
        </p>
      </header>
      <main className={classes.main}>
        <Suspense fallback={ <p className={ classes.loading }>Fetching meals...</p> }>
          <Meals />
        </Suspense>
      </main>
    </>
  );
}