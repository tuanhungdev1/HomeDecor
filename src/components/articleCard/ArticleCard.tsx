import { Article } from "@/types/type";
import { LinkTo } from "../linkTo";

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <div className="flex flex-col w-full select-none">
      <div className="w-full">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="object-cover w-full"
        />
      </div>
      <div className="mt-5 mb-3 text-lg font-medium">
        <span>{article.title}</span>
      </div>

      <LinkTo url="/" className="text-base">
        Read More
      </LinkTo>
    </div>
  );
};

export default ArticleCard;
