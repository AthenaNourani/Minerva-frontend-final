export const getBaseUrl = () => {
  return import.meta.env.MODE === "development"
    ? "http://localhost:5000"
    : "https://minerva-ecommerce-backend-app.vercel.app";
};