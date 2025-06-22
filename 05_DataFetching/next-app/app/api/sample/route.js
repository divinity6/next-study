import {getAllNews} from "@/lib/news";

export async function GET( request ){
  const news = await getAllNews();
  console.log( '<< request >>' , news.map( news => news.title ) );

  // return Response.json();
  return new Response( JSON.stringify( news ) , {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}