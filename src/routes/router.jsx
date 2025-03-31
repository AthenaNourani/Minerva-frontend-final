import { createBrowserRouter } from "react-router-dom";
import App from "../App";

// 🏠 Allgemeine Seiten
import Home from "../pages/home/Home";
import CategoryPage from "../pages/category/CatrgoryPage";
import Search from "../pages/search/Search";
import ShopPage from "../pages/shop/ShopPage";
import SinglePageProduct from "../pages/shop/SinglePageProduct";

// 🔐 Authentifizierungsseiten
import Login from "../components/Login";
import Register from "../components/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import VerifyEmail from "../pages/auth/VerifyEmail";

// ✅ Nach erfolgreicher Zahlung
import PaymentSuccess from "../components/PaymentSuccess";

// 🔐 Dashboard mit geschützten Routen
import DashboardLayout from "../dashboard/DashboardLayout";
import PrivateRoute from "./PrivateRoute";

// 👤 Benutzerbezogene Dashboard-Komponenten
import UserMain from "../dashboard/user/dashboard/UserMain";
import UserOrders from "../dashboard/user/UserOrders";
import OrderDetails from "../dashboard/user/OrderDetails";
import UserPayments from "../dashboard/user/UserPayments";
import UserReviews from "../dashboard/user/UserReviews";
import UserProfile from "../dashboard/user/UserProfile";

// 🛠️ Admin-Dashboard-Komponenten
import AdminDMain from "../dashboard/admin/dashboard/AdminDMain";
import AddProduct from "../dashboard/admin/addProduct/AddProduct";
import ManageProduct from "../dashboard/admin/manageProduct/ManageProduct";
import UpdateProduct from "../dashboard/admin/manageProduct/UpdateProduct";
import ManageUsers from "../dashboard/admin/users/ManageUsers";
import ManageOrders from "../dashboard/admin/manageOrders/ManageOrders";
import Unauthorized from "../pages/auth/Unauthorized";

// 📦 Separater Bereich für Admin-Routen
const adminRoutes = [
  { path: "admin", element: <AdminDMain /> },
  { path: "add-product", element: <AddProduct /> },
  { path: "manage-products", element: <ManageProduct /> },
  { path: "update-product/:id", element: <UpdateProduct /> },
  { path: "users", element: <ManageUsers /> },
  { path: "manage-orders", element: <ManageOrders /> },
];

// 🌐 Haupt-Router-Konfiguration
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> }, // 🏠 Startseite
      { path: "/categories/:categoryName", element: <CategoryPage /> }, // 🗂️ Kategorieansicht
      { path: "/search", element: <Search /> }, // 🔍 Produktsuche
      { path: "/shop", element: <ShopPage /> }, // 🛒 Alle Produkte
      { path: "/shop/:id", element: <SinglePageProduct /> }, // 📦 Einzelnes Produkt
      { path: "/success", element: <PaymentSuccess /> }, // ✅ Zahlung erfolgreich
      { path: "/orders/:orderId", element: <OrderDetails /> }, // 📋 Bestelldetails
    ],
  },

  // 🔐 Authentifizierungsrouten
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/verify-email/:token", element: <VerifyEmail /> }, // 📧 E-Mail-Verifizierung
  { path: "/forgot-password", element: <ForgotPassword /> }, // 🔑 Passwort vergessen
  { path: "/reset-password/:token", element: <ResetPassword /> }, // 🔄 Neues Passwort setzen
  { path: "/unauthorized", element: <Unauthorized /> },


  // 🔐 Geschützter Dashboard-Bereich (nur für eingeloggte Nutzer)
  {
    path: "/dashboard",
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    children: [
      { path: "", element: <UserMain /> }, // 🧑‍💼 Benutzerübersicht
      { path: "orders", element: <UserOrders /> }, // 📋 Bestellungen
      { path: "payments", element: <UserPayments /> }, // 💳 Zahlungen
      { path: "profile", element: <UserProfile /> }, // 👤 Profil
      { path: "reviews", element: <UserReviews /> }, // ✍️ Bewertungen

      // 🔐 Adminbereich (Nur mit Admin-Rolle zugänglich)
      ...adminRoutes.map(route => ({
        path: route.path,
        element: <PrivateRoute role="admin">{route.element}</PrivateRoute>,
      })),
    ],
  },
]);

export default router;
