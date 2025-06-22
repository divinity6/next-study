import Link from 'next/link';
import Image from 'next/image';
import classes from './meal-item.module.css';

export default function MealItem({ title, slug, image, summary, creator }) {

  return (
    <article className={classes.meal}>
      <header>
        <div className={classes.image}>
          {/*
             DB 의 image 는 폭이나 넓이를 명시적으로 알수 없기에 fill 을 적용한다,
             미리 폭이나 너비를 알고 있다면, 알고 있는 값으로 설정하는 것이 좋다
           */}
          <Image src={`https://hoon-nextjs-demo-users-image.s3.amazonaws.com/${ image }`} alt={title} fill />
        </div>
        <div className={classes.headerText}>
          <h2>{title}</h2>
          <p>by {creator}</p>
        </div>
      </header>
      <div className={classes.content}>
        <p className={classes.summary}>{summary}</p>
        <div className={classes.actions}>
          <Link href={`/meals/${slug}`}>View Details</Link>
        </div>
      </div>
    </article>
  );
}