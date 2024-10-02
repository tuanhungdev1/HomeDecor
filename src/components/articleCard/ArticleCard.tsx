import { Article } from "@/types/type";
import { LinkTo } from "../linkTo";

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <div className="relative flex flex-col w-full select-none md:h-full">
      <div className="w-full">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="object-cover w-full"
        />
      </div>
      <div className="mt-5 mb-3 text-lg font-medium xl:text-xl 2xl:text-2xl">
        <span className="line-clamp-1">{article.title}</span>
      </div>

      <div className="absolute -bottom-6 md:bottom-0 2xl:-bottom-2">
        <LinkTo url="/" className="text-base">
          Read More
        </LinkTo>
      </div>
    </div>
  );
};

export default ArticleCard;
