import React from "react";
import { createRoot } from "react-dom/client";
import "../styles/application.scss"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "../contexts/UserContext";
import Rewards from "../components/rewards/Rewards";
import Redemptions from "../components/redemptions/Redemptions";
import Navbar from "../components/Navbar";

const queryClient = new QueryClient();

const App = () => (
    <QueryClientProvider client={queryClient}>
        <Toaster
            position="bottom-center"
            toastOptions={{
                success: {
                    style: {
                        background: "#d4edda",
                        color: "#155724",
                    },
                },
                error: {
                    style: {
                        background: "#f8d7da",
                        color: "#721c24",
                    },
                },
            }}
        />
        <UserProvider>
            <Navbar />
            <div className="container">
                <Rewards />
                <Redemptions />
            </div>
        </UserProvider>
    </QueryClientProvider>
);

const rootElement = document.getElementById("root");
if (rootElement) createRoot(rootElement).render(<App />);
