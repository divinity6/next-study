import fs from 'node:fs';
import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';
import { S3Client , PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
  region: 'ap-northeast-2',
  credentials : {
    accessKeyId : process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey : process.env.AWS_SECRET_ACCESS_KEY,
  }
});
const db = sql( 'meals.db' );

/**
 * - deley 를 넣어 시간이 걸리도록 조작
 */
export async function getMeals(){

  await new Promise( resolve => setTimeout( resolve , 5000 ) );
  // throw new Error( '<< 식사를 불러오는 것을 실패했습니다 >>' );
  return db.prepare( `SELECT * FROM meals` ).all();
}

export function getMeal( slug ){
  // SQL 인젝션으로 지킬기위해 ? 로 동적인 값으로 처리한다
  return db.prepare( `SELECT * FROM meals WHERE slug = ?` ).get( slug );
}

export async function saveMeal( meal ){

  // lower => 모든 문자를 소문자로 변경하여, 저장한다.
  meal.slug = slugify( meal.title , { lower : true } );
  // meal 의 instructions 를 xss 공격으로부터 소독한다
  meal.instructions = xss( meal.instructions );
  console.log( '<< meal slug >>' , meal.slug );

  // 고유한 파일명생성
  const extension = meal.image.name.split( '.' ).pop();
  const fileName = `${ meal.slug }.${ extension }`;

  // public/images 디렉터리에 저장
  // const stream = fs.createWriteStream( `public/images/${ fileName }` );
  // arrayBuffer 를 반환하고,
  const bufferedImage = await meal.image.arrayBuffer();

  console.log( '<< filename >>' , fileName );
  const command = new PutObjectCommand({
    Bucket: 'hoon-nextjs-demo-users-image',
    Key: fileName,
    Body: Buffer.from(bufferedImage),
    ContentType: meal.image.type,
  });

  await s3Client.send(command);

  /**
   * - arrayBuffer 를 buffer 로 변환하여 저장,
   *
   * 1. 저장할 파일
   *
   * 2. 쓰기를 마치면 실행될 함수
   */
  // stream.write( Buffer.from( bufferedImage ) , error => {
  //   if ( error ){
  //     throw new Error( '이미지 저장 실패!' );
  //   }
  // } );

  // 이미지를 저장된 경로로 변경하여 저장
  meal.image = fileName;

  console.log( '<< meal >>' , meal );
  /**
   * - 직접 쓰게되면 sql injection 에 취약하기 때문에 @ 를 이용하여 특정 필드를 연결한다
   *
   * --> 쉼표도 정확하게 입력해야 한다
   */
  db.prepare( `
    INSERT INTO meals 
        (title, summary, instructions, creator, creator_email, image, slug)
    VALUES (
       @title,
       @summary,
       @instructions,
       @creator,
       @creator_email,
       @image,
       @slug
      )
  ` ).run( meal );
}