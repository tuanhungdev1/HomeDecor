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
    <div className="flex flex-col gap-10 mt-10">
      {ArticlesItem.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
};

export default ArticleList;
