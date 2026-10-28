import BagsStringsPage from "@/components/bags-strings/BagsStringsPage";
import { getProductCategory } from "@/components/products/product-data";

const category = getProductCategory("poly-bags-lock-strings");

export const metadata = {
  title: "Poly Bags & Lock Strings | 3M Label Limited",
  description: category.description,
};

export default function ProductPage() {
  return <BagsStringsPage />;
}
