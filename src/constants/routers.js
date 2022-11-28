export const ROUTES = {
  HOME: "/home",
  PRODUCT_DETAIL: "/product-detail/:slug",
  LOGIN: "/login",
  REGISTER: "/register",
  INFOR_ORDER: "/info-order",
  TRACK_MY_ORDER: "/track-my-order",
  ORDER_DETAIL: "/order-detail/:id",
  USER: {
    PRODUCT_LIST: "/products",

    PAYMENT: "/payment",
    CART_DETAIL: "/cart",
  },
  ADMIN: {
    HOME: "/admin",
    DASHBOARD: "/admin/dashboard",
    PRODUCT_LIST: "admin/products,",
    CREATE_PRODUCT: "/admin/products/create",
    UPDATE_PRODUCT: "/admin/products/:id/update",
    USER_LIST: "/admin/users",
  },
};
