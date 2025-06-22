import NewsList from "@/components/news-list";
import {getAvailableNewsMonths, getAvailableNewsYears, getNewsForYear, getNewsForYearAndMonth} from "@/lib/news";
import Link from "next/link";

export default function FilterNewsPage({params}) {

  const filter = params.filter;
  const selectedYear = filter?.[0];
  const selectedMonth = filter?.[1];

  let news;
  let links = getAvailableNewsYears();

  if (selectedYear && !selectedMonth) {
    news = getNewsForYear(selectedYear);
    links = getAvailableNewsMonths(selectedYear);
  }
  if ( selectedYear && selectedMonth ){
    news = getNewsForYearAndMonth( selectedYear , selectedMonth );
    links = [];
  }

  let newsContent = (<p>선택한 기간에 대한 뉴스를 찾지 못했습니다.</p>);
  if (news && 0 < news.length) {
    newsContent = <NewsList news={news}/>
  }

  if ( selectedYear && !getAvailableNewsYears().includes( +selectedYear ) ||
    selectedMonth && !getAvailableNewsMonths( selectedYear ).includes( +selectedMonth ) ){
    throw new Error( '유효하지 않은 필터' );
  }
  return (
    <>
      <header id="archive-header">
        <nav>
          <ul>
            {links.map(link => {

              const href = selectedYear ?
                `/archive/${selectedYear}/${link}` :
                `/archive/${link}`
              return (
                <li key={link}>
                  <Link href={href}>
                    {link}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </header>
      {newsContent}
    </>
  );
}