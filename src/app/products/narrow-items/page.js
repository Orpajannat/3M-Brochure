import NarrowItemsPage from "@/components/narrow-items/NarrowItemsPage";
import { getProductCategory } from "@/components/products/product-data";

const category = getProductCategory("narrow-items");

export const metadata = {
  title: "Narrow Items | 3M Label Limited",
  description: category.description,
};

export default function ProductPage() {
  return <NarrowItemsPage />;
}
