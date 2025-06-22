import { v4 as uuidv4 } from 'uuid';
import { S3Client , PutObjectCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  region: 'ap-northeast-2',
  credentials : {
    accessKeyId : process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey : process.env.AWS_SECRET_ACCESS_KEY,
  }
});

export async function uploadImage(image) {

  const imageData = await image.arrayBuffer();
  const mime = image.type;
  const bytes = Buffer.from(image.name, 'binary');
  // const fileName = new TextDecoder('utf-8').decode(bytes);
  const fileName = `${ uuidv4() }.${ `${ image.name }`.split( '.' ).pop() }`;
  console.log( '<< image >>' , image );
  const command = new PutObjectCommand({
    Bucket: 'hoon-nextjs-demo-data-mutation-image',
    Key: fileName,
    Body: Buffer.from(imageData),
    ContentType: mime,
  });
  await s3Client.send(command);

  // 저장한 이미지 경로
  return `https://hoon-nextjs-demo-data-mutation-image.s3.amazonaws.com/${ fileName }`;
}