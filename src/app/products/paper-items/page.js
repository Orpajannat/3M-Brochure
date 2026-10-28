import PaperItemsPage from "@/components/paper-items/PaperItemsPage";
import { getProductCategory } from "@/components/products/product-data";

const category = getProductCategory("paper-items");

export const metadata = {
  title: "Paper Items | 3M Label Limited",
  description: category.description,
};

export default function ProductPage() {
  return <PaperItemsPage />;
}
