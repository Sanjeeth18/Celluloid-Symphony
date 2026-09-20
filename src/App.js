import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import MovieDetails from "./pages/MovieDetails";
import Contact from "./pages/Contact";
import Search from "./pages/Search";
import Actors from "./pages/Actors";
import WatchHistory from "./pages/WatchHistory";
import { AppProvider } from "./context/AppContext";
import { AuthProvider } from "./context/AuthContext";
import { WatchHistoryProvider } from "./context/WatchHistoryContext";
import GlobalLoader from "./components/ui/GlobalLoader";
import AuthGate from "./components/AuthGate";

// React Query client with smart defaults for a movie app
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 min – data stays fresh
      gcTime: 10 * 60 * 1000, // 10 min – keep unused cache
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  useEffect(() => {
    document.title = "Celluloid Symphony — Explore Movies & Series";
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <WatchHistoryProvider>
            {/* AppProvider requires router context for useNavigate */}
            <AppProvider>
              <AuthGate>
                <GlobalLoader>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/details" element={<MovieDetails />} />
                    <Route path="/history" element={<WatchHistory />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/actors" element={<Actors />} />
                  </Routes>
                </GlobalLoader>
              </AuthGate>
              {/* Global premium toast notifications */}
              <Toaster
                position="bottom-right"
                toastOptions={{
                  style: {
                    background: "#181531",
                    color: "#E2E8F0",
                    border: "1px solid rgba(0,240,255,0.2)",
                    borderRadius: "12px",
                    fontFamily: "Outfit, sans-serif",
                  },
                  success: { iconTheme: { primary: "#00F0FF", secondary: "#0A0915" } },
                }}
              />
            </AppProvider>
          </WatchHistoryProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
