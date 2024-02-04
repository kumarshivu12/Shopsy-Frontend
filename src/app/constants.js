export const ITEMS_PER_PAGE = 10;

export const SORT_OPTIONS = [
  {
    name: "Best Rating",
    sort: "rating",
    order: "desc",
    current: false,
  },
  {
    name: "Price: Low to High",
    sort: "discountPrice",
    order: "asc",
    current: false,
  },
  {
    name: "Price: High to Low",
    sort: "discountPrice",
    order: "desc",
    current: false,
  },
];

export const NAVIGATION = [
  { name: "Products", link: "/", user: true },
  { name: "Products", link: "/admin", admin: true },
  { name: "Orders", link: "/admin/orders", admin: true },
];
export const USER_NAVIGATION = [
  { name: "My Profile", link: "/profile" },
  { name: "My Orders", link: "/my-orders" },
  { name: "Sign out", link: "/logout" },
];
