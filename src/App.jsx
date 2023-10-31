import { Route, Routes, useNavigate } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard.page";
import LoginPage from "./pages/AuthPages/Login.page";
import ProductPage from "./pages/product/Product.page";
import NotFound from "./pages/notfound/NotFound.page";
import Layout from "./components/misc/Layout";
import ProtectedRoute from "./services/ProtectedRoute";
import useBoundStore from "./store/Store";
import "./assets/css/App.css";
import { useEffect } from "react";
import UserReports from "./views/admin/default";
import routes from "./routes";
import SignUp from "./views/auth/signup";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  const navigate = useNavigate();
  const authCheck = useBoundStore((state) => {
    return state.user ? state.user : false;
  });

  useEffect(() => {
    // useEffect only if you want whole App private.
    if (authCheck === false) navigate("login");
    //remove this useEffect if You want some public pages in App.
    //Route can handle private pages individually through ProtectedRoute
  }, [authCheck]);
  const queryClient = new QueryClient();

  return (
    <Layout>
      <QueryClientProvider client={queryClient}>
        <div>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route
              path="products"
              element={
                <ProtectedRoute isAllowed={!!authCheck}>
                  <ProductPage />
                </ProtectedRoute>
              }
            />

            <Route path="/" element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </QueryClientProvider>
    </Layout>
  );
}

export default App;
