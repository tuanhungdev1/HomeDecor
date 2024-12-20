import { ArticleList } from "@/components/articleList";
import { LinkTo } from "@/components/linkTo";
import { Heading } from "@/components/typography";

const ArticlesSection = () => {
  return (
    <section className="pt-10 pb-10">
      <div className="flex items-end justify-between">
        <Heading>Articles</Heading>
        <LinkTo url="/" className="text-base md:text-xl">
          More Articles
        </LinkTo>
      </div>
      <ArticleList />
    </section>
  );
};

export default ArticlesSection;
