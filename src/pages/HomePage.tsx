// import { LoadingOverlay } from "@/components/loadingOverlay";
import {
  BannerSection,
  BestSellerProducts,
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
      <BestSellerProducts />
      <ValuesSection />
      <BannerSection />
      <ArticlesSection />
    </main>
  );
};

export default HomePage;
