import RibbonsPage from "@/components/thermal-ribbons/RibbonsPage";
import { getProductCategory } from "@/components/products/product-data";
const category = getProductCategory("thermal-transfer-ribbons");
export const metadata = {
  title: "Thermal Transfer Ribbons | 3M Label Limited",
  description: category.description,
};
export default function ProductPage() {
  return <RibbonsPage />;
}
