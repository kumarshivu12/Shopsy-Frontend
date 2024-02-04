import Navbar from "../features/navbar/Navbar";
import AdminProductList from "../features/admin/components/AdminProductList";
import Footer from "../features/common/Footer";

function AdminHomePage() {
  return (
    <div>
      <Navbar>
        <AdminProductList />
      </Navbar>
      <Footer />
    </div>
  );
}

export default AdminHomePage;
