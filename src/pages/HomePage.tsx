import {
  BannerSection,
  CategoriesSection,
  HeroSection,
  ProductCarousel,
  ValuesSection,
} from "@/modules/home";

const HomePage = () => {
  return (
    <main>
      <HeroSection />
      <CategoriesSection />
      <ProductCarousel />
      <ValuesSection />
      <BannerSection />
    </main>
  );
};

export default HomePage;
