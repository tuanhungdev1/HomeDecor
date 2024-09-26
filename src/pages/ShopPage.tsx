import { Banner } from "@/components/banner";
import { BreadcrumbPath } from "@/components/breadcrumb/Breadcrumb";
import { FilterProduct } from "@/modules/shop";

const BreadcrumbShopPage: BreadcrumbPath[] = [
  {
    id: 1,
    titile: "Home",
    path: "/",
  },
  {
    id: 2,
    titile: "Shop",
    path: "/shop",
  },
];

const ShopPage = () => {
  return (
    <main>
      <Banner
        title="Shop Page"
        subTitle="Let’s design the place you always imagined."
        breadcrumb={BreadcrumbShopPage}
      />
      <FilterProduct />
    </main>
  );
};

export default ShopPage;
