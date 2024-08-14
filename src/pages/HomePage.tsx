import {
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
    </main>
  );
};

export default HomePage;
