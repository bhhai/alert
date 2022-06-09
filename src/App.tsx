import "animate.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "styles/main.scss";
import fetchConfig from "./configs/fetchConfig";
import { AuthProvider, Guard } from "./configs/userContext";
import { QueryClient, QueryClientProvider } from "react-query";
import "animate.css";
import { ProjectProvider } from "configs/projectContext";
import Login from "pages/login";
import Layout from "pages/layout";
import LayoutCMS from "pages/layoutCMS";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  fetchConfig();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ProjectProvider>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
          <Routes>
            <Route
              path="*"
              element={
                <Guard allowedRoles={["STAFF"]}>
                  <Layout />
                </Guard>
              }
            />
            <Route
              path="/admin/*"
              element={
                <Guard allowedRoles={["ADMIN"]}>
                  <LayoutCMS />
                </Guard>
              }
            />
            {/* <Route path="/" element={<Layout />} />
            <Route path="/admin/*" element={<LayoutCMS />} /> */}
            <Route path="/login" element={<Login />} />
            <Route path="/admin/login" element={<Login />} />
          </Routes>
        </ProjectProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
