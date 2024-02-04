import { createBrowserRouter } from "react-router-dom";

import SignupPage from "../pages/SignupPage";
import LoginPage from "../pages/LoginPage";
import Logout from "../features/auth/components/Logout";

import Protected from "../features/auth/components/Protected";
import HomePage from "../pages/HomePage";
import UserProfilePage from "../pages/UserProfile";
import UserOrdersPage from "../pages/UserOrdersPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";
import StripeCheckout from "../features/checkout/StripeCheckout";
import OrderSuccessPage from "../pages/OrderSuccessPage";
import OrderFailurePage from "../pages/OrderFailurePage";

import ProtectedAdmin from "../features/auth/components/ProtectedAdmin";
import AdminHomePage from "../pages/AdminHomePage";
import AdminProductFormPage from "../pages/AdminProductFormPage";
import AdminProductDetailPage from "../pages/AdminProductDetailPage";
import AdminOrdersPage from "../pages/AdminOrdersPage";

import PageNotFound from "../pages/PageNotFound";

const routes = createBrowserRouter([
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "/",
    element: (
      <Protected>
        <HomePage />
      </Protected>
    ),
  },
  {
    path: "/profile",
    element: (
      <Protected>
        <UserProfilePage />
      </Protected>
    ),
  },
  {
    path: "/product-detail/:id",
    element: (
      <Protected>
        <ProductDetailPage />
      </Protected>
    ),
  },
  {
    path: "/cart",
    element: (
      <Protected>
        <CartPage />
      </Protected>
    ),
  },
  {
    path: "/checkout",
    element: (
      <Protected>
        <CheckoutPage />
      </Protected>
    ),
  },
  {
    path: "/stripe-checkout",
    element: (
      <Protected>
        <StripeCheckout />
      </Protected>
    ),
  },
  {
    path: "/order-success/:id",
    element: (
      <Protected>
        <OrderSuccessPage />
      </Protected>
    ),
  },
  {
    path: "/order-failure",
    element: (
      <Protected>
        <OrderFailurePage />
      </Protected>
    ),
  },
  {
    path: "/my-orders",
    element: (
      <Protected>
        <UserOrdersPage />
      </Protected>
    ),
  },
  {
    path: "/admin",
    element: (
      <ProtectedAdmin>
        <AdminHomePage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/product-detail/:id",
    element: (
      <ProtectedAdmin>
        <AdminProductDetailPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/product-form",
    element: (
      <ProtectedAdmin>
        <AdminProductFormPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/product-form/edit/:id",
    element: (
      <ProtectedAdmin>
        <AdminProductFormPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/orders",
    element: (
      <ProtectedAdmin>
        <AdminOrdersPage />
      </ProtectedAdmin>
    ),
  },

  //   {
  //     path: "/forgot-password",
  //     element: <ForgotPasswordPage></ForgotPasswordPage>,
  //   },
  //   {
  //     path: "/reset-password",
  //     element: <ResetPasswordPage></ResetPasswordPage>,
  //   },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

export default routes;
