// import { LoadingOverlay } from "@/components/loadingOverlay";
import {
  BannerSection,
  CategoriesSection,
  HeroSection,
  ProductCarousel,
  ValuesSection,
} from "@/modules/home";
import ArticlesSection from "@/modules/home/ArticlesSection";

const HomePage = () => {
  return (
    <main>
      {/* <LoadingOverlay /> */}
      <HeroSection />
      <CategoriesSection />
      <ProductCarousel />
      <ValuesSection />
      <BannerSection />
      <ArticlesSection />
    </main>
  );
};

export default HomePage;
