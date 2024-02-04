import Navbar from "../features/navbar/Navbar";
import ProductDetail from "../features/product/components/ProductDetail";
import Footer from "../features/common/Footer";

function ProductDetailPage() {
  return (
    <div>
      <Navbar>
        <ProductDetail />
      </Navbar>
      <Footer />
    </div>
  );
}

export default ProductDetailPage;
