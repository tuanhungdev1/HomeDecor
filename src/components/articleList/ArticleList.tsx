import { Article } from "@/types/type";
import ArticleCard from "../articleCard/ArticleCard";

const ArticlesItem: Article[] = [
  {
    id: "1",
    imageUrl: "/public/article1.png",
    title: "7 ways to decor your home",
  },
  {
    id: "2",
    imageUrl: "/public/article2.png",
    title: "Kitchen organization",
  },
  {
    id: "3",
    imageUrl: "/public/article3.png",
    title: "Decor your bedroom",
  },
];

const ArticleList = () => {
  return (
    <div className="flex flex-col gap-20 mt-10 md:gap-4 lg:gap-7 md:flex-row  md:h-[320px] lg:h-[370px] xl:h-[450px] 2xl:h-[520px]">
      {ArticlesItem.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
};

export default ArticleList;
