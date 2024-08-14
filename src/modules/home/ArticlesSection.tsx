import { ArticleList } from "@/components/articleList";
import { LinkTo } from "@/components/linkTo";
import { Heading } from "@/layouts/typography";

const ArticlesSection = () => {
  return (
    <section className="pt-10 pb-10">
      <div className="flex items-end justify-between">
        <Heading>Articles</Heading>
        <LinkTo url="/" className="text-base">
          More Articles
        </LinkTo>
      </div>
      <ArticleList />
    </section>
  );
};

export default ArticlesSection;
