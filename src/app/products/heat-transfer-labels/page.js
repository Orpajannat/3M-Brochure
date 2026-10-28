import HeatTransferPage from "@/components/heat-transfer/HeatTransferPage";
import { getProductCategory } from "@/components/products/product-data";

const category = getProductCategory("heat-transfer-labels");

export const metadata = {
  title: "Heat Transfer Labels | 3M Label Limited",
  description: category.description,
};

export default function ProductPage() {
  return <HeatTransferPage />;
}
