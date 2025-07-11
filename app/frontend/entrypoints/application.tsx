import React from "react";
import { createRoot } from "react-dom/client";
import "../styles/application.scss"
import Rewards from "../components/Rewards";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

const App = () => (
    <div className="container mt-5">
        <h1 className="text-primary mb-4 text-center">Rewards Redemption</h1>

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
            <Rewards />
        </QueryClientProvider>
    </div>
);

const rootElement = document.getElementById("root");
if (rootElement) createRoot(rootElement).render(<App />);
